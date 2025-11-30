import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";

export default function AddCouponButton({ gameId }) {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={() => navigate(`/game/${gameId}/add-coupon`)}
        className="shadow-medium hover:shadow-strong"
      >
        <span className="mr-2">+</span>
        쿠폰 추가하기
      </Button>
    </div>
  );
}
