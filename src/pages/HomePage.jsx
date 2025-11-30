import { useNavigate } from "react-router-dom";
import HeaderBanner from "../components/HeaderBanner";
import GameList from "../components/GameList";
import AddGameButton from "../components/AddGameButton";
import SearchBar from "../components/SearchBar";
import { useAdminStore } from "../store/adminStore";
import { adminLogout } from "../api/gameApi";

export default function HomePage() {
  const navigate = useNavigate();
  const { isAdmin, setAdmin } = useAdminStore();

  // ✅ 로그아웃 처리
  const handleLogout = async () => {
    try {
      await adminLogout();      // ✅ 서버 쿠키 제거
      setAdmin(false);          // ✅ 프론트 상태 OFF
      alert("관리자 로그아웃 완료");
      navigate("/");
    } catch (e) {
      console.error(e);
      alert("로그아웃 실패");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderBanner />

      {/* ✅ 전체 정렬 컨테이너 */}
      <div className="max-w-6xl mx-auto px-4">

        {/* ✅ 우측 상단 버튼 (로그인 / 로그아웃 토글) */}
        <div className="mt-6 flex justify-end">
          {isAdmin ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={() => navigate("/admin/login")}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              관리자 로그인
            </button>
          )}
        </div>

        {/* ✅ 게임 추가 버튼 */}
        <div className="mt-8 flex justify-center">
          <AddGameButton />
        </div>

        {/* ✅ 검색창 */}
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-xl">
            <SearchBar />
          </div>
        </div>

        {/* ✅ 게임 리스트 */}
        <div className="mt-10">
          <GameList />
        </div>

      </div>
    </div>
  );
}
