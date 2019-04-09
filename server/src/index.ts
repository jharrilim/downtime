import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { ApolloServer, ServerInfo } from 'apollo-server';
import { Container } from 'typedi';
import { useContainer, getRepository } from'typeorm';
import { buildSchema, AuthChecker } from "type-graphql";
import { connect, seed } from './data/connection';
import { Context } from './data/resolvers/types/context';
import { verify } from 'jsonwebtoken';
import { readFile } from 'fs';
import { User } from './data/entities/user';
import { promisify } from 'util';

const rf = promisify(readFile);

const authChecker: AuthChecker<Context> = ({ context: { user } }, roles) => {
    if (roles.length === 0) // if `@Authorized()`, check only is user exist
      return user !== undefined;
    if (!user) // and if no user, restrict access
      return false;
    return user.roles.some(role => roles.includes(role.name));
};

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
            const privateKey = await rf(process.env.PRIVATE_KEY || `${__dirname}/../key.pem`);
            const userFromToken = verify(token, privateKey, { algorithms: [ 'RS256' ] }) as User;
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
