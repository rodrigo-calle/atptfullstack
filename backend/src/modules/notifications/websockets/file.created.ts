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

  @OnEvent('file.updated.status.approved')
  handleFileUpdated(@MessageBody() payload: any) {
    this.server.emit('file-updated-approved', payload);
  }

  @OnEvent('file.updated.status.rejected')
  handleFileUpdatedRejected(@MessageBody() payload: any) {
    this.server.emit('file-updated-rejected', payload);
  }
}
