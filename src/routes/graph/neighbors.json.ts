import { SpideyDbClient } from "./_utils/spidey-db-client";
import type { Response } from "@sveltejs/kit";

export async function get(): Promise<Response> {
  const client = new SpideyDbClient();
  client.connect();

  await client.setVertex('a', '1');
  await client.setVertex('b', '2');
  await client.setVertex('c', '3');
  await client.setVertex('d', '4');
  await client.setVertex('e', '5');

  await client.setEdge('a', 'b');
  await client.setEdge('b', 'c');
  await client.setEdge('c', 'd');
  await client.setEdge('d', 'e');

  const [vertices, edges] = await client.getNeighbors('a', 3);


  return {
    body: {vertices, edges}
  };
}
