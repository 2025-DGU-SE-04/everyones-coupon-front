import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getGameDetail,
  getGameCoupons,
  uploadGameImage,
} from "../api/gameApi";
import { useAdminStore } from "../store/adminStore";
import CouponItem from "../components/CouponItem";
import HeaderBanner from "../components/HeaderBanner";

export default function GamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const isAdmin = useAdminStore((state) => state.isAdmin);

  const [game, setGame] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ 게임 상세 + 쿠폰 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameRes = await getGameDetail(gameId);
        setGame({
          id: gameRes.id,
          name: gameRes.title,
          iconUrl: gameRes.gameImageUrl,
          howToUse: gameRes.gameDescription,
          link: gameRes.couponUsageLink,
        });

        const couponRes = await getGameCoupons(gameId);
        setCoupons(couponRes.content);
      } catch (e) {
        console.error(e);
        alert("게임 정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gameId]);

  // ✅ 관리자 전용: 이미지 업로드 핸들러 (중복 제거된 최종본)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await uploadGameImage(gameId, file);
      alert("✅ 게임 이미지 업로드 완료");
      window.location.reload();
    } catch (e) {
      console.error(e);
      alert("❌ 관리자만 업로드 가능");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        로딩 중...
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        게임 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ 상단 배너 (홈 이동) */}
      <HeaderBanner />

      <div className="w-full max-w-2xl mx-auto mt-8 px-4">
        {/* ✅ 게임 기본 정보 */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex items-center mb-4">
            {game.iconUrl ? (
              <img
                src={game.iconUrl}
                alt={game.name}
                className="w-16 h-16 rounded-xl mr-4 object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl mr-4 bg-gray-300 flex items-center justify-center text-sm">
                NO IMAGE
              </div>
            )}

            <h1 className="text-2xl font-bold">{game.name}</h1>
          </div>

          <div className="text-sm text-gray-700 mb-3 whitespace-pre-line">
            {game.howToUse}
          </div>

          {game.link && (
            <a
              href={game.link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline text-sm"
            >
              쿠폰 사용 링크 바로가기
            </a>
          )}
        </div>

        {/* ✅ 관리자 전용: 게임 이미지 업로드 */}
        {isAdmin && (
          <div className="mb-6 p-4 border rounded bg-gray-50">
            <p className="text-sm font-semibold mb-2">
              관리자 전용 · 게임 이미지 변경
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        )}

        {/* ✅ 쿠폰 목록 */}
        <div className="mb-20">
          {coupons.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              등록된 쿠폰이 없습니다.
            </div>
          ) : (
            coupons.map((coupon) => (
              <CouponItem key={coupon.id} coupon={coupon} />
            ))
          )}
        </div>

        {/* ✅ 쿠폰 추가하기 버튼 */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => navigate(`/game/${gameId}/add-coupon`)}
            className="bg-black text-white px-5 py-3 rounded-full shadow hover:bg-gray-800"
          >
            + 쿠폰 추가하기
          </button>
        </div>
      </div>
    </div>
  );
}
