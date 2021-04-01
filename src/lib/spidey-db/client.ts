import { createConnection, Socket } from 'net';
import * as encoder from './encoder';
import * as decoder from './decoder';

export default class SpideyDbClient {
  private host = 'localhost';
  private port = 6425;
  private socket?: Socket;

  private handleServerConnection(): void {
    console.log('connected to spidey db');
  }

  private handleServerDisconnect(): void {
    console.log('disconnected from spidey db');
  }

  async send(request: string[]): Promise<string | string[]> {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        return reject('not connected');
      }

      this.socket.once('data', (data: Buffer) => {
        const response = decoder.decode(data);

        if (Array.isArray(response)) {
          resolve(response as string[]);
        } else {
          resolve(String(response));
        }
      });

      const respRequest = encoder.encodeArray(
        request.map(encoder.encodeBulkString)
      );

      this.socket.write(respRequest);
    });
  }

  async isConnected(): Promise<boolean> {
    const response = await this.send(['PING']);
    return response === 'PONG';
  }

  async setVertex(key: string, value: string): Promise<boolean> {
    const response = await this.send(['SETVERTEX', key, value]);
    return String(response) === 'OK';
  }

  async getVertex(key: string): Promise<string> {
    const response = await this.send(['GETVERTEX', key]);
    return String(response);
  }

  async setEdge(srcVertexKey: string, destVertexKey: string): Promise<boolean> {
    const response = await this.send(['SETEDGE', srcVertexKey, destVertexKey]);
    return String(response) === 'OK';
  }

  async getNeighbors(vertexKey: string, distance: number): Promise<string[]> {
    const response = await this.send([
      'GETNEIGHBORS',
      vertexKey,
      String(distance),
    ]);

    if (!Array.isArray(response)) {
      throw Error('unexpected response');
    }

    return response;
  }

  async getGraph(): Promise<string[]> {
    const response = await this.send(['GETGRAPH']);

    if (!Array.isArray(response)) {
      throw Error('unexpected response');
    }

    return response;
  }

  connect(): void {
    const client = createConnection(
      this.port,
      this.host,
      this.handleServerConnection.bind(this)
    );

    client.on('end', this.handleServerDisconnect.bind(this));

    this.socket = client;
  }
}
