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

dotenv.config();
console.log('Starting...');

async function initialize() {
    const schema = await buildSchema({
        resolvers: [`${__dirname}/data/resolvers/**/*.resolver.ts`],
        container: Container,
        authChecker
    });
    const { defaultUser } = await seed();

    return { schema, defaultUser };
}

async function bootstrap(schema: GraphQLSchema, defaultUser: User): Promise<ServerInfo> {
    const port = +(process.env.PORT || 8080);
    useContainer(Container);
    await connect();

    const server = new ApolloServer({
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
                        id: userFromToken.id,
                        email: userFromToken.email,
                        username: userFromToken.username
                    }
                });
                return { user } as Context;
            }
            return null;
        },
    });

    return await server.listen(port);
}

async function runMaster() {
    if (process.env.NODE_ENV !== 'production') {
        let conn: Connection | null = null;
        try {
            conn = await connect(true);
        } finally {
            if (conn)
                await conn.close();
        }
    }
    const workerCount = cpus().length;
    console.log(`Creating ${workerCount} workers.`);

    for (let i = 0; i < workerCount; i++) {
        fork();
    }

    clusterOn('exit', worker => {
        console.warn(`[${process.pid}] ${worker.id} died.`);
        fork();
    });
}

async function runWorker() {
    let conn: Connection | null = null;
    try {
        conn = await connect();
        const { defaultUser, schema } = await initialize();
        bootstrap(schema, defaultUser)
            .then(({ url }) => console.log(`🚀 [${process.pid}] Server ready at ${url}`))
            .catch(reason => console.error(reason));
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
