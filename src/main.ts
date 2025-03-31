import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { SerializeInterceptor } from './common/interceptor/serialize-interceptor';

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);

    app.useGlobalInterceptors(new SerializeInterceptor());

    await app.listen(3000);
}
bootstrap();
