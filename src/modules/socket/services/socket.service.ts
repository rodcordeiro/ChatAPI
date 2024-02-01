import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { EncryptUtils } from '@/common/utils/encrypt.util';
import { ChatServices } from '@/modules/chats/services/chat.service';

@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, Socket> = new Map();
  private logger = new Logger('SocketServices');

  constructor(
    private readonly _jwtServices: JwtService,
    private readonly _chatService: ChatServices,
  ) {}
  async handleConnection(socket: Socket): Promise<void> {
    this.logger.log(`[socket:${socket.id}]`);
    const authorization = socket.handshake.headers.authorization;

    if (!authorization) {
      socket.disconnect(true);
      return;
    }

    try {
      const token = authorization.split(' ')[1];
      const decode = this._jwtServices.decode(token);

      const data = EncryptUtils.decrypt(
        decode.payload as string,
        process.env.ENC_SECRET,
      );

      this.connectedClients.set(data.id, socket);
      const unreadMessages = await this._chatService.unread(data.id);
      if (unreadMessages) socket.emit('unread_messages', unreadMessages);
      socket.on('disconnect', () => {
        this.connectedClients.delete(data.id);
      });
    } catch (error) {
      console.error(error);
      socket.disconnect(true);
      // if (error.name === 'TokenExpiredError')
      //   throw new UnauthorizedException(
      //     'The session has expired. Please relogin',
      //   );
      // else if (error.name === 'JsonWebTokenError')
      //   throw new UnauthorizedException('Token malformed');
      // else throw new UnauthorizedException(error.message);
    }

    // Handle other events and messages from the client
  }

  handleSendDirectMessage(message: ChatJS.Message) {
    const destiny = this.connectedClients.get(message.metadata.to);
    this._chatService.create(message, !!destiny);

    if (!destiny) return;
    destiny.emit('message', message);
  }

  // Add more methods for handling events, messages, etc.
}
