import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';

@WebSocketGateway({ cors: true })
@Injectable()
export class MeasurementGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly measurementService: MeasurementsService) {}

  @SubscribeMessage('startMeasurement')
  async handleStartMeasurement(@MessageBody() data: { measurementId: number }, @ConnectedSocket() client: Socket) {
    console.log(`Measurement started: ${data.measurementId}`);
    client.join(`measurement-${data.measurementId}`); // Group clients for a measurement
  }

  @SubscribeMessage('updateMeasurement')
  async handleUpdateMeasurement(@MessageBody() data: { measurementId: number, duration: number, explored: number }) {
    console.log(`Updating measurement: ${JSON.stringify(data)}`);

    await this.measurementService.edit(data.measurementId, data.explored, data.duration);

    // Emit update to all clients tracking this measurement
    this.server.to(`measurement-${data.measurementId}`).emit('measurementUpdated', data);
  }

  @SubscribeMessage('stopMeasurement')
  async handleStopMeasurement(@MessageBody() data: { measurementId: number }) {
    console.log(`Measurement stopped: ${data.measurementId}`);
  }
}
