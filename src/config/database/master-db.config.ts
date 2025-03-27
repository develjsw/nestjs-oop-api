import { registerAs } from '@nestjs/config';

export const MasterDbConfig = registerAs('master-db', () => ({
    master: {
        name: 'master-db',
        type: 'mysql',
        host: process.env.DB_MASTER_HOST,
        port: +process.env.DB_MASTER_PORT,
        username: process.env.DB_MASTER_USERNAME,
        password: process.env.DB_MASTER_PASSWORD,
        database: process.env.DB_MASTER_DATABASE,
        entities: [`${process.cwd()}/dist/**/*.entity.js`],
        synchronize: false,
        logging: 'all'
    }
}));
