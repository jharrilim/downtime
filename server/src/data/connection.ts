import { createConnection, Connection, getRepository } from 'typeorm';
import entities from './entities';
import { User } from './entities/user';
import { encryptPassword } from '../security';
import { Role } from './entities/role';

export async function connect(dropSchema: boolean = false): Promise<Connection> {

    if (process.env.DB_TYPE === 'mongodb') {
        return await createConnection({
            type: 'mongodb',
            database: process.env.DB_NAME || 'downtime',
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: +(process.env.DB_PORT || 27017),
            host: process.env.DB_HOST || 'mongodb',
            entities: entities,
            synchronize: dropSchema,
            logger: 'advanced-console',
            logging: 'all',
            dropSchema,
            cache: true,

        });
    }

    return await createConnection({
        type: 'postgres',
        database: process.env.DB_USER || 'admin',
        username: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || 'postgres',
        port: +(process.env.DB_PORT || 5432),
        host: process.env.DB_HOST || 'localhost',
        entities: entities,
        synchronize: process.env.NODE_ENV !== 'production' && dropSchema,
        logger: 'advanced-console',
        logging: 'all',
        dropSchema: process.env.NODE_ENV !== 'production' && dropSchema,
        cache: true,

    });
}

export async function initialConnection() {
    return await connect(true);
}

export async function seed() {
    // Init Roles
    const roleRepository = getRepository(Role);
    const defaultRoles = roleRepository.create([{ name: 'general' }, { name: 'admin' }]);
    await roleRepository.save(defaultRoles);

    // Init Default User
    const userRepository = getRepository(User);
    const { passwordHash, salt } = encryptPassword(process.env.DB_PASSWORD || 'foobar');
    const defaultUser = userRepository.create({
        email: process.env.DEFAULT_MAIL_ADDRESS || 'foo@mail.com',
        username: process.env.DB_USER || 'foo@mail.com',
        passwordHash,
        salt,
        roles: defaultRoles
    });
    await userRepository.save(defaultUser);
    return { defaultUser };
}
