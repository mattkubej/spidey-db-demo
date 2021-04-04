import spideydb from '$lib/spidey-db';
import type { Response } from '@sveltejs/kit';

export async function get(): Promise<Response> {
  const [vertices, edges] = await spideydb.getVertex();

  return {
    body: { vertices, edges },
  };
}
