import { useEffect, useState } from "react";
import { getGameList } from "../api/gameApi";
import GameCard from "./GameCard";

export default function GameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await getGameList();

      console.log("🔥 서버 응답 원본:", res);

      // ✅ 배열 그대로 유지 (official 포함)
      setGames(res);
    } catch (err) {
      console.error("❌ 게임 목록 조회 실패:", err);
      setGames([]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {games.length === 0 ? (
        <p className="text-center text-gray-500">
          등록된 게임이 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
