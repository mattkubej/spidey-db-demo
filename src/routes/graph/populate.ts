import spideydb from '$lib/spidey-db';
import type { Response } from '@sveltejs/kit';

export async function post(): Promise<Response> {
  await spideydb.populate();

  return {
    body: { ok: true },
  };
}
