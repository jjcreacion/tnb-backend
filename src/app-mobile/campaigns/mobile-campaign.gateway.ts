import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { Logger } from '@nestjs/common';
  
  @WebSocketGateway({
    cors: {
      origin: '*', 
      methods: ['GET', 'POST'],
      credentials: true,
    },
  })
  export class MobileCampaignGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server; 
    private logger: Logger = new Logger('MobileCampaignGateway');
  
    handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`Cliente conectado: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      this.logger.log(`Cliente desconectado: ${client.id}`);
    }
  
    emitToBackoffice(event: string, data: any) {
      this.server.emit(event, data);
      this.logger.log(`Evento '${event}' emitido con datos: ${JSON.stringify(data)}`);
    }
  
  }