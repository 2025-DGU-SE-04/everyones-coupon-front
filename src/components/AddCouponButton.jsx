import { useNavigate } from "react-router-dom";

export default function AddCouponButton({ gameId }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/game/${gameId}/add-coupon`)}
      className="w-full max-w-xl bg-blue-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition mt-6"
    >
      + 쿠폰 추가하기
    </button>
  );
}
