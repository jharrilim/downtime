// @ts-check

/**
 * @type {import("typeorm").ConnectionOptions}
 */
const connectionOptions = {
    type: 'postgres',
    database: process.env.DB_NAME || process.env.DB_USER || 'admin',
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'postgres',
    port: +(process.env.DB_PORT || 5432),
    host: process.env.DB_HOST || 'localhost',
    entities: [`./dist/data/entities/*.js`],
    migrations: [`./dist/data/migrations/*.js`],
    migrationsTableName: 'downtime_migrations',
    synchronize: process.env.NODE_ENV !== 'production',
    logger: 'advanced-console',
    logging: 'all',
    dropSchema: process.env.NODE_ENV !== 'production',
    cache: true,
    cli: {
        migrationsDir: `./src/data/migrations`,
        entitiesDir: `./src/data/entities`,
    }
};

module.exports = connectionOptions;
