import { Module , MiddlewareConsumer } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from '../middlewares/current-user.middleware';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
// import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService
    // ,{
    // useClass: CurrentUserInterceptor,
    // provide:APP_INTERCEPTOR
    // }
  ],
  controllers: [UsersController]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
