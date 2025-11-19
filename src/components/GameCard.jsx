import { useNavigate } from "react-router-dom";

export default function GameCard({ id, name, icon }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/game/${id}`)}
      className="w-full bg-white rounded-xl shadow p-4 flex items-center cursor-pointer hover:bg-gray-50 transition border"
    >
      <img
        src={icon}
        alt={name}
        className="w-14 h-14 rounded-xl object-cover mr-4"
      />

      <div className="text-lg font-semibold">{name}</div>
    </div>
  );
}
