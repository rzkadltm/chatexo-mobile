export async function fetchRooms(page: number, limit: number) {
  await new Promise(res => setTimeout(res, 500));

  return Array.from({ length: limit }, (_, i) => ({
    id: page * limit + i + 1,
    name: `Room ${page * limit + i + 1}`,
  }));
}