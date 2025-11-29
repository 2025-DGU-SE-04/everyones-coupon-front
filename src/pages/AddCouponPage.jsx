import { useParams, useNavigate } from "react-router-dom";
import { addCoupon } from "../api/gameApi";
import { useState } from "react";
import HeaderBanner from "../components/HeaderBanner";

export default function AddCouponPage() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [reward, setReward] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const formattedDate = expirationDate.replaceAll("-", ".");

  const handleSubmit = async () => {
    try {
      const payload = {
        code,
        reward,
        expireDate:formattedDate, // ✅ "2025-12-13" 그대로
      };
  
      console.log("✅ 최종 payload:", payload);
      console.log("✅ 현재 gameId:", gameId);
  
      await addCoupon(gameId, payload);
  
      alert("✅ 쿠폰 등록 성공!");
      navigate(`/game/${gameId}`);
    } catch (err) {
      console.error("❌ 쿠폰 등록 실패:", err);
      alert("쿠폰 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ 상단 배너 */}
      <HeaderBanner />

      <div className="flex justify-center px-4 mt-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-center mb-6">쿠폰 추가하기</h2>

          <div className="mb-4">
            <label className="block font-semibold mb-2">쿠폰 번호</label>
            <input
              className="w-full border p-3 rounded-lg"
              placeholder="예: CAPY500"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">쿠폰 보상</label>
            <input
              className="w-full border p-3 rounded-lg"
              placeholder="예: 루비 500개"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">만료 날짜</label>
            <input
              type="date"
              className="w-full border p-3 rounded-lg"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
