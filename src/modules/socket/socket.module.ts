import { Module } from '@nestjs/common';
import { SocketGateway } from './gateways/socket.gateway';
import { SocketService } from './services/socket.service';
import { NestJwtModule } from '@/core/jwt/jwt.module';

@Module({
  imports: [NestJwtModule],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
