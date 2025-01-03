import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule , ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
const cookieSession = require('cookie-session');
//const dbConfig = require("../ormconfig"); 


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'test'? false:true,
      entities: [User,Report],
      autoLoadEntities: true,
    }),
  //   TypeOrmModule.forRootAsync({
  //     inject:[ConfigService],
  //     useFactory: (config: ConfigService) => {
  //       return {
  //         type:'sqlite',
  //         database: config.get<string>('DB_NAME'),
  //         synchronize: true,
  //         entities:[User, Report]
  //    }
  //  }
  //  }),

    UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useValue:new ValidationPipe({ whitelist: true })
  }],
})
  
export class AppModule {
  constructor(private configService: ConfigService) {
  }

  configure(consumer:MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys: [this.configService.get('COOKIE_KEY')]
    })).forRoutes('*');
  }
}
