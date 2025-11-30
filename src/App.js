import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import AddGamePage from "./pages/AddGamePage";
import AddCouponPage from "./pages/AddCouponPage";
import AdminLoginPage from "./pages/AdminLoginPage"; // ✅ 추가

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/add-game" element={<AddGamePage />} />
        <Route path="/game/:gameId/add-coupon" element={<AddCouponPage />} />

        {/* ✅ 관리자 로그인 */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
