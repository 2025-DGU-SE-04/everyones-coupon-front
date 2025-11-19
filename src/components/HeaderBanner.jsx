import { useNavigate } from "react-router-dom";

export default function HeaderBanner() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full py-6 text-center text-4xl font-extrabold text-blue-600 cursor-pointer shadow bg-white"
      onClick={() => navigate("/")}
    >
      모두의 쿠폰
    </div>
  );
}
