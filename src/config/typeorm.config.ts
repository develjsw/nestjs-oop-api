import { registerAs } from '@nestjs/config';

export const typeOrmConfig = registerAs('typeorm', () => ({
    master: {
        name: 'master-db',
        type: 'mysql',
        host: process.env.DB_MASTER_HOST,
        port: Number(process.env.DB_MASTER_PORT),
        username: process.env.DB_MASTER_USERNAME,
        password: process.env.DB_MASTER_PASSWORD,
        database: process.env.DB_MASTER_DATABASE,
        entities: [`${process.cwd()}/dist/**/*.entity.js`],
        synchronize: false,
        logging: 'all'
    },
    slave: {
        name: 'slave-db',
        type: 'mysql',
        host: process.env.DB_SLAVE_HOST,
        port: Number(process.env.DB_SLAVE_PORT),
        username: process.env.DB_SLAVE_USERNAME,
        password: process.env.DB_SLAVE_PASSWORD,
        database: process.env.DB_SLAVE_DATABASE,
        entities: [`${process.cwd()}/dist/**/*.entity.js`],
        synchronize: false,
        logging: 'all'
    }
}));
