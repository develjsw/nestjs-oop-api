import { Module } from '@nestjs/common';
import { JwtClientService } from './service/jwt-client.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule],
    controllers: [],
    providers: [JwtClientService],
    exports: []
})
export class JwtClientModule {}
