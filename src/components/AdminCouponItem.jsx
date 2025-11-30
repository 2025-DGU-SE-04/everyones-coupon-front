import { useState } from "react";
import { deleteCoupon } from "../api/gameApi";

export default function AdminCouponItem({ coupon, gameId, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("정말 이 쿠폰을 삭제하시겠습니까?")) {
      return;
    }

    try {
      setDeleting(true);
      await deleteCoupon(coupon.id);
      alert("쿠폰이 삭제되었습니다.");
      if (onDelete) onDelete();
    } catch (err) {
      console.error("쿠폰 삭제 실패:", err);
      alert("쿠폰 삭제에 실패했습니다.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow p-4 mb-3 flex justify-between items-center">
      <div>
        <div className="text-lg font-semibold">{coupon.code}</div>
        <div className="text-gray-600">{coupon.reward}</div>
        <div className="text-sm text-gray-500">
          {coupon.expirationDate ? `만료: ${coupon.expirationDate}` : "만료일 없음"}
        </div>
      </div>

      <button
        onClick={handleDelete}
        disabled={deleting}
        className="bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {deleting ? "삭제 중..." : "삭제"}
      </button>
    </div>
  );
}

