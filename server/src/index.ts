import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { ApolloServer, ServerInfo } from 'apollo-server';
import { Container } from 'typedi';
import { useContainer, getRepository, Connection } from 'typeorm';
import { buildSchema } from "type-graphql";
import { connect, seed } from './data/connection';
import { Context } from './data/resolvers/types/context';
import { User } from './data/entities/user';
import { parseUserFromToken, authChecker } from './security';
import { isMaster, fork, on as clusterOn } from 'cluster';
import { cpus } from 'os';
import { GraphQLSchema } from 'graphql';
import { logger } from './logging';

dotenv.config();
logger.info('Starting...');

async function initialize() {
    const schema = await buildSchema({
        resolvers: [`${__dirname}/data/resolvers/**/*.resolver.ts`],
        container: Container,
        authChecker
    });
    const { defaultUser } = await seed();

    return { schema, defaultUser };
}

async function createServer(schema: GraphQLSchema, defaultUser: User) {
    return new ApolloServer({
        schema, context: async ({ req }): Promise<Context | null> => {
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
        },
    });
}

async function bootstrap(schema: GraphQLSchema, defaultUser: User): Promise<ServerInfo> {
    const port = +(process.env.PORT || 8080);
    useContainer(Container);
    await connect();
    const server = await createServer(schema, defaultUser);
    return await server.listen(port);
}

async function runMaster() {
    if (process.env.NODE_ENV !== 'production') {
        logger.debug('Dropping Schema...');
        let conn: Connection | null = null;
        try {
            conn = await connect(true);
        } finally {
            if (conn)
                await conn.close();
        }
    }
    const workerCount = cpus().length;
    logger.info(`Creating ${workerCount} workers.`);

    for (let i = 0; i < workerCount; i++) {
        fork();
    }

    clusterOn('exit', worker => {
        logger.warn(`${worker.id} died.`);
        fork();
    });
}

async function runWorker() {
    let conn: Connection | null = null;
    try {
        conn = await connect();
        const { defaultUser, schema } = await initialize();
        const { url } = await bootstrap(schema, defaultUser);
        logger.info(`🚀 Server ready at ${url}`);

    } catch(reason) {
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
