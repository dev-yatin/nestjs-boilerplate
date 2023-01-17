import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import { GlobalExceptionHandlerFilter } from './util/filters/global-exception.filter';

async function setupSwagger(app) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Car Parking API Document')
    .setDescription('Documentation for all car parking APIs')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http', name: 'Authorization' })
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(
    configuration().app.apiGlobalPrefix,
    app,
    swaggerDocument,
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [/http:\/\/localhost\:\d{4}/],
    methods: ['POST', 'GET', 'PATCH', 'DELETE'],
    exposedHeaders: ['set-cookie'],
    credentials: true,
  });
  app.use(cookieParser());
  app.setGlobalPrefix(configuration().app.apiGlobalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  // Unhandled Exceptions
  app.useGlobalFilters(new GlobalExceptionHandlerFilter());
  const logger = new Logger(`Bootstrap`);

  await setupSwagger(app);

  const port = configuration().app.port;
  await app.listen(port);
  logger.log(`Car Parking App running on port ${port}`);
}

bootstrap();
