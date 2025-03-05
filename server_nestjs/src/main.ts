import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const PORT = process.env.PORT || 1111;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.select(AppModule).get(ConfigService);
  const documentBuilder = new DocumentBuilder()
    .setTitle('GoVanGo API')
    .setDescription('Restfull API for GoVanGo service')
    .setVersion('1.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api/swagger', app, document);

  app.use(
    helmet({
      crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      contentSecurityPolicy: false,
      xXssProtection: true,
      hidePoweredBy: true,
    }),
  );

  app.use(cookieParser());

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  app.enableCors({
    origin: configService.get('CLIENT_CORS_ORIGIN'),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    maxAge: 3600,
  });

  return await app.listen(PORT);
}

bootstrap()
  .then(() => {
    console.log(`Server running on URL http://localhost:${PORT}`);
    console.log(`Swagger available at http://localhost:${PORT}/api/swagger`);
  })
  .catch((error) => console.error(error));
