import { NestFactory } from '@nestjs/core';

import helmet from "helmet";
import {join} from "path";
import * as bodyParser from 'body-parser';
import * as cookieParser from "cookie-parser";

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

const PORT = process.env.PORT || 1111;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(join(__dirname, './dist/browser/ui'));
    app.setViewEngine('html');

    app.use(
      helmet({
        crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
        crossOriginResourcePolicy: {policy: 'cross-origin'},
        referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
        contentSecurityPolicy: false,
        xXssProtection: true,
        hidePoweredBy: true
      }),
    );

    app.use(cookieParser());

    app.use(bodyParser.json({limit: '5mb'}));
    app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

    return await app.listen(PORT);
}
bootstrap()
  .then(() => console.log(`Server running on URL http://localhost:${PORT}`))
  .catch((error) => console.error(error));