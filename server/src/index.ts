import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { Container } from 'typedi';
import { useContainer, getRepository, Connection, createConnection, getConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { seed } from './data/seed';
import { Context } from './data/resolvers/types/context';
import { User } from './data/entities/user';
import { parseUserFromToken, authChecker } from './security';
import { GraphQLSchema } from 'graphql';
import { logger } from './logging';
import { ContextFunction } from 'apollo-server-core';
import express, { Request } from 'express';
import cookieParser from 'cookie-parser';

dotenv.config();
logger.info('Starting...');

export async function createSchema() {
    const schema = await buildSchema({
        resolvers: [
            `${__dirname}/data/resolvers/**/*.resolver.ts`,
            `${__dirname}/data/resolvers/**/*.resolver.js`
        ],
        container: Container,
        authChecker
    });
    return schema;
}



async function createServer(schema: GraphQLSchema, defaultUser: User) {
    const context: ContextFunction = async ({ req }: { req: Request }): Promise<Context | null> => {
        if (process.env.NODE_ENV !== 'production') {
            return { user: defaultUser } as Context;
        }
        const { token } = req.cookies;
        if (token !== undefined) {
            const userRepository = getRepository(User);
            const userFromToken = await parseUserFromToken(token);
            const user = await userRepository.findOne({
                where: {
                    id: userFromToken.data.id,
                    email: userFromToken.data.email,
                    username: userFromToken.data.username
                }
            });
            return { user } as Context;
        }
        return null;
    };
    return new ApolloServer({ schema, context });
}

async function bootstrap(schema: GraphQLSchema, defaultUser: User) {
    const port = +(process.env.PORT || 8080);
    useContainer(Container);
    // await createConnection();
    const app = express();
    app.use(cookieParser());
    const server = await createServer(schema, defaultUser);
    server.applyMiddleware({ app });

    return await app.listen(port);
}

async function initDb() {
    logger.info('Running master.');
    if (process.env.NODE_ENV === 'production') {
        logger.info('Environment is production. Running migrations.');
        return await getConnection().runMigrations();
    } else {
        logger.info('Creating connection and seeding data.');
        await seed();
    }
}

async function startServer() {
    try {
        const userRepository = getRepository(User);
        const defaultUser = (await userRepository.findOne({
            where: {
                username: process.env.DB_USER || 'foo@mail.com',
            }
        }))!;
        const schema = await createSchema();
        const s = await bootstrap(schema, defaultUser);
        const addr = s.address();
        if (addr !== null)
            logger.info(`🚀 Server ready at ${typeof addr === 'string' ? addr : `${addr.address}:${addr.port}`}`);
    } catch (reason) {
        logger.error(reason);
    }
}

void async function main() {
    await createConnection();
    await initDb();
    await startServer();
}().catch(console.error);
