import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameDetail, getGameCoupons } from "../api/gameApi";
import GameInfoSection from "../components/GameInfoSection";
import CouponItem from "../components/CouponItem";

export default function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1) 게임 상세 조회
        const gameRes = await getGameDetail(id);

        const mappedGame = {
          id: gameRes.id,
          name: gameRes.title,                   // ← 백엔드 title
          iconUrl: gameRes.gameImageUrl,         // ← 백엔드 gameImageUrl
          howToUse: gameRes.gameDescription,     // ← 백엔드 gameDescription
          link: gameRes.couponUsageLink,         // ← 백엔드 couponUsageLink
        };

        setGame(mappedGame);

        // 2) 쿠폰 목록 조회
        const couponRes = await getGameCoupons(id);

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
        console.error("게임 상세 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center text-lg">
        로딩 중...
      </div>
    );
  }

  if (!game) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center text-lg">
        ❌ 게임 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center px-4 mt-10">
      <div className="w-full max-w-2xl">
        {/* 게임 상단 정보 섹션 */}
        <GameInfoSection game={game} />

        {/* 쿠폰 리스트 */}
        <h2 className="text-xl font-semibold mt-10 mb-4">유효 쿠폰</h2>

        {coupons.length === 0 ? (
          <div className="text-gray-500">등록된 쿠폰이 없습니다.</div>
        ) : (
          coupons.map((coupon) => (
            <CouponItem key={coupon.id} coupon={coupon} />
          ))
        )}
      </div>
    </div>
  );
}
