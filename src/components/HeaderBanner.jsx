import { useNavigate } from "react-router-dom";

export default function HeaderBanner() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white border-b border-secondary-200 sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          onClick={() => navigate("/")}
          className="flex items-center justify-center h-16 sm:h-20 cursor-pointer group"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent group-hover:from-primary-700 group-hover:to-primary-500 transition-all duration-200">
            모두의 쿠폰
          </h1>
        </div>
      </div>
    </header>
  );
}
