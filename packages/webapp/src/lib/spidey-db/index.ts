import SpideyDbClient from './client';

class SpideyDb {
  private client: SpideyDbClient;

  constructor() {
    this.client = new SpideyDbClient();
    this.client.connect();
  }

  async populate() {
    await this.client.setVertex('a', "vertex a's value");
    await this.client.setVertex('b', "vertex b's value");
    await this.client.setVertex('c', "vertex c's value");
    await this.client.setVertex('d', "vertex d's value");
    await this.client.setVertex('e', "vertex e's value");

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
