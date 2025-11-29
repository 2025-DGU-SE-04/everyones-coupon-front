import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import AddGamePage from "./pages/AddGamePage";
import AddCouponPage from "./pages/AddCouponPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* ✅ gameId로 통일 */}
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/game/:gameId/add-coupon" element={<AddCouponPage />} />

        <Route path="/add-game" element={<AddGamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
