export function createProductDeduplicator() {
  const seen = new Set<string>();

  return {
    add: (id: string) => seen.add(id),
    has: (id: string) => seen.has(id),
    filter: <T extends { id: string }>(items: T[]) =>
      items.filter((item) => !seen.has(item.id) && (seen.add(item.id), true)),
  };
}
