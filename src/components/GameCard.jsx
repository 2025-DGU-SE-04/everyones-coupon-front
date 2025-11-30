import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminStore } from "../store/adminStore";
import { deleteGame, getGameDetail, setOfficialGame } from "../api/gameApi";

const GameCard = ({ game }) => {
  const { isAdmin } = useAdminStore();

  // ✅ 이 카드가 알고 있는 공식 여부 (초기값은 리스트에서 받은 값)
  const [isOfficial, setIsOfficial] = useState(game.official === true);

  // ✅ 마운트될 때 한 번 더 상세 조회해서 official 최신값 동기화
  useEffect(() => {
    const fetchOfficial = async () => {
      try {
        const detail = await getGameDetail(game.id);
        setIsOfficial(detail.official === true);
      } catch (e) {
        console.error("공식 여부 조회 실패:", e);
      }
    };

    fetchOfficial();
  }, [game.id]);

  const handleDelete = async () => {
    if (!window.confirm("정말로 게임을 삭제하시겠습니까?")) return;

    try {
      await deleteGame(game.id);
      alert("삭제되었습니다.");
      window.location.reload();
    } catch (err) {
      alert("삭제 실패");
    }
  };

  const handleOfficial = async () => {
    if (!window.confirm("이 게임을 OFFICIAL로 지정하시겠습니까?")) return;

    try {
      await setOfficialGame(game.id);
      alert("OFFICIAL로 지정되었습니다.");
      setIsOfficial(true);          // ✅ 로컬 상태 즉시 반영
    } catch (e) {
      console.error(e);
      alert("OFFICIAL 지정 실패");
    }
  };

  return (
    <div className="game-card relative">
      {/* ✅ 누구에게나 보이는 OFFICIAL 마크 */}
      {isOfficial && (
        <div className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow">
          OFFICIAL
        </div>
      )}

      <Link to={`/game/${game.id}`}>
        <div className="game-image-wrapper">
          <img
            src={game.gameImageUrl || "/no-image.png"}
            alt={game.title}
            className="game-image"
          />
        </div>
        <div className="game-info">
          <h3 className="game-title">{game.title}</h3>
          <p className="game-desc">{game.gameDescription}</p>
        </div>
      </Link>

      {/* ✅ 관리자만 보이는 OFFICIAL 지정 버튼 (이미 official이면 숨김) */}
      {isAdmin && !isOfficial && (
        <button
          className="absolute bottom-3 right-3 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full hover:bg-yellow-500"
          onClick={handleOfficial}
        >
          OFFICIAL 지정
        </button>
      )}

      {/* ✅ 관리자만 보이는 삭제 버튼 */}
      {isAdmin && (
        <button
          className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full hover:bg-red-600 delete-btn"
          onClick={handleDelete}
        >
          삭제
        </button>
      )}
    </div>
  );
};

export default GameCard;
