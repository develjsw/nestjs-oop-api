import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from '../config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forFeature(typeOrmConfig),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            name: 'master-db',
            useFactory: (configService: ConfigService) => configService.get('typeorm.master'),
            inject: [ConfigService]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            name: 'slave-db',
            useFactory: (configService: ConfigService) => configService.get('typeorm.slave'),
            inject: [ConfigService]
        })
    ],
    exports: [TypeOrmModule]
})
export class DatabaseModule {}
