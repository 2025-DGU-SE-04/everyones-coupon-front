import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { getGameDetail, getGameCoupons } from "../api/gameApi";
import HeaderBanner from "../components/HeaderBanner";
import GameInfoSection from "../components/GameInfoSection";
import AdminCouponItem from "../components/AdminCouponItem";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function AdminGamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAdminAuth();
  const [game, setGame] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      setError("게임 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCouponDelete = () => {
    loadData();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
          <Card>
            <div className="text-center">
              <p className="text-danger-700 font-medium text-lg mb-4">
                {error || "게임 정보를 찾을 수 없습니다."}
              </p>
              <Button variant="primary" onClick={() => navigate("/admin/dashboard")}>
                대시보드로 돌아가기
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white">
      <div className="bg-white border-b border-secondary-200 sticky top-0 z-50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              대시보드
            </Button>
            <h1 className="text-xl font-bold text-secondary-900">쿠폰 관리</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 pb-24">
        <GameInfoSection game={game} />

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-secondary-900">쿠폰 목록</h2>
            <Button variant="primary" size="sm" onClick={loadData}>
              새로고침
            </Button>
          </div>
          <p className="text-sm text-secondary-500">
            {coupons.length > 0 ? `총 ${coupons.length}개의 쿠폰` : "등록된 쿠폰이 없습니다"}
          </p>
        </div>

        {coupons.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-secondary-600 text-base mb-2">등록된 쿠폰이 없습니다.</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {coupons.map((coupon) => (
              <AdminCouponItem
                key={coupon.id}
                coupon={coupon}
                gameId={gameId}
                onDelete={handleCouponDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
