import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { ApolloServer, ServerInfo } from 'apollo-server';
import { buildSchema } from "type-graphql";
import { useContainer } from'typeorm';
import { Container } from 'typedi';
import { connect, seed } from './data/connection';
import { Context } from './data/resolvers/types/context';

async function bootstrap(): Promise<ServerInfo> {
    dotenv.load();
    const port = +(process.env.PORT || 4000);
    useContainer(Container);
    await connect();
    const schema = await buildSchema({
        resolvers: [`${__dirname}/data/resolvers/**/*.resolver.ts`],
        container: Container
    });
    const { defaultUser } = await seed();
    const context = { user: defaultUser } as Context;
    const server = new ApolloServer({ schema, context });

    return await server.listen(port);
}

bootstrap()
    .then(({ url }) => console.log(`🚀  Server ready at ${url}`))
    .catch(reason => console.error(reason));
