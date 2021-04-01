export async function getNeighbors(
  vertex: string,
  distance: string
): Promise<SpideyDbGraph> {
  const res = await fetch(
    `/graph/neighbors?vertex=${vertex}&distance=${distance}`
  );
  return res.json();
}
