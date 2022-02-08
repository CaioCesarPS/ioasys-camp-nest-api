import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import envVariables from '@config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('NestApplication');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Project Name API')
    .setVersion('1')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  
  await app.listen(envVariables().port, () =>
    logger.log(`API is running on port ${envVariables().port}`),
  );
}
bootstrap();
