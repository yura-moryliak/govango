import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

const PORT = process.env.PORT || 1111;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    return await app.listen(PORT);
}
bootstrap().then(() => console.log(`Server running on URL http://localhost:${PORT}`));