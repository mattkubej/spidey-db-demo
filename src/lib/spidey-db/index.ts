import SpideyDbClient from './client';

class SpideyDb {
  private client: SpideyDbClient;

  constructor() {
    this.client = new SpideyDbClient();
    this.client.connect();
  }

  async populate() {
    await this.client.setVertex('a', '1');
    await this.client.setVertex('b', '2');
    await this.client.setVertex('c', '3');
    await this.client.setVertex('d', '4');
    await this.client.setVertex('e', '5');

    await this.client.setEdge('a', 'b');
    await this.client.setEdge('b', 'c');
    await this.client.setEdge('c', 'd');
    await this.client.setEdge('d', 'e');
  }

  async getNeighbors(vertexKey: string, distance: number): Promise<string[]> {
    return this.client.getNeighbors(vertexKey, distance);
  }

  async getGraph(): Promise<string[]> {
    return this.client.getGraph();
  }

  async getVertex(key: string): Promise<string> {
    return this.client.getVertex(key);
  }
}

export default new SpideyDb();
