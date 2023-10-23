import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptoinFilter } from './exceptions/http.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptoinFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 데코레이터가 없는 필드의 object는 거른다.
      forbidNonWhitelisted: true, // 정의되지 않은 필드에 대해서는 에러 처리
      transform: true,
    })
  );
  await app.listen(3000);
}
bootstrap();
