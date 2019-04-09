import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { ApolloServer, ServerInfo } from 'apollo-server';
import { Container } from 'typedi';
import { useContainer } from'typeorm';
import { buildSchema } from "type-graphql";
import { connect, seed } from './data/connection';
import { Context } from './data/resolvers/types/context';

async function bootstrap(): Promise<ServerInfo> {
    dotenv.config();
    const port = +(process.env.PORT || 8080);
    useContainer(Container);
    await connect();
    const schema = await buildSchema({
        resolvers: [`${__dirname}/data/resolvers/**/*.resolver.ts`],
        container: Container
    });
    const { defaultUser } = await seed();
    const context = { user: defaultUser } as Context;
    const server = new ApolloServer({ schema, context: ({ req }) => {
        const token = req.headers.authorization || '';
        
        return context;
    }});

    return await server.listen(port);
}

bootstrap()
    .then(({ url }) => console.log(`🚀  Server ready at ${url}`))
    .catch(reason => console.error(reason));
