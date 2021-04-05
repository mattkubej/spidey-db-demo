export async function getNeighbors(
  vertex: string,
  distance: string
): Promise<SpideyDbGraph> {
  const res = await fetch(
    `/graph/neighbors?vertex=${vertex}&distance=${distance}`
  );
  return res.json();
}

export async function getGraph(): Promise<SpideyDbGraph> {
  const res = await fetch('/graph/full');
  return res.json();
}

export async function populateGraph(): Promise<boolean> {
  const res = await fetch('/graph/populate', {
    method: 'POST',
  });

  const { ok } = await res.json();

  return ok;
}

export async function getVertex(key: string): Promise<string> {
  const res = await fetch(`/graph/vertex/${key}`);
  return res.text();
}
