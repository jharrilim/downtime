import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { ApolloServer, ServerInfo } from 'apollo-server';
import { Container } from 'typedi';
import { useContainer, getRepository } from'typeorm';
import { buildSchema } from "type-graphql";
import { connect, seed } from './data/connection';
import { Context } from './data/resolvers/types/context';
import { User } from './data/entities/user';
import { parseUserFromToken, authChecker } from './security';

async function bootstrap(): Promise<ServerInfo> {
    dotenv.config();
    const port = +(process.env.PORT || 8080);
    useContainer(Container);
    await connect();
    const schema = await buildSchema({
        resolvers: [`${__dirname}/data/resolvers/**/*.resolver.ts`],
        container: Container,
        authChecker
    });
    const { defaultUser } = await seed();

    const server = new ApolloServer({ schema, context: async ({ req }): Promise<Context | null> => {
        if (process.env.NODE_ENV !== 'production') {
            return { user: defaultUser } as Context;
        }
        const token = req.headers.authorization;
        if(token !== undefined) {
            const userRepository = getRepository(User);
            const userFromToken = await parseUserFromToken(token);
            const user = await userRepository.findOne({ where: {
                id: userFromToken.id,
                email: userFromToken.email,
                username: userFromToken.username
            }});
            return { user } as Context;
        }
        return null;
    }});

    return await server.listen(port);
}

bootstrap()
    .then(({ url }) => console.log(`🚀  Server ready at ${url}`))
    .catch(reason => console.error(reason));
