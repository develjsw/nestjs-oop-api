import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './shared/exception/filter/global-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(app.get(GlobalExceptionFilter));

    await app.listen(3000);
}
bootstrap();
