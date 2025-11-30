import HeaderBanner from "../components/HeaderBanner";
import SearchBar from "../components/SearchBar";
import AddGameButton from "../components/AddGameButton";
import GameList from "../components/GameList";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white">
      <HeaderBanner />
      
      <div className="w-full max-w-7xl mx-auto">
        <div className="py-6 sm:py-8">
          <SearchBar />
        </div>

        <div className="pb-6">
          <AddGameButton />
        </div>

        <GameList />
      </div>
    </div>
  );
}
