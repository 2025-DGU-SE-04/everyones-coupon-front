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
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/add-game" element={<AddGamePage />} />
        <Route path="/add-coupon/:gameId" element={<AddCouponPage />} />
        <Route path="/game/:id/add-coupon" element={<AddCouponPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
