import { useState } from "react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { voteCoupon } from "../api/gameApi";

export default function CouponItem({ coupon, onVoteUpdate }) {
  const [validCount, setValidCount] = useState(coupon.validCount || coupon.like || 0);
  const [invalidCount, setInvalidCount] = useState(coupon.invalidCount || coupon.dislike || 0);
  const [userVote, setUserVote] = useState(null); // 'like' | 'dislike' | null
  const [voting, setVoting] = useState(false); // 투표 중 로딩 상태

  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    alert("쿠폰 코드가 복사되었습니다!");
  };

  const handleVote = async (voteType) => {
    if (voting) return; // 이미 투표 중이면 무시

    const isWorking = voteType === "like"; // like = true, dislike = false
    const previousVote = userVote;
    const previousValidCount = validCount;
    const previousInvalidCount = invalidCount;

    // 낙관적 업데이트 (Optimistic Update)
    // 이미 같은 투표를 했으면 취소
    if (userVote === voteType) {
      if (voteType === "like") {
        setValidCount((prev) => Math.max(0, prev - 1));
      } else {
        setInvalidCount((prev) => Math.max(0, prev - 1));
      }
      setUserVote(null);
    } else {
      // 이전 투표가 있었다면 취소하고 새로 투표
      if (userVote === "like") {
        setValidCount((prev) => Math.max(0, prev - 1));
      } else if (userVote === "dislike") {
        setInvalidCount((prev) => Math.max(0, prev - 1));
      }

      // 새 투표 반영
      if (voteType === "like") {
        setValidCount((prev) => prev + 1);
      } else {
        setInvalidCount((prev) => prev + 1);
      }

      setUserVote(voteType);
    }

    // API 호출
    try {
      setVoting(true);
      const response = await voteCoupon(coupon.id, isWorking);
      
      // API 응답에서 업데이트된 실제 카운트로 동기화
      // 서버에서 중복 투표를 막았을 수 있으므로 서버 응답을 우선시
      if (response.validCount !== undefined) {
        setValidCount(response.validCount);
      } else if (response.validCount === 0) {
        setValidCount(0);
      }
      
      if (response.invalidCount !== undefined) {
        setInvalidCount(response.invalidCount);
      } else if (response.invalidCount === 0) {
        setInvalidCount(0);
      }

      // 서버 응답에 투표 상태 정보가 있다면 동기화
      if (response.userVote !== undefined) {
        setUserVote(response.userVote);
      } else if (response.voted === false) {
        // 중복 투표로 인해 거부된 경우
        setUserVote(null);
      }

      // 부모 컴포넌트에 업데이트 알림 (쿠폰 목록 재조회)
      if (onVoteUpdate) {
        onVoteUpdate();
      }
    } catch (error) {
      console.error("피드백 제출 실패:", error);
      
      // 에러 발생 시 이전 상태로 롤백
      setValidCount(previousValidCount);
      setInvalidCount(previousInvalidCount);
      setUserVote(previousVote);
      
      // 중복 투표 에러인 경우 특별 처리
      if (error.response?.status === 400 || error.response?.status === 409) {
        alert("이미 투표하셨거나 중복 투표는 불가능합니다.");
        // 서버에서 거부된 경우, 쿠폰 목록을 다시 불러와서 동기화
        if (onVoteUpdate) {
          onVoteUpdate();
        }
      } else {
        alert("피드백 제출에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setVoting(false);
    }
  };

  const expirationDate = coupon.expirationDate || coupon.expire;

  return (
    <Card className="mb-4">
      {/* 쿠폰 정보 영역 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-secondary-900 break-all">{coupon.code}</h3>
            <button
              onClick={handleCopyCode}
              className="flex-shrink-0 p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              title="쿠폰 코드 복사"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          <p className="text-base text-secondary-700 mb-2">{coupon.reward}</p>
          {expirationDate && (
            <p className="text-sm text-secondary-500">
              만료일: {expirationDate}
            </p>
          )}
        </div>
      </div>

      {/* 피드백 버튼 */}
      <div className="mt-4 pt-4 border-t border-secondary-200">
        <div className="flex items-center gap-3">
          <Button
            variant={userVote === "like" ? "primary" : "outline"}
            size="sm"
            onClick={() => handleVote("like")}
            disabled={voting}
            className="flex items-center gap-2 flex-1 sm:flex-initial"
          >
            <span className="text-lg">👍</span>
            <span className="font-semibold">유효함</span>
            <span className="text-xs opacity-75 ml-1">({validCount})</span>
          </Button>
          <Button
            variant={userVote === "dislike" ? "danger" : "outline"}
            size="sm"
            onClick={() => handleVote("dislike")}
            disabled={voting}
            className="flex items-center gap-2 flex-1 sm:flex-initial"
          >
            <span className="text-lg">👎</span>
            <span className="font-semibold">무효함</span>
            <span className="text-xs opacity-75 ml-1">({invalidCount})</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
