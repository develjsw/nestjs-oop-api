import { Module } from '@nestjs/common';
import { TestService } from './service/test.service';
import { TestController } from './test.controller';

@Module({
    imports: [],
    controllers: [TestController],
    providers: [TestService],
    exports: []
})
export class TestModule {}
