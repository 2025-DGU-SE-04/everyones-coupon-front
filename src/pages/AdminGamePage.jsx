import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { getGameDetail, getGameCoupons } from "../api/gameApi";
import HeaderBanner from "../components/HeaderBanner";
import GameInfoSection from "../components/GameInfoSection";
import AdminCouponItem from "../components/AdminCouponItem";

export default function AdminGamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAdminAuth();
  const [game, setGame] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    if (isAuthenticated) {
      loadData();
    }
  }, [gameId, isAuthenticated, authLoading, navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const gameRes = await getGameDetail(gameId);
      const mappedGame = {
        id: gameRes.id,
        name: gameRes.title,
        iconUrl: gameRes.gameImageUrl,
        howToUse: gameRes.gameDescription,
        link: gameRes.couponUsageLink,
      };
      setGame(mappedGame);

      const couponRes = await getGameCoupons(gameId);
      const mappedCoupons = couponRes.content.map((c) => ({
        id: c.id,
        code: c.code,
        reward: c.reward,
        expirationDate: c.expirationDate,
        dday: c.dday,
        validCount: c.validCount,
        invalidCount: c.invalidCount,
      }));
      setCoupons(mappedCoupons);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCouponDelete = () => {
    loadData();
  };

  if (authLoading || loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-lg">게임 정보를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center px-4 mt-10 pb-20">
      <div className="w-full max-w-2xl">
        <HeaderBanner />
        <div className="mb-4">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-blue-600 hover:text-blue-800"
          >
            ← 대시보드로 돌아가기
          </button>
        </div>

        <GameInfoSection game={game} />

        <h2 className="text-xl font-semibold mt-10 mb-4">쿠폰 목록 (관리)</h2>

        {coupons.length === 0 ? (
          <div className="text-gray-500">등록된 쿠폰이 없습니다.</div>
        ) : (
          coupons.map((coupon) => (
            <AdminCouponItem
              key={coupon.id}
              coupon={coupon}
              gameId={gameId}
              onDelete={handleCouponDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

