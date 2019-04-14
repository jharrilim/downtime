import { randomBytes, createHmac } from "crypto";
import { verify, sign } from "jsonwebtoken";
import { promisify } from 'util';
import { readFile } from 'fs';
import { User } from "./data/entities/user";
import { ResolverData } from "type-graphql";
import { Context } from "./data/resolvers/types/context";

const rf = promisify(readFile);

export function generateSalt() {
    return randomBytes(16).toString('hex');
}

export function encryptPassword(password: string, salt: string = generateSalt()) {
    const hash = createHmac('sha512', salt);
    hash.update(password);
    const passwordHash = hash.digest('hex');
    return { salt, passwordHash };
}

export async function parseUserFromToken(token: string): Promise<User> {
    const privateKey = await rf(process.env.PRIVATE_KEY || `${__dirname}/../key.pem`);
    return verify(token, privateKey, { algorithms: ['RS256'] }) as User;
}

export async function tokenifyUser(user: User): Promise<string> {
    const privateKey = await rf(process.env.PRIVATE_KEY || `${__dirname}/../key.pem`);
    return sign(user, privateKey, { algorithm: 'RS256' });
}

export function authChecker(resolverData: Partial<ResolverData<Context>>, roles: string[]) {
    if (!resolverData.context) {
        return false;
    }
    const user = resolverData.context.user;
    if (roles.length === 0) // if `@Authorized()`, check only is user exist
        return user !== undefined;
    if (!user) // and if no user, restrict access
        return false;
    return user.roles.some(role => roles.includes(role.name));
}


