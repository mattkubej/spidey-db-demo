import spideydb from '$lib/spidey-db';
import type { Request, Response } from '@sveltejs/kit';

export async function get({ query }: Request): Promise<Response> {
  const vertex = query.get('vertex');
  const distance = query.get('distance');

  if (vertex === null || distance === null) {
    return {
      body: {
        vertices: [],
        edges: [],
      },
    };
  }

  await spideydb.bootstrap();
  const [vertices, edges] = await spideydb.getNeighbors(
    vertex,
    Number(distance)
  );

  return {
    body: { vertices, edges },
  };
}
