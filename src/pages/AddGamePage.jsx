import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBanner from "../components/HeaderBanner";
import { createGame } from "../api/gameApi";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Button from "../components/ui/Button";

export default function AddGamePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [couponUsageLink, setCouponUsageLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("게임 이름을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const data = {
        title,
        gameDescription,
        couponUsageLink,
      };

      await createGame(data);
      alert("게임이 등록되었습니다!");
      
      // 입력 초기화
      setTitle("");
      setGameDescription("");
      setCouponUsageLink("");
      
      navigate("/");
    } catch (err) {
      console.error("게임 등록 실패:", err);
      setError(err.response?.data?.message || "게임 등록 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white">
      <HeaderBanner />

      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1 mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            홈으로 돌아가기
          </button>
          <h1 className="text-3xl font-bold text-secondary-900">게임 추가하기</h1>
          <p className="text-sm text-secondary-500 mt-2">새로운 게임 정보를 입력해주세요</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-danger-50 border-2 border-danger-200 text-danger-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <Input
              label="게임 이름"
              placeholder="예: 카피바라 어드벤처"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Textarea
              label="쿠폰 사용 방법"
              placeholder="쿠폰 사용 방법을 입력하세요"
              value={gameDescription}
              onChange={(e) => setGameDescription(e.target.value)}
              className="min-h-[120px]"
            />

            <Input
              label="쿠폰 사용 링크"
              type="url"
              placeholder="예: https://example.com/coupon"
              value={couponUsageLink}
              onChange={(e) => setCouponUsageLink(e.target.value)}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                fullWidth
                onClick={() => navigate("/")}
              >
                취소
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
              >
                {loading ? "등록 중..." : "등록하기"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
