import { registerAs } from '@nestjs/config';

export const SlaveDbConfig = registerAs('slave-db', () => ({
    slave: {
        name: 'slave-db',
        type: 'mysql',
        host: process.env.DB_SLAVE_HOST,
        port: +process.env.DB_SLAVE_PORT,
        username: process.env.DB_SLAVE_USERNAME,
        password: process.env.DB_SLAVE_PASSWORD,
        database: process.env.DB_SLAVE_DATABASE,
        entities: [`${process.cwd()}/dist/**/*.entity.js`],
        synchronize: false,
        logging: 'all'
    }
}));
