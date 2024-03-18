import { NestFactory } from '@nestjs/core';
import { PermissionModule } from './permission.module';

async function bootstrap() {
  const app = await NestFactory.create(PermissionModule);
  await app.listen(3000);
}
bootstrap();
