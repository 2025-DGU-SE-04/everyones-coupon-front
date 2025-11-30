import { useEffect, useRef, useState } from "react";
import GameCard from "./GameCard";
import { getGameList } from "../api/gameApi";

export default function GameList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await getGameList();
        setGames(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error("게임 목록 로드 실패:", err);
        setError("게임 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mb-4"></div>
          <p className="text-secondary-500 text-base">게임 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-danger-50 border-2 border-danger-200 rounded-2xl p-6 text-center">
          <p className="text-danger-700 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-secondary-50 border-2 border-secondary-200 rounded-2xl p-8 text-center">
          <p className="text-secondary-600 text-base">등록된 게임이 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 pb-24">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-secondary-900">인기 게임</h2>
        <p className="text-sm text-secondary-500 mt-1">쿠폰을 확인하고 공유해보세요</p>
      </div>
      {games.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  );
}
