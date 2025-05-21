import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ShutdownHandler } from './core/lifecycle/shutdown.handler';
import { SerializeInterceptor } from './common/interceptor/serialize-interceptor';
import { ConfigService } from '@nestjs/config';
import { ResponseFormatInterceptor } from './common/interceptor/response-format.interceptor';
import { GlobalExceptionFilter } from './common/exception/filter/global-exception.filter';

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true
        })
    );

    app.enableShutdownHooks();

    app.get(ShutdownHandler).subscribeToShutdown(() => app.close());

    app.useGlobalInterceptors(new SerializeInterceptor(), new ResponseFormatInterceptor());

    app.useGlobalFilters(app.get(GlobalExceptionFilter));

    const configService: ConfigService = app.get(ConfigService);

    const server = await app.listen(+configService.get('PORT'));
    server.keepAliveTimeout = 61 * 1000;
    server.headersTimeout = 65 * 1000;
}
bootstrap();
