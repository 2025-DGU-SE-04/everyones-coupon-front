export default function TestTailwind() {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-6 bg-gray-100">
        <div className="text-5xl font-extrabold text-blue-600">
          Tailwind OK!
        </div>
  
        <button className="px-6 py-3 bg-green-500 text-white text-xl rounded-xl shadow-lg hover:bg-green-600 transition">
          버튼 스타일 테스트
        </button>
  
        <div className="p-6 bg-white rounded-2xl shadow-lg text-lg">
          카드 컴포넌트 스타일 테스트
        </div>
      </div>
    );
  }
  