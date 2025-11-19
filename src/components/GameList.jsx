import { useEffect, useRef, useState } from "react";
import GameCard from "./GameCard";

export default function GameList({ fetchGames }) {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  // 페이지 변경 시 데이터 불러오기
  useEffect(() => {
    const load = async () => {
      if (!hasMore || loading) return;

      setLoading(true);
      const result = await fetchGames(page);

      if (result.length === 0) {
        setHasMore(false);
      } else {
        setGames((prev) => [...prev, ...result]);
      }

      setLoading(false);
    };

    load();
  }, [page]);

  // 마지막 요소 감지 → page 증가
  const lastElementRef = useRef();
  useEffect(() => {
    if (loading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }
  }, [loading, hasMore]);

  return (
    <div className="w-full max-w-xl flex flex-col gap-3 mt-6 mb-20 px-4">
      {games.map((g, idx) => (
        <div key={g.id} ref={idx === games.length - 1 ? lastElementRef : null}>
          <GameCard {...g} />
        </div>
      ))}

      {loading && (
        <div className="py-4 text-center text-gray-500">로딩 중...</div>
      )}

      {!hasMore && (
        <div className="py-4 text-center text-gray-400 text-sm">
          더 이상 표시할 게임이 없습니다.
        </div>
      )}
    </div>
  );
}
