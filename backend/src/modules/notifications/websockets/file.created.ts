import { OnEvent } from '@nestjs/event-emitter';
import {
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class NotificationsGateway {
  @WebSocketServer() server: Server;

  @OnEvent('file.created')
  handleClienteCreado(@MessageBody() payload: any) {
    this.server.emit('new-file-notification', payload);
  }
}
