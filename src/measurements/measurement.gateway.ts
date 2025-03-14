import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';

@WebSocketGateway({ cors: true })
@Injectable()
export class MeasurementGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  // Store a mapping of measurement IDs to client sockets
  private measurementClients: Map<number, Socket> = new Map();

  constructor(private readonly measurementService: MeasurementsService) {}

  // OnModuleInit ensures the WebSocket server is initialized
  onModuleInit() {
    console.log('WebSocket Gateway initialized');
    this.server.on('connection', (client: Socket) => {
      console.log('New client connected', client.id);

      client.on('disconnect', () => {
        console.log('Client disconnected', client.id);
        // Remove the client from our measurementClients map when they disconnect
        this.removeClientFromMeasurement(client);
      });
    });
  }

  // Handle the start measurement event
  @SubscribeMessage('startMeasurement')
  async handleStartMeasurement(@MessageBody() data: { measurementId: number }, @ConnectedSocket() client: Socket) {
    console.log(`Measurement started: ${data.measurementId}`);

    // Store the client in the map for this measurement
    this.measurementClients.set(data.measurementId, client);

    // Optionally send a confirmation or other info back to the client
    client.emit('measurementStarted', { measurementId: data.measurementId });
  }

  // Handle the update measurement event
  @SubscribeMessage('updateMeasurement')
  async handleUpdateMeasurement(@MessageBody() data: { measurementId: number, duration: number, explored: number }) {
    console.log(`Updating measurement: ${JSON.stringify(data)}`);

    // Update the measurement in the database
    await this.measurementService.edit(data.measurementId, data.explored, data.duration);

    // Get the specific client for this measurement
    const client = this.measurementClients.get(data.measurementId);

    if (client) {
      // Emit the update to the specific client associated with this measurement
      client.emit('measurementUpdated', data);
    }
  }

  // Handle the stop measurement event
  @SubscribeMessage('stopMeasurement')
  async handleStopMeasurement(@MessageBody() data: { measurementId: number }) {
    console.log(`Measurement stopped: ${data.measurementId}`);

    // Optionally, you can perform additional stop-related logic here (e.g., marking the measurement as complete)

    // Get the specific client for this measurement
    const client = this.measurementClients.get(data.measurementId);

    if (client) {
      // Notify the specific client that the measurement has stopped
      client.emit('measurementStopped', { measurementId: data.measurementId });

      // Remove the client from the map when the measurement is stopped
      this.removeClientFromMeasurement(client);
    }
  }

  // Helper method to remove a client from the map
  private removeClientFromMeasurement(client: Socket) {
    for (const [measurementId, socket] of this.measurementClients.entries()) {
      if (socket.id === client.id) {
        this.measurementClients.delete(measurementId);
        break;
      }
    }
  }
}
