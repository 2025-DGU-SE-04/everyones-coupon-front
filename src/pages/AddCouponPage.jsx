import { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderBanner from "../components/HeaderBanner";

export default function AddCouponPage() {
  const { gameId } = useParams();

  const [code, setCode] = useState("");
  const [reward, setReward] = useState("");
  const [expire, setExpire] = useState("");

  const handleSubmit = () => {
    if (!code.trim()) {
      alert("쿠폰 번호를 입력하세요.");
      return;
    }

    const data = {
      code,
      reward,
      expire: expire || null, // 빈칸이면 null 처리
      gameId,
    };

    console.log("새 쿠폰 등록됨:", data);
    alert("쿠폰이 등록되었습니다!");

    setCode("");
    setReward("");
    setExpire("");
  };

  return (
    <div className="w-full flex flex-col items-center pb-20">
      <HeaderBanner />

      <h2 className="text-2xl font-bold mt-6 mb-4">쿠폰 추가하기</h2>

      <div className="w-full max-w-xl bg-white shadow rounded-xl p-6 flex flex-col gap-4">

        <div>
          <label className="font-semibold">쿠폰 번호</label>
          <input
            type="text"
            className="w-full border p-3 rounded-lg mt-1"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="예: CAPY500"
          />
        </div>

        <div>
          <label className="font-semibold">쿠폰 보상</label>
          <input
            type="text"
            className="w-full border p-3 rounded-lg mt-1"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            placeholder="예: 루비 500개"
          />
        </div>

        <div>
          <label className="font-semibold">만료 날짜</label>
          <input
            type="date"
            className="w-full border p-3 rounded-lg mt-1"
            value={expire}
            onChange={(e) => setExpire(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
