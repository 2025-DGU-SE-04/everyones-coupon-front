import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAdminStore } from "../store/adminStore";

export default function AdminLoginPage() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const setAdmin = useAdminStore((state) => state.setAdmin);

  const handleLogin = async () => {
    if (!token.trim()) {
      alert("관리자 토큰을 입력하세요.");
      return;
    }

    try {
      await axios.post(
        "https://everyones-coupon-webapp.azurewebsites.net/api/admin/login",
        { token },
        {
          withCredentials: true, // ✅ 쿠키 저장 필수
        }
      );

      setAdmin(true); // ✅ 전역 관리자 상태 ON
      alert("관리자 로그인 성공");
      navigate("/"); // ✅ 홈으로 이동
    } catch (e) {
      console.error(e);
      alert("관리자 로그인 실패 (토큰 확인)");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h2>

        <input
          type="text"
          placeholder="관리자 토큰 입력"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
