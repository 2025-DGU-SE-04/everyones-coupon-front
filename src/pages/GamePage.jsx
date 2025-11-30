import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameDetail, getGameCoupons } from "../api/gameApi";
import HeaderBanner from "../components/HeaderBanner";
import GameInfoSection from "../components/GameInfoSection";
import CouponItem from "../components/CouponItem";
import AddCouponButton from "../components/AddCouponButton";
import SortSelector from "../components/SortSelector";

export default function GamePage() {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortLoading, setSortLoading] = useState(false); // 정렬 변경 시 로딩
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("createdAt"); // 정렬 옵션: "createdAt" | "score"

  const loadCoupons = async (sortOption = sortBy, isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setLoading(true);
      } else {
        setSortLoading(true);
      }
      setError("");
      
      // 정렬 옵션을 백엔드 형식으로 변환 (desc 추가)
      const sortValue = sortOption === "createdAt" ? "createdAt,desc" : "score,desc";
      const sortArray = [sortValue]; // 백엔드가 배열을 기대하므로 배열로 변환
      const couponRes = await getGameCoupons(gameId, 0, 50, sortArray);
      
      const mappedCoupons = couponRes.content.map((c) => ({
        id: c.id,
        code: c.code,
        reward: c.reward,
        expirationDate: c.expirationDate,
        dday: c.dday,
        validCount: c.validCount,
        invalidCount: c.invalidCount,
        like: c.validCount,
        dislike: c.invalidCount,
      }));
      setCoupons(mappedCoupons);
    } catch (error) {
      console.error("쿠폰 목록 불러오기 실패:", error);
      setError("쿠폰 목록을 불러오는데 실패했습니다.");
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      } else {
        setSortLoading(false);
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");
        
        const gameRes = await getGameDetail(gameId);
        const mappedGame = {
          id: gameRes.id,
          name: gameRes.title,
          iconUrl: gameRes.gameImageUrl,
          howToUse: gameRes.gameDescription,
          link: gameRes.couponUsageLink,
        };
        setGame(mappedGame);

        // 게임 정보 로드 후 쿠폰 목록 로드
        await loadCoupons(sortBy, true);
      } catch (error) {
        console.error("게임 상세 불러오기 실패:", error);
        setError("게임 정보를 불러오는데 실패했습니다.");
        setLoading(false);
      }
    };

    loadData();
  }, [gameId]);

  const handleSortChange = async (newSort) => {
    if (newSort === sortBy) return; // 같은 정렬 옵션 선택 시 무시
    setSortBy(newSort);
    await loadCoupons(newSort, false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white">
        <HeaderBanner />
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mb-4"></div>
            <p className="text-secondary-500 text-base">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white">
        <HeaderBanner />
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-20">
          <div className="bg-danger-50 border-2 border-danger-200 rounded-2xl p-8 text-center">
            <p className="text-danger-700 font-medium text-lg">
              {error || "게임 정보를 찾을 수 없습니다."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white">
      <HeaderBanner />
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 pb-24">
        <GameInfoSection game={game} />
        
        <AddCouponButton gameId={gameId} />

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-1">유효 쿠폰</h2>
              <p className="text-sm text-secondary-500">
                {coupons.length > 0 ? `${coupons.length}개의 쿠폰이 등록되어 있습니다` : "등록된 쿠폰이 없습니다"}
              </p>
            </div>
            {coupons.length > 0 && (
              <div className="flex items-center gap-2">
                <SortSelector 
                  currentSort={sortBy} 
                  onSortChange={handleSortChange}
                  disabled={sortLoading}
                />
                {sortLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-600 border-t-transparent"></div>
                )}
              </div>
            )}
          </div>
        </div>

        {coupons.length === 0 ? (
          <div className="bg-secondary-50 border-2 border-secondary-200 rounded-2xl p-8 text-center">
            <p className="text-secondary-600 text-base">아직 등록된 쿠폰이 없습니다.</p>
            <p className="text-sm text-secondary-500 mt-2">첫 번째 쿠폰을 등록해보세요!</p>
          </div>
        ) : (
          coupons.map((coupon) => (
            <CouponItem 
              key={coupon.id} 
              coupon={coupon} 
              onVoteUpdate={() => loadCoupons(sortBy, false)}
            />
          ))
        )}
      </div>
    </div>
  );
}
