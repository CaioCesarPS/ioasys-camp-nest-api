import { Module } from '@nestjs/common';
import envConfig from '@config/env';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules/users/user.module';

import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';

import * as path from 'path';
import * as winston from 'winston';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: false,
      entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}