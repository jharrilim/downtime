import 'reflect-metadata';
import { ApolloServer, ServerInfo } from 'apollo-server';
import { buildSchema } from "type-graphql";
import { UserResolver } from "./data/models/user";
import { PostResolver } from './data/models/post';

async function bootstrap(): Promise<ServerInfo> {
    const schema = await buildSchema({
        resolvers: [UserResolver, PostResolver]
    });
    const server = new ApolloServer({ schema });

    return await server.listen();    
}

bootstrap()
    .then(({ url }) => console.log(`🚀  Server ready at ${url}`))
    .catch(reason => console.error(reason));
