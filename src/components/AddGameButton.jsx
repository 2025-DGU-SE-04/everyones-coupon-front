import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";

export default function AddGameButton() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 mb-6">
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={() => navigate("/add-game")}
        className="shadow-medium hover:shadow-strong"
      >
        <span className="mr-2">+</span>
        게임 추가하기
      </Button>
    </div>
  );
}
