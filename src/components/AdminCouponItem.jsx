import { useState } from "react";
import { deleteCoupon } from "../api/gameApi";
import Card from "./ui/Card";
import Button from "./ui/Button";

export default function AdminCouponItem({ coupon, gameId, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`쿠폰 코드 "${coupon.code}"를 정말 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
      return;
    }

    try {
      setDeleting(true);
      await deleteCoupon(coupon.id);
      if (onDelete) onDelete();
    } catch (err) {
      console.error("쿠폰 삭제 실패:", err);
      alert("쿠폰 삭제에 실패했습니다.");
    } finally {
      setDeleting(false);
    }
  };

  const expirationDate = coupon.expirationDate || coupon.expire;

  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-secondary-900 break-all">{coupon.code}</h3>
          </div>
          <p className="text-base text-secondary-700 mb-1">{coupon.reward}</p>
          {expirationDate && (
            <p className="text-sm text-secondary-500">만료일: {expirationDate}</p>
          )}
          {coupon.validCount !== undefined && coupon.invalidCount !== undefined && (
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span className="text-success-600">👍 유효 {coupon.validCount}</span>
              <span className="text-danger-600">👎 무효 {coupon.invalidCount}</span>
            </div>
          )}
        </div>

        <Button
          variant="danger"
          size="md"
          onClick={handleDelete}
          disabled={deleting}
          className="flex-shrink-0"
        >
          {deleting ? "삭제 중..." : "삭제"}
        </Button>
      </div>
    </Card>
  );
}
