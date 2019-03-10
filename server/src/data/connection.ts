import { createConnection, Connection, getRepository } from 'typeorm';
import models from './entities';
import { User } from './entities/user';

export async function connect(): Promise<Connection> {
    return await createConnection({
        type: "postgres",
        database: process.env.DB_USER || "admin",
        username: process.env.DB_USER || "admin",
        password: process.env.DB_PASSWORD || "postgres",
        port: +(process.env.DB_PORT || 5432),
        host: "db",
        entities: models,
        synchronize: true,
        logger: "advanced-console",
        logging: "all",
        dropSchema: true,
        cache: true,
    });
}

export async function seed() {
    const userRepository = getRepository(User);
    const defaultUser = userRepository.create({
        email: 'foo@mail.com',
        username: 'foo@mail.com'
    });
    await userRepository.save(defaultUser);
    return { defaultUser };
}
