export default function GameInfoSection({ game }) {
    return (
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-5 mt-4">
        <h2 className="text-2xl font-bold mb-3">{game.name}</h2>
  
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-1">쿠폰 사용 방법</h3>
          <p className="text-gray-700 whitespace-pre-line">{game.howToUse}</p>
        </div>
  
        <div>
          <h3 className="font-semibold text-lg mb-1">쿠폰 사용 링크</h3>
          <a
            href={game.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {game.link}
          </a>
        </div>
      </div>
    );
  }
  