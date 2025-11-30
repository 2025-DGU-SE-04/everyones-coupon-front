import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchGame } from "../api/gameApi";
import Badge from "./ui/Badge";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!keyword.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    const delay = setTimeout(async () => {
      try {
        const result = await searchGame(keyword);
        const list = result.content ?? result;
        setSuggestions(list);
      } catch (e) {
        console.error("검색 실패", e);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [keyword]);

  const handleSelect = (id) => {
    navigate(`/game/${id}`);
    setSuggestions([]);
    setKeyword("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-secondary-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="게임을 검색하세요..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full pl-12 pr-4 py-4 text-base bg-white border-2 border-secondary-200 rounded-2xl shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder:text-secondary-400"
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-600 border-t-transparent"></div>
          </div>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white border-2 border-secondary-200 rounded-2xl shadow-strong overflow-hidden z-50 max-h-96 overflow-y-auto">
          {suggestions.map((item) => (
            <div
              key={item.id}
              className="px-4 py-3 hover:bg-secondary-50 cursor-pointer transition-colors duration-150 border-b border-secondary-100 last:border-b-0"
              onClick={() => handleSelect(item.id)}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {item.gameImageUrl && (
                    <img
                      src={item.gameImageUrl}
                      alt={item.title}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-base font-medium text-secondary-900 truncate">
                      {item.title}
                    </span>
                    {item.official && (
                      <Badge variant="warning" size="sm" className="flex-shrink-0">
                        오피셜
                      </Badge>
                    )}
                  </div>
                </div>
                {item.viewCount !== undefined && (
                  <div className="flex items-center gap-1 text-sm text-secondary-500 flex-shrink-0">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span className="font-medium">{item.viewCount.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
