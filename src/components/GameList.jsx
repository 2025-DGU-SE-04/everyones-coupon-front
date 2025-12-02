import { useEffect, useState, useMemo } from "react";
import GameCard from "./GameCard";
import SortSelector from "./SortSelector";
import { getGameList } from "../api/gameApi";

export default function GameList() {
  const [games, setGames] = useState([]);
  const [sortBy, setSortBy] = useState("popular"); // popular: 서버에서 전달되는 기본(인기) 순서
  // 동률(타이브레이크) 처리 시 서버에서 전달된 원래 순서를 유지하기 위함
  // 각 게임 객체에 _originalIndex로 원래 순서를 저장함
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hooks 규칙(일관된 호출 순서)을 만족시키기 위해 early return 이전에 정렬된 게임 목록을 계산
  const sortedGames = useMemo(() => {
    const sorted = [...games];
    if (sortBy === "popular") {
      return sorted;
    }

    if (sortBy === "couponCount") {
      sorted.sort((a, b) => {
        const ac = a.couponCount ?? 0;
        const bc = b.couponCount ?? 0;
        if (bc !== ac) return bc - ac; // 내림차순
        // 동점일 경우 원래 서버에서 받은 순서를 유지
        return (a._originalIndex ?? 0) - (b._originalIndex ?? 0);
      });
    } else if (sortBy === "viewCount") {
      sorted.sort((a, b) => {
        const av = a.viewCount ?? 0;
        const bv = b.viewCount ?? 0;
        if (bv !== av) return bv - av; // 내림차순
        return (a._originalIndex ?? 0) - (b._originalIndex ?? 0);
      });
    }

    return sorted;
  }, [games, sortBy]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await getGameList();
        const list = Array.isArray(result) ? result : [];
        // 원래 순서를 나타내는 인덱스를 저장
        const mappedList = list.map((g, i) => ({ ...g, _originalIndex: i }));
        setGames(mappedList);
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
      <div className="flex items-center justify-end mb-4">
        <SortSelector
          currentSort={sortBy}
          onSortChange={(v) => setSortBy(v)}
          options={[
            { value: "popular", label: "인기순" },
            { value: "couponCount", label: "쿠폰수순" },
            { value: "viewCount", label: "조회수순" },
          ]}
        />
      </div>
      {/* 선택된 정렬 옵션에 따라 게임을 정렬, 동률인 경우에는 서버에서 받은 인기 순서를 사용 */}
      {sortedGames.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  );
}
