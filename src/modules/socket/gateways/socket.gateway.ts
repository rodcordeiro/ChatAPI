import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  //   WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { WsAuth } from '@/common/decorators/auth.decorator';

import { SocketService } from '../services/socket.service';
import { Logger } from '@nestjs/common';

@WsAuth()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayInit {
  @WebSocketServer()
  private server: Server;
  private logger = new Logger('SocketGateway');

  constructor(private readonly _socketService: SocketService) {}
  afterInit() {
    this.logger.debug('Sockets initialized');
  }
  handleConnection(socket: Socket): void {
    this._socketService.handleConnection(socket);
  }
  @SubscribeMessage('identity')
  async identity(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: number,
  ) {
    console.log({ data });
    return client.emit('response', data);
  }
  @SubscribeMessage('message')
  async message(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: ChatJS.Message,
  ) {
    // console.log(client, data);
    this.server.to(data.metadata.to).emit('message', {
      ...data,
      metadata: { ...data.metadata, author: 'server' },
    });
  }
}
