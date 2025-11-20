import { useState, useEffect, useRef } from "react";

export default function FeedbackModal({ coupon, onClose }) {
  const [selected, setSelected] = useState(null); // 'like' or 'dislike'
  const [comment, setComment] = useState("");

  const modalRef = useRef(null);

  // 🔥 바깥 클릭 시 닫힘 기능
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  // 🔥 추천/비추천 선택 시 의견 창 자동 열림
  const opinionOpened = selected !== null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition">
      <div
        ref={modalRef}
        className="bg-white w-11/12 max-w-md rounded-2xl shadow-xl p-6 relative animate-fadeIn"
      >
        <h2 className="text-xl font-bold text-center mb-4">쿠폰 피드백</h2>

        {/* 누적 피드백 표시 */}
        <div className="flex justify-center gap-6 text-gray-600 text-sm mb-3">
          <div>👍 {coupon.like}</div>
          <div>👎 {coupon.dislike}</div>
        </div>

        {/* 추천/비추천 버튼 */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setSelected("like")}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl border
              transition-all duration-200 transform
              hover:scale-105 hover:bg-yellow-50
              ${selected === "like" ? "border-blue-500 bg-blue-50" : ""}
            `}
          >
            👍 유효함
          </button>

          <button
            onClick={() => setSelected("dislike")}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl border
              transition-all duration-200 transform
              hover:scale-105 hover:bg-red-50
              ${selected === "dislike" ? "border-red-500 bg-red-50" : ""}
            `}
          >
            👎 유효하지 않음
          </button>
        </div>

        {/* 의견 입력 - 아래로 스르륵 열리는 애니메이션 */}
        <div
          className={`
            overflow-hidden transition-all duration-300 
            ${opinionOpened ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}
          `}
        >
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="추가 의견을 입력해주세요"
            className="w-full border p-3 rounded-lg resize-none h-28"
          />
        </div>

        {/* 제출 버튼 */}
        <button
          onClick={() => {
            alert("피드백 제출 완료!");
            onClose();
          }}
          className="w-full bg-blue-600 text-white py-3 rounded-xl mt-6 font-semibold hover:bg-blue-700 transition"
        >
          피드백 제출
        </button>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="w-full text-center mt-3 text-gray-500"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
