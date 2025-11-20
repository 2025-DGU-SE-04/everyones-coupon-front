import { useState } from "react";

export default function CouponItem({ coupon }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null); // like / dislike
  const [comment, setComment] = useState("");

  return (
    <div className="w-full bg-white rounded-xl shadow p-4 mb-3 transition">
      
      {/* 기본 쿠폰 카드 */}
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg font-semibold">{coupon.code}</div>
          <div className="text-gray-600">{coupon.reward}</div>
          <div className="text-sm text-gray-500">
            {coupon.expire ? `만료: ${coupon.expire}` : "만료일 없음"}
          </div>
        </div>

        <button
          className="bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200"
          onClick={() => setOpen((prev) => !prev)}
        >
          피드백
        </button>
      </div>

      {/* 🔥 항상 보이는 누적 피드백 수 */}
      <div className="flex gap-4 mt-2 text-sm text-gray-600">
        <div>👍 {coupon.like}</div>
        <div>👎 {coupon.dislike}</div>
      </div>
      {/* 🔥 피드백 박스 (슬라이드 열림) */}
      <div
        className={`
          overflow-hidden transition-all duration-300
          ${open ? "max-h-[380px] opacity-100 mt-3" : "max-h-0 opacity-0"}
        `}
      >
        <div className="border rounded-xl p-4 bg-gray-50 flex flex-col gap-4">

          {/* 누적 피드백 */}
          <div className="flex justify-center gap-6 text-gray-600 text-sm">
            <div>👍 {coupon.like}</div>
            <div>👎 {coupon.dislike}</div>
          </div>

          {/* 추천/비추천 */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setSelected("like")}
              className={`
                px-4 py-2 rounded-xl border transition-all transform
                hover:scale-105 hover:bg-yellow-50
                ${selected === "like" ? "border-blue-500 bg-blue-50" : ""}
              `}
            >
              👍 유효함
            </button>

            <button
              onClick={() => setSelected("dislike")}
              className={`
                px-4 py-2 rounded-xl border transition-all transform
                hover:scale-105 hover:bg-red-50
                ${selected === "dislike" ? "border-red-500 bg-red-50" : ""}
              `}
            >
              👎 유효하지 않음
            </button>
          </div>

          {/* 의견 입력 */}
          <div
            className={`
              overflow-hidden transition-all duration-300
              ${selected ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="추가 의견 입력"
              className="w-full border p-3 rounded-lg resize-none h-24 mt-2"
            />
          </div>

          {/* 제출 버튼 */}
          <button
            onClick={() => alert("피드백 제출 완료!")}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
}
