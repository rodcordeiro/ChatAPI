import { Module } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { DatabaseModule } from './core/database/database.module';
import { NestJwtModule } from './core/jwt/jwt.module';
import { SharedModule } from './modules/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    PassportModule,
    NestJwtModule,
    SharedModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
