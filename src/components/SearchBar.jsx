import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ gameList = [] }) {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = gameList
      .filter(g => g.name.includes(value))
      .slice(0, 4);

    setSuggestions(filtered);
  };

  const handleSelect = (id) => {
    navigate(`/game/${id}`);
  };

  return (
    <div className="w-full max-w-xl mt-8 relative">
      <input
        type="text"
        placeholder="게임을 검색하세요"
        value={keyword}
        onChange={handleChange}
        className="w-full border border-gray-300 p-3 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500 pl-5"
      />

      {/* 자동완성 팝업 */}
      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 bg-white border rounded-xl shadow mt-2 overflow-hidden z-10">
          {suggestions.map((item) => (
            <div
              key={item.id}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(item.id)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
