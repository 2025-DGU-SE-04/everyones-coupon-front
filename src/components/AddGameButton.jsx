import { useNavigate } from "react-router-dom";

export default function AddGameButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/add-game")}
      className="mt-6 w-full max-w-xl bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold shadow hover:bg-blue-700 transition"
    >
      + 게임 추가하기
    </button>
  );
}
