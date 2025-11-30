import { useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Textarea from "./ui/Textarea";
import Badge from "./ui/Badge";

export default function CouponItem({ coupon }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [comment, setComment] = useState("");

  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    alert("쿠폰 코드가 복사되었습니다!");
  };

  const handleSubmit = () => {
    if (!selected) {
      alert("유효함 또는 유효하지 않음을 선택해주세요.");
      return;
    }
    alert("피드백 제출 완료!");
    setOpen(false);
    setSelected(null);
    setComment("");
  };

  const validCount = coupon.validCount || coupon.like || 0;
  const invalidCount = coupon.invalidCount || coupon.dislike || 0;
  const expirationDate = coupon.expirationDate || coupon.expire;

  return (
    <Card className="mb-4">
      {/* 쿠폰 정보 영역 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-secondary-900 break-all">{coupon.code}</h3>
            <button
              onClick={handleCopyCode}
              className="flex-shrink-0 p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              title="쿠폰 코드 복사"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          <p className="text-base text-secondary-700 mb-2">{coupon.reward}</p>
          {expirationDate && (
            <p className="text-sm text-secondary-500">
              만료일: {expirationDate}
            </p>
          )}
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={() => setOpen((prev) => !prev)}
          className="flex-shrink-0"
        >
          {open ? "피드백 닫기" : "피드백"}
        </Button>
      </div>

      {/* 피드백 통계 */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-secondary-200">
        <div className="flex items-center gap-2">
          <span className="text-lg">👍</span>
          <span className="text-sm font-medium text-secondary-700">{validCount}</span>
          <span className="text-xs text-secondary-500">유효</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">👎</span>
          <span className="text-sm font-medium text-secondary-700">{invalidCount}</span>
          <span className="text-xs text-secondary-500">무효</span>
        </div>
      </div>

      {/* 피드백 입력 영역 */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${open ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"}
        `}
      >
        <div className="bg-secondary-50 rounded-xl p-5 space-y-4 border-2 border-secondary-200">
          <div className="text-center">
            <p className="text-sm font-semibold text-secondary-700 mb-3">이 쿠폰이 유효한가요?</p>
            <div className="flex justify-center gap-3">
              <Button
                variant={selected === "like" ? "primary" : "outline"}
                size="md"
                onClick={() => setSelected("like")}
                className="min-w-[120px]"
              >
                👍 유효함
              </Button>
              <Button
                variant={selected === "dislike" ? "danger" : "outline"}
                size="md"
                onClick={() => setSelected("dislike")}
                className="min-w-[120px]"
              >
                👎 유효하지 않음
              </Button>
            </div>
          </div>

          {selected && (
            <div className="animate-fadeIn">
              <Textarea
                placeholder="추가 의견을 입력해주세요 (선택사항)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          )}

          {selected && (
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleSubmit}
            >
              피드백 제출하기
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
