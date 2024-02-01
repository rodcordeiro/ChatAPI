import { Module } from '@nestjs/common';

import { NestJwtModule } from '@/core/jwt/jwt.module';
import { ChatModule } from '@/modules/chats/chat.module';

import { SocketGateway } from './gateways/socket.gateway';
import { SocketService } from './services/socket.service';

@Module({
  imports: [NestJwtModule, ChatModule],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
