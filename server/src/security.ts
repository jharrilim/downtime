import { randomBytes, createHmac } from "crypto";
import { verify, sign } from "jsonwebtoken";
import { promisify } from 'util';
import { readFile } from 'fs';
import { User } from "./data/entities/user";
import { ResolverData } from "type-graphql";
import { Context } from "./data/resolvers/types/context";
import { getRepository } from "typeorm";

const rf = promisify(readFile);
const keyPath = '/etc/certs/key.pem';

type JWTResult<T> = {
    iat: string,
    data: T
};

/**
 * Generates a random salt string.
 *
 * @export
 * @returns {string} The salt string.
 */
export function generateSalt(): string {
    return randomBytes(16).toString('hex');
}

/**
 * Encrypts a password using SHA512 as well as a salt.
 * If a salt is not specified, one will be generated and returned.
 * @export
 * @param {string} password
 * @param {string} [salt=generateSalt()]
 * @returns {{ salt: string, passwordHash: string }} A salt and a hashed password.
 */
export function encryptPassword(password: string, salt: string = generateSalt()) {
    const hash = createHmac('sha512', salt);
    hash.update(password);
    const passwordHash = hash.digest('hex');
    return { salt, passwordHash };
}

/**
 * Parses a User from a JWT token. The resulting user also has an iat field attached to it.
 *
 * @export
 * @param {string} token
 * @returns {Promise<JWTResult<User>>}
 */
export async function parseUserFromToken(token: string): Promise<JWTResult<User>> {
    const privateKey = await rf(keyPath);
    return verify(token, privateKey, { algorithms: ['RS256'] }) as JWTResult<User>;
}

/**
 * Converts a user into a JWT token.
 *
 * @export
 * @param {User} user
 * @returns {Promise<string>}
 */
export async function tokenifyUser(user: User): Promise<string> {
    const privateKey = await rf(keyPath);
    const userToken: Partial<JWTResult<User>> = {
        data: user
    };
    return sign(userToken, privateKey, { algorithm: 'RS256' });
}

/**
 * Used for checking authorization in resolvers.
 *
 * @export
 * @param {Partial<ResolverData<Context>>} resolverData
 * @param {string[]} roles
 * @returns {Promise<boolean>} True if user is authorized, false if not.
 */
export async function authChecker(resolverData: Partial<ResolverData<Context>>, roles: string[]) {
    if (!resolverData.context) {
        return false;
    }
    const user = resolverData.context.user;
    if (roles.length === 0) // if `@Authorized()`, check only is user exist
        return true;
    if (!user) // and if no user, restrict access
        return false;
    const userRepository = getRepository(User);
    const foundUser = await userRepository.findOne({ 
        where: { 
            id: user.id,
            email: user.email,
            passwordHash: user.passwordHash,
            salt: user.salt,
        },
        relations: [ 'roles' ]
    });
    if (!foundUser) 
        return false;

    return foundUser.roles.some(role => roles.includes(role.name));
}
