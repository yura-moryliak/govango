import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 1111;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    return await app.listen(PORT)
}
bootstrap().then(() => console.log(`Server running on URL http://localhost:${PORT}`));