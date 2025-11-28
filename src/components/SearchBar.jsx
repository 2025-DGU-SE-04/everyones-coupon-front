import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchGame } from "../api/gameApi";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!keyword.trim()) {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const result = await searchGame(keyword);
        const list = result.content ?? result;
        setSuggestions(list);
      } catch (e) {
        console.error("검색 실패", e);
      }
    }, 250);

    return () => clearTimeout(delay);
  }, [keyword]);

  const handleSelect = (id) => {
    navigate(`/game/${id}`);
    setSuggestions([]);
  };

  return (
    <div className="w-full max-w-xl mt-8 relative">
      <input
        type="text"
        placeholder="게임을 검색하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-full shadow
                   focus:outline-none focus:ring-2 focus:ring-blue-500 pl-5"
      />

      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 bg-white border rounded-xl shadow mt-2 overflow-hidden z-50">
          {suggestions.map((item) => (
            <div
              key={item.id}
              className="p-3 hover:bg-gray-100 cursor-pointer text-black"
              onClick={() => handleSelect(item.id)}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
