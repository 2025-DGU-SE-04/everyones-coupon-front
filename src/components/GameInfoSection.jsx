import Card from "./ui/Card";
import Badge from "./ui/Badge";

export default function GameInfoSection({ game }) {
  return (
    <Card className="mb-6">
      <div className="flex items-start gap-4 mb-6">
        {game.iconUrl && (
          <img
            src={game.iconUrl}
            alt={game.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-medium flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-2">
            {game.name}
          </h1>
        </div>
      </div>

      {game.howToUse && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-lg font-bold text-secondary-900">쿠폰 사용 방법</h3>
          </div>
          <div className="bg-secondary-50 rounded-xl p-4">
            <p className="text-base text-secondary-700 whitespace-pre-line leading-relaxed">
              {game.howToUse}
            </p>
          </div>
        </div>
      )}

      {game.link && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-lg font-bold text-secondary-900">쿠폰 사용 링크</h3>
          </div>
          <a
            href={game.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 break-all"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {game.link}
          </a>
        </div>
      )}
    </Card>
  );
}
