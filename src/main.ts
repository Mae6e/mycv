import { NestFactory } from '@nestjs/core';
//import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
//const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.use(cookieSession({
  //   keys:['cookiekey']
  // }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
