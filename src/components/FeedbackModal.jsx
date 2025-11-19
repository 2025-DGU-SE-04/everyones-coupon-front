import { useEffect, useState } from "react";

export default function FeedbackModal({ coupon, onClose }) {
  const [selected, setSelected] = useState(null); // "like" or "dislike"
  const [comment, setComment] = useState("");

  const STORAGE_KEY = `feedback_${coupon.id}`;

  // 하루 1번 제한 확인
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.date === getToday()) {
      setSelected(saved.type);
      setComment(saved.comment || "");
    }
  }, []);

  const getToday = () => {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };

  const handleSelect = (type) => {
    // 동일한 버튼 클릭 → 취소
    if (selected === type) {
      setSelected(null);
      setComment("");
      return;
    }
    setSelected(type);
  };

  const handleSubmit = () => {
    if (!selected) {
      alert("피드백을 선택해주세요.");
      return;
    }

    const data = {
      type: selected,
      comment: comment,
      date: getToday(),
    };

    // 하루 1번 저장
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // 서버 연동한다면 여기서 POST
    // await api.post(`/coupon/${coupon.id}/feedback`, data);

    alert("피드백이 제출되었습니다!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-96 p-6 rounded-xl shadow-xl">
        
        <h2 className="text-xl font-bold text-center mb-4">
          쿠폰 피드백
        </h2>

        {/* 버튼 영역 */}
        <div className="flex justify-around mb-4">
          <button
            className={`px-4 py-2 rounded-lg border 
              ${selected === "like" ? "bg-green-100 border-green-500" : ""}
            `}
            onClick={() => handleSelect("like")}
          >
            👍 유효함
          </button>

          <button
            className={`px-4 py-2 rounded-lg border 
              ${selected === "dislike" ? "bg-red-100 border-red-500" : ""}
            `}
            onClick={() => handleSelect("dislike")}
          >
            👎 유효하지 않음
          </button>
        </div>

        {/* 의견 입력 칸 */}
        {selected && (
          <textarea
            placeholder="추가 의견을 입력해주세요"
            className="border w-full p-2 rounded-lg h-24"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        )}

        {/* 제출 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4"
        >
          피드백 제출
        </button>

        <button
          onClick={onClose}
          className="w-full text-gray-500 py-2 mt-2"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
