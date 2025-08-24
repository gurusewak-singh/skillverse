import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // Add this line
  await app.listen(3001); // Use a port other than 3000 to avoid Next.js conflict
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
});
