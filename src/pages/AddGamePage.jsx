import { useState } from "react";
import HeaderBanner from "../components/HeaderBanner";

export default function AddGamePage() {
  const [name, setName] = useState("");
  const [howToUse, setHowToUse] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("게임 이름을 입력하세요.");
      return;
    }

    const data = {
      name,
      howToUse,
      link,
    };

    console.log("게임 등록됨:", data);
    alert("게임 등록이 완료되었습니다!");

    // 입력 초기화
    setName("");
    setHowToUse("");
    setLink("");
  };

  return (
    <div className="w-full flex flex-col items-center pb-20">
      <HeaderBanner />

      <h2 className="text-2xl font-bold mt-6 mb-4">게임 추가하기</h2>

      <div className="w-full max-w-xl bg-white shadow rounded-xl p-6 flex flex-col gap-4">

        <div>
          <label className="font-semibold">게임 이름</label>
          <input
            type="text"
            className="w-full border p-3 rounded-lg mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 카피바라 어드벤처"
          />
        </div>

        <div>
          <label className="font-semibold">쿠폰 사용 방법</label>
          <textarea
            className="w-full border p-3 rounded-lg mt-1 h-32"
            value={howToUse}
            onChange={(e) => setHowToUse(e.target.value)}
            placeholder="쿠폰 사용 방법을 입력하세요"
          />
        </div>

        <div>
          <label className="font-semibold">쿠폰 사용 링크</label>
          <input
            type="text"
            className="w-full border p-3 rounded-lg mt-1"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="예: https://example.com/coupon"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
