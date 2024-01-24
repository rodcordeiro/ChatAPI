import { Module } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { SharedModule } from './modules/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
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
