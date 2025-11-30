import { useState } from "react";
import { voteCoupon, deleteCoupon } from "../api/gameApi";
import { useAdminStore } from "../store/adminStore";

export default function CouponItem({ coupon }) {
  const [validCount, setValidCount] = useState(coupon.validCount);
  const [invalidCount, setInvalidCount] = useState(coupon.invalidCount);
  const isAdmin = useAdminStore((state) => state.isAdmin);

  // ✅ 추천 / 비추천
  const handleVote = async (isWorking) => {
    try {
      await voteCoupon(coupon.id, isWorking);

      if (isWorking) {
        setValidCount((prev) => prev + 1);
      } else {
        setInvalidCount((prev) => prev + 1);
      }
    } catch (e) {
      console.error("피드백 실패:", e);
      alert("피드백 등록 실패");
    }
  };

  // ✅ 관리자 쿠폰 삭제
  const handleDelete = async () => {
    if (!window.confirm("이 쿠폰을 삭제하시겠습니까?")) return;

    try {
      await deleteCoupon(coupon.id);
      alert("쿠폰 삭제 완료");
      window.location.reload(); // ✅ 가장 안전한 방식
    } catch (e) {
      console.error(e);
      alert("관리자 권한이 없거나 삭제 실패");
    }
  };

  return (
    <div className="border rounded-xl p-4 mb-4 shadow bg-white relative">
      {/* ✅ 쿠폰 코드 */}
      <div className="font-semibold text-lg mb-1">{coupon.code}</div>

      {/* ✅ 보상 */}
      <div className="text-sm text-gray-600 mb-2">{coupon.reward}</div>

      {/* ✅ 만료 */}
      <div className="text-xs text-gray-500 mb-3">
        ⏰ {coupon.expirationDate ? coupon.expirationDate : "무기한"} /{" "}
        {coupon.dday}
      </div>

      {/* ✅ 누적 추천 / 비추천 */}
      <div className="flex gap-4 text-sm mb-3">
        👍 {validCount} | 👎 {invalidCount}
      </div>

      {/* ✅ 추천 / 비추천 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={() => handleVote(true)}
          className="px-3 py-1 text-sm rounded bg-green-500 text-white hover:opacity-90"
        >
          추천
        </button>

        <button
          onClick={() => handleVote(false)}
          className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:opacity-90"
        >
          비추천
        </button>
      </div>

      {/* ✅ 관리자만 삭제 버튼 */}
      {isAdmin && (
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
        >
          ❌ 삭제
        </button>
      )}
    </div>
  );
}
