import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { getGameListAll, deleteGame, setGameOfficial, setGameImage } from "../api/gameApi";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Input from "../components/ui/Input";

export default function AdminDashboardPage() {
  const { isAuthenticated, logout, loading: authLoading } = useAdminAuth();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageModal, setImageModal] = useState({ open: false, gameId: null, imageData: "", preview: null });

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
      setError("");
      const data = await getGameListAll();
      setGames(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("게임 목록 로드 실패:", err);
      setError("게임 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      await logout();
      navigate("/admin/login");
    }
  };

  const handleDeleteGame = async (gameId, gameTitle) => {
    if (!window.confirm(`"${gameTitle}" 게임을 정말 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
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
      loadGames();
    } catch (err) {
      console.error("오피셜 설정 실패:", err);
      alert("오피셜 설정에 실패했습니다.");
    }
  };

  const handleOpenImageModal = (gameId) => {
    setImageModal({ open: true, gameId, imageData: "", preview: null });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 파일 크기 제한 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    // FileReader로 base64 인코딩
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result; // data:image/jpeg;base64,/9j/4AAQ...
      setImageModal({
        ...imageModal,
        imageData: base64String,
        preview: base64String
      });
    };
    reader.onerror = () => {
      alert("파일 읽기에 실패했습니다.");
    };
    reader.readAsDataURL(file);
  };

  const handleSetImage = async () => {
    if (!imageModal.imageData.trim()) {
      alert("이미지를 선택해주세요.");
      return;
    }

    try {
      await setGameImage(imageModal.gameId, imageModal.imageData);
      alert("이미지가 설정되었습니다.");
      setImageModal({ open: false, gameId: null, imageData: "", preview: null });
      loadGames();
    } catch (err) {
      console.error("이미지 설정 실패:", err);
      alert("이미지 설정에 실패했습니다.");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white">
      <div className="bg-white border-b border-secondary-200 sticky top-0 z-50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-secondary-900">관리자 대시보드</h1>
            <Button variant="danger" size="sm" onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-danger-50 border-2 border-danger-200 text-danger-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-1">게임 관리</h2>
              <p className="text-sm text-secondary-500">총 {games.length}개의 게임</p>
            </div>
            <Button variant="primary" size="md" onClick={loadGames} disabled={loading}>
              {loading ? "로딩 중..." : "새로고침"}
            </Button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-600 border-t-transparent mb-4"></div>
              <p className="text-secondary-500">로딩 중...</p>
            </div>
          ) : games.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-secondary-500 text-base">등록된 게임이 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {games.map((game) => (
                <Card key={game.id} interactive className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div
                      className="flex items-center gap-4 flex-1 cursor-pointer min-w-0"
                      onClick={() => navigate(`/admin/game/${game.id}`)}
                    >
                      {game.gameImageUrl ? (
                        <img
                          src={game.gameImageUrl}
                          alt={game.title}
                          className="w-16 h-16 rounded-xl object-cover shadow-soft flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">🎮</span>
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-secondary-900 truncate">{game.title}</h3>
                          {game.official && (
                            <Badge variant="warning" size="sm">오피셜</Badge>
                          )}
                        </div>
                        <p className="text-sm text-secondary-500">ID: {game.id}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 flex-shrink-0">
                      <Button
                        variant={game.official ? "secondary" : "outline"}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetOfficial(game.id, game.official);
                        }}
                      >
                        {game.official ? "오피셜 해제" : "오피셜 설정"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenImageModal(game.id);
                        }}
                      >
                        이미지
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteGame(game.id, game.title);
                        }}
                      >
                        삭제
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* 이미지 설정 모달 */}
      {imageModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <h3 className="text-xl font-bold text-secondary-900 mb-4">이미지 업로드</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-secondary-700 mb-2">
                이미지 파일 선택
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full text-sm text-secondary-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
              />
              <p className="text-xs text-secondary-500 mt-1">최대 5MB, 이미지 파일만 가능</p>
            </div>

            {imageModal.preview && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-secondary-700 mb-2">
                  미리보기
                </label>
                <img
                  src={imageModal.preview}
                  alt="미리보기"
                  className="w-full h-48 object-cover rounded-xl border-2 border-secondary-200"
                />
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={() => setImageModal({ open: false, gameId: null, imageData: "", preview: null })}
              >
                취소
              </Button>
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={handleSetImage}
                disabled={!imageModal.imageData}
              >
                설정
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
