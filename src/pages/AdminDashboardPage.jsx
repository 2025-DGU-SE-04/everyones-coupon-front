import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { getGameList, deleteGame, setGameOfficial, setGameImage } from "../api/gameApi";
import HeaderBanner from "../components/HeaderBanner";

export default function AdminDashboardPage() {
  const { isAuthenticated, logout, loading: authLoading } = useAdminAuth();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    if (isAuthenticated) {
      loadGames();
    }
  }, [isAuthenticated, authLoading, navigate]);

  const loadGames = async () => {
    try {
      setLoading(true);
      const data = await getGameList();
      setGames(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("게임 목록 로드 실패:", err);
      setError("게임 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const handleDeleteGame = async (gameId) => {
    if (!window.confirm("정말 이 게임을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteGame(gameId);
      alert("게임이 삭제되었습니다.");
      loadGames();
    } catch (err) {
      console.error("게임 삭제 실패:", err);
      alert("게임 삭제에 실패했습니다.");
    }
  };

  const handleSetOfficial = async (gameId, currentOfficial) => {
    try {
      await setGameOfficial(gameId, !currentOfficial);
      alert(`게임이 ${!currentOfficial ? "오피셜" : "일반"}으로 변경되었습니다.`);
      loadGames();
    } catch (err) {
      console.error("오피셜 설정 실패:", err);
      alert("오피셜 설정에 실패했습니다.");
    }
  };

  const handleSetImage = async (gameId) => {
    const imageData = prompt("이미지 데이터 URL을 입력하세요:");
    if (!imageData) return;

    try {
      await setGameImage(gameId, imageData);
      alert("이미지가 설정되었습니다.");
      loadGames();
    } catch (err) {
      console.error("이미지 설정 실패:", err);
      alert("이미지 설정에 실패했습니다.");
    }
  };

  if (authLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderBanner />
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">관리자 대시보드</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            로그아웃
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">게임 목록</h2>
            <button
              onClick={loadGames}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              새로고침
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">로딩 중...</div>
          ) : games.length === 0 ? (
            <div className="text-center py-8 text-gray-500">등록된 게임이 없습니다.</div>
          ) : (
            <div className="space-y-4">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div 
                    className="flex items-center gap-4 flex-1 cursor-pointer"
                    onClick={() => navigate(`/admin/game/${game.id}`)}
                  >
                    {game.gameImageUrl && (
                      <img
                        src={game.gameImageUrl}
                        alt={game.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{game.title}</h3>
                        {game.official && (
                          <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
                            오피셜
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">ID: {game.id}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSetOfficial(game.id, game.official)}
                      className={`px-3 py-1 rounded text-sm ${
                        game.official
                          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      } transition`}
                    >
                      {game.official ? "오피셜 해제" : "오피셜 설정"}
                    </button>
                    <button
                      onClick={() => handleSetImage(game.id)}
                      className="px-3 py-1 rounded text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition"
                    >
                      이미지 설정
                    </button>
                    <button
                      onClick={() => handleDeleteGame(game.id)}
                      className="px-3 py-1 rounded text-sm bg-red-100 text-red-800 hover:bg-red-200 transition"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

