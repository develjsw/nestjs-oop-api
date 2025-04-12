import { Module } from '@nestjs/common';
import { MemberApiService } from './service/member-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [MemberApiService],
    exports: []
})
export class HttpClientModule {}
