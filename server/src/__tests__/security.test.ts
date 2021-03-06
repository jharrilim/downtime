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
        it('returns true when given a user with valid roles', async () => {
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
                ],
                adminTopics: [],
                createdCategories: [],
                createdTopics: [],
                dateJoined: new Date(),
            };

            const result = authChecker({ context: { user } }, roles);

            expect(await result).toBe(true);
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
                ],
                adminTopics: [],
                createdCategories: [],
                createdTopics: [],
                dateJoined: new Date(),
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
                roles: [],
                adminTopics: [],
                createdCategories: [],
                createdTopics: [],
                dateJoined: new Date(),
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
                ],
                adminTopics: [],
                createdCategories: [],
                createdTopics: [],
                dateJoined: new Date(),
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
                ],
                adminTopics: [],
                createdCategories: [],
                createdTopics: [],
                dateJoined: new Date(),
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
                ],
                adminTopics: [],
                createdCategories: [],
                createdTopics: [],
                dateJoined: new Date(),
            };

            const userToken = await tokenifyUser(user);
            const parsedToken = await parseUserFromToken(userToken);
            expect(parsedToken.iat).toBeDefined();
            expect(parsedToken.data).toEqual(user);
        });
    });

    describe('encryptPassword', () => {

        it('returns a new salt if one was not given', () => {
            const password = 'Passw0o0o0ord';

            const passResult = encryptPassword(password);

            expect(passResult.salt).toBeTruthy();
            expect(typeof passResult.salt).toBe('string');
        });

        it('encrypting a password yields consistent results', () => {
            const salt = 'WAJOIDJA1239120';
            const passString = '#j8ADhh)!(jd!)(jd012j()DJ12d';

            const pass1 = encryptPassword(passString, salt);
            const pass2 = encryptPassword(passString, salt);
            
            expect(pass1.passwordHash).toBe(pass2.passwordHash);
            expect(pass1.salt).toBe(pass2.salt);
        });

        it('using a different salt yields different results', () => {
            const salt1 = 'ABC';
            const salt2 = 'DEF';
            const password = 'Password1';

            const result1 = encryptPassword(password, salt1);
            const result2 = encryptPassword(password, salt2);

            expect(result1.passwordHash === result2.passwordHash).toEqual(false);
            expect(result1.salt === result2.salt).toEqual(false);
        });
    })
})