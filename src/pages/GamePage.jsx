import { useParams } from "react-router-dom";
import { useState } from "react";

import HeaderBanner from "../components/HeaderBanner";
import SearchBar from "../components/SearchBar";
import AddCouponButton from "../components/AddCouponButton";
//import FeedbackModal from "../components/FeedbackModal";
import CouponItem from "../components/CouponItem";
export default function GamePage() {
  const { id } = useParams();

  // 🔥 실제 서버 연결 전까지 임시 데이터
  const game = {
    id,
    name: "카피바라 어드벤처",
    icon: "https://via.placeholder.com/120",
    howToUse: "게임 설정 → 쿠폰 입력 메뉴에서 쿠폰을 입력하세요.",
    link: "https://example.com/coupon",
  };

  const coupons = [
    {
      id: 1,
      code: "CAPY500",
      reward: "루비 500개",
      expire: "2025-01-10",
      like: 2,
      dislike: 0,
    },
    {
      id: 2,
      code: "FREESTUFF",
      reward: "무료 아이템 1개",
      expire: null,
      like: 1,
      dislike: 0,
    },
    {
      id: 3,
      code: "WELCOME100",
      reward: "골드 100개",
      expire: "2025-05-30",
      like: 0,
      dislike: 1,
    },
  ];

  // 피드백 모달 온/오프 상태
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 pb-20">
      <HeaderBanner />
      <SearchBar />

      {/* 게임 로고 + 이름 */}
      <div className="mt-6 flex flex-col items-center">
        <img
          src={game.icon}
          alt={game.name}
          className="w-28 h-28 rounded-2xl shadow mb-3"
        />
        <h2 className="text-2xl font-bold">{game.name}</h2>
      </div>

      {/* 쿠폰 사용 방법 */}
      <div className="w-full max-w-xl bg-white p-5 rounded-2xl shadow mt-6">
        <h3 className="text-lg font-bold mb-2">쿠폰 사용 방법</h3>
        <p className="text-gray-700 leading-6">{game.howToUse}</p>

        <h3 className="text-lg font-bold mt-4">쿠폰 사용 링크</h3>
        <a
          href={game.link}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline break-all"
        >
          {game.link}
        </a>
      </div>

      {/* 쿠폰 추가 버튼 */}
      <AddCouponButton />

      {/* 유효 쿠폰 목록 */}
      <div className="w-full max-w-xl mt-6 flex flex-col gap-4 px-4">
        <h3 className="text-xl font-bold mb-1">유효 쿠폰</h3>

        {coupons.map((c) => (
  <CouponItem key={c.id} coupon={c} />
))}
      </div>


    </div>
  );
}
