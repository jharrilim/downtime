import {
    authChecker,
    encryptPassword,
    generateSalt,
    parseUserFromToken,
    tokenifyUser
} from '../security';
import { User } from '../data/entities/user';
import { Role } from '../data/entities/role';

describe('Security', () => {
    describe('authChecker', () => {
        it('returns true when given a user with valid roles', () => {
            const roles = ['admin', 'user'];
            const user: User = {
                id: 1234,
                posts: [],
                email: 'foo@mail.com',
                username: 'fooey',
                passwordHash: 'asdasd',
                salt: '128192371289',
                roles: [
                    { id: 1, name: 'admin' } as Role,
                    { id: 2, name: 'user' } as Role
                ]
            };

            const result = authChecker({ context: { user } }, roles);

            expect(result).toBe(true);
        });

        it('returns false when given a user with invalid roles', () => {
            const roles = ['admin', 'user'];
            const user: User = {
                id: 1234,
                posts: [],
                email: 'foo@mail.com',
                username: 'fooey',
                passwordHash: 'asdasd',
                salt: '128192371289',
                roles: [
                    { id: 1, name: 'bloop' } as Role
                ]
            };

            const result = authChecker({ context: { user } }, roles);

            expect(result).toBe(false);
        });

        it('returns false when given a user without roles', () => {
            const roles = ['admin', 'user'];
            const user: User = {
                id: 1234,
                posts: [],
                email: 'foo@mail.com',
                username: 'fooey',
                passwordHash: 'asdasd',
                salt: '128192371289',
                roles: []
            };

            const result = authChecker({ context: { user } }, roles);

            expect(result).toBe(false);
        });

        it('returns true when given a user and empty roles', () => {
            const user: User = {
                id: 1234,
                posts: [],
                email: 'foo@mail.com',
                username: 'fooey',
                passwordHash: 'asdasd',
                salt: '128192371289',
                roles: [
                    { id: 1, name: 'admin' } as Role,
                    { id: 2, name: 'user' } as Role
                ]
            };

            const result = authChecker({ context: { user } }, []);

            expect(result).toBe(true);
        });

        it('returns false when not given a context object', () => {
            const roles = ['admin', 'user'];

            const result = authChecker({}, roles);

            expect(result).toBe(false);
        });

        it('returns false when not given a user or roles', () => {
            const result = authChecker({ context: { user: undefined } }, []);

            expect(result).toBe(false);
        });
    });

    describe('generateSalt', () => {
        it('returns a string of 32 characters', () => {
            const salt = generateSalt();
            expect(typeof salt).toEqual('string');
            expect(salt.length).toEqual(32);
        });
    });

    describe('tokenifyUser', () => {
        beforeAll(async () => {
            process.env.PRIVATE_KEY = `${__dirname}/fixtures/fakekey.pem`;
        });
        afterAll(() => {
            delete process.env.PRIVATE_KEY;
        });

        it('returns a promise with a tokenified user', async () => {
            const user: User = {
                id: 1234,
                posts: [],
                email: 'foo@mail.com',
                username: 'fooey',
                passwordHash: 'asdasd',
                salt: '128192371289',
                roles: [
                    { id: 1, name: 'admin' } as Role,
                    { id: 2, name: 'user' } as Role
                ]
            };

            const result = await tokenifyUser(user);

            expect(typeof result).toBe('string');
        });
    });

    describe('parseUserFromToken', () => {
        beforeAll(async () => {
            process.env.PRIVATE_KEY = `${__dirname}/fixtures/fakekey.pem`;
        });
        afterAll(() => {
            delete process.env.PRIVATE_KEY;
        });

        it('returns the correct user', async () => {
            const user: User = {
                id: 1234,
                posts: [],
                email: 'foo@mail.com',
                username: 'fooey',
                passwordHash: 'asdasd',
                salt: '128192371289',
                roles: [
                    { id: 1, name: 'admin' } as Role,
                    { id: 2, name: 'user' } as Role
                ]
            };

            const userToken = await tokenifyUser(user);
            const parsedUser = await parseUserFromToken(userToken);
            expect(parsedUser.iat).toBeDefined();
            delete parsedUser.iat;
            expect(parsedUser as User).toEqual(user);
        });
    });
})