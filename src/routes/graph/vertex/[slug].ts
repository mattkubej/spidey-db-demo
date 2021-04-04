import spideydb from '$lib/spidey-db';
import type { Request, Response } from '@sveltejs/kit';

export async function get({ params }: Request): Promise<Response> {
  const { slug: id } = params;
  const body = await spideydb.getVertex(id);

  return {
    body,
  };
}
