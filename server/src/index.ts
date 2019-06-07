import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { ApolloServer, ServerInfo } from 'apollo-server';
import { Container } from 'typedi';
import { useContainer, getRepository, Connection, createConnection } from 'typeorm';
import { buildSchema } from "type-graphql";
import { seed } from './data/seed';
import { Context } from './data/resolvers/types/context';
import { User } from './data/entities/user';
import { parseUserFromToken, authChecker } from './security';
import { isMaster, fork, on as clusterOn } from 'cluster';
import { cpus } from 'os';
import { GraphQLSchema } from 'graphql';
import { logger } from './logging';
import { ContextFunction } from 'apollo-server-core';

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
    const context: ContextFunction = async ({ req }): Promise<Context | null> => {
        if (process.env.NODE_ENV !== 'production') {
            return { user: defaultUser } as Context;
        }
        const token = req.headers.authorization;
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

async function bootstrap(schema: GraphQLSchema, defaultUser: User): Promise<ServerInfo> {
    const port = +(process.env.PORT || 8080);
    useContainer(Container);
    await createConnection();
    const server = await createServer(schema, defaultUser);
    return await server.listen(port);
}

async function runMaster() {
    let conn: Connection | null = null;
    try {
        logger.info('Running master.');
        if (process.env.NODE_ENV === 'production') {
            logger.info('Environment is production. Running migrations.');
            conn = await createConnection();
            await conn.runMigrations();
        } else {
            logger.info('Creating connection and seeding data.');
            conn = await createConnection();
            await seed();
        }
        const workerCount = process.env.NODE_ENV === 'production' ? cpus().length : 1;
        logger.info(`Creating ${workerCount} workers.`);
        for (let i = 0; i < workerCount; i++) {
            fork();
        }
    } finally {
        if (conn)
            await conn.close();
    }
    clusterOn('exit', worker => {
        logger.warn(`${worker.id} died.`);
        fork();
    });
}

async function runWorker() {
    let conn: Connection | null = null;
    try {
        conn = await createConnection();
        const userRepository = getRepository(User);
        const defaultUser = (await userRepository.findOne({
            where: {
                username: process.env.DB_USER || 'foo@mail.com',
            }
        }))!;
        const schema = await createSchema();
        const { url } = await bootstrap(schema, defaultUser);
        logger.info(`🚀 Server ready at ${url}`);

    } catch (reason) {
        logger.error(reason);
    } finally {
        if (conn)
            await conn.close();
    }
}

void async function main() {
    if (isMaster) {
        await runMaster();
    } else {
        await runWorker();
    }
}().catch(console.error);
