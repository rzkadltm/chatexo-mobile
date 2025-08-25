import { useCallback, useEffect, useState } from 'react';
import { Room } from '../types/roomTypes';

interface UseRoomsOptions {
  pageSize?: number;
  fetchDelayMs?: number;
}

export function useRooms(allRooms: Room[], options: UseRoomsOptions = {}) {
  const { pageSize = 10, fetchDelayMs = 1000 } = options;

  const [rooms, setRooms] = useState<Room[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchRooms = useCallback(
    async (pageNum: number) => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, fetchDelayMs)); // simulate API delay

      const startIndex = (pageNum - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const newRooms = allRooms.slice(startIndex, endIndex);

      setRooms((prev) => [...prev, ...newRooms]);
      setHasMore(endIndex < allRooms.length);
      setLoading(false);
    },
    [allRooms, pageSize, fetchDelayMs],
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchRooms(nextPage);
    }
  }, [loading, hasMore, page, fetchRooms]);

  useEffect(() => {
    fetchRooms(1);
  }, [fetchRooms]);

  return { rooms, loading, hasMore, loadMore };
}
