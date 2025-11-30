import { useNavigate } from "react-router-dom";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

export default function GameCard({ id, title, gameImageUrl, official }) {
  const navigate = useNavigate();

  return (
    <Card
      interactive
      onClick={() => navigate(`/game/${id}`)}
      className="mb-4"
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          {gameImageUrl ? (
            <img
              src={gameImageUrl}
              alt={title}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-soft"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <span className="text-2xl">🎮</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg sm:text-xl font-bold text-secondary-900 truncate">
              {title}
            </h3>
            {official && (
              <Badge variant="warning" size="sm">
                오피셜
              </Badge>
            )}
          </div>
          <p className="text-sm text-secondary-500">게임 상세 보기 →</p>
        </div>
      </div>
    </Card>
  );
}
