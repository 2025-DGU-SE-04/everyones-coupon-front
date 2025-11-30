import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import AddGamePage from "./pages/AddGamePage";
import AddCouponPage from "./pages/AddCouponPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminGamePage from "./pages/AdminGamePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* ✅ gameId로 통일 */}
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/game/:gameId/add-coupon" element={<AddCouponPage />} />

        <Route path="/add-game" element={<AddGamePage />} />

        {/* 관리자 라우트 */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/game/:gameId" element={<AdminGamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
