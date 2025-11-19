import HeaderBanner from "../components/HeaderBanner";
import SearchBar from "../components/SearchBar";
import AddGameButton from "../components/AddGameButton";
import GameList from "../components/GameList";

export default function HomePage() {

  // 페이지 번호에 따라 게임 데이터를 반환하는 함수
  const fetchGames = async (page) => {
    // ⬇ 실제 서버 연동 시 아래 코드만 바꾸면 됨 ⬇

    // 임시 데이터 6개씩 페이징
    const allGames = [
      { id: 1, name: "카피바라 어드벤처", icon: "https://via.placeholder.com/100" },
      { id: 2, name: "카피바라 어드벤처2", icon: "https://via.placeholder.com/100" },
      { id: 3, name: "카피바라 GO!", icon: "https://via.placeholder.com/100" },
      { id: 4, name: "슬라임 키우기", icon: "https://via.placeholder.com/100" },
      { id: 5, name: "모험의 시간", icon: "https://via.placeholder.com/100" },
      { id: 6, name: "힐링 숲", icon: "https://via.placeholder.com/100" },
      { id: 7, name: "버섯의 군단", icon: "https://via.placeholder.com/100" },
      { id: 8, name: "카오스 던전", icon: "https://via.placeholder.com/100" },
      { id: 9, name: "천상계 RPG", icon: "https://via.placeholder.com/100" },
      { id: 10, name: "드래곤 스토리", icon: "https://via.placeholder.com/100" },
      { id: 11, name: "몽환의 섬", icon: "https://via.placeholder.com/100" },
      { id: 12, name: "쿼카 탐험대", icon: "https://via.placeholder.com/100" },
    ];

    const itemsPerPage = 6;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return allGames.slice(start, end);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      <HeaderBanner />

      <SearchBar />

      <AddGameButton />

      <GameList fetchGames={fetchGames} />
    </div>
  );
}
