import SpideyDbClient from './client';

class SpideyDb {
  private client: SpideyDbClient;

  constructor() {
    this.client = new SpideyDbClient();
    this.client.connect();
  }

  async populate() {
    await this.client.setVertex('a', "node a's data");
    await this.client.setVertex('b', "node b's data");
    await this.client.setVertex('c', "node c's data");
    await this.client.setVertex('d', "node d's data");
    await this.client.setVertex('e', "node e's data");

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
