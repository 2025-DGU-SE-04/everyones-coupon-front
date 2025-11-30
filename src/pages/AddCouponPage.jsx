import { useParams, useNavigate } from "react-router-dom";
import { addCoupon } from "../api/gameApi";
import { useState } from "react";
import HeaderBanner from "../components/HeaderBanner";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function AddCouponPage() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [reward, setReward] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("쿠폰 번호를 입력해주세요.");
      return;
    }

    if (!reward.trim()) {
      setError("쿠폰 보상을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const formattedDate = expirationDate.replaceAll("-", ".");
      const payload = {
        code,
        reward,
        expireDate: formattedDate,
      };

      await addCoupon(gameId, payload);
      alert("쿠폰이 등록되었습니다!");
      navigate(`/game/${gameId}`);
    } catch (err) {
      console.error("쿠폰 등록 실패:", err);
      setError(err.response?.data?.message || "쿠폰 등록 중 오류가 발생했습니다.");
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
            onClick={() => navigate(`/game/${gameId}`)}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1 mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            게임 상세로 돌아가기
          </button>
          <h1 className="text-3xl font-bold text-secondary-900">쿠폰 추가하기</h1>
          <p className="text-sm text-secondary-500 mt-2">새로운 쿠폰 정보를 입력해주세요</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-danger-50 border-2 border-danger-200 text-danger-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <Input
              label="쿠폰 번호"
              placeholder="예: CAPY500"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />

            <Input
              label="쿠폰 보상"
              placeholder="예: 루비 500개"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              required
            />

            <Input
              label="만료 날짜"
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                fullWidth
                onClick={() => navigate(`/game/${gameId}`)}
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
