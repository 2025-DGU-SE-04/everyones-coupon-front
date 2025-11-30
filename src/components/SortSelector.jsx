import Button from "./ui/Button";

/**
 * SortSelector 컴포넌트 - 쿠폰 정렬 옵션 선택
 * 
 * @param {string} currentSort - 현재 정렬 옵션 ('createdAt' | 'score')
 * @param {function} onSortChange - 정렬 변경 핸들러
 * @param {boolean} disabled - 비활성화 상태
 */
export default function SortSelector({ currentSort, onSortChange, disabled = false }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-secondary-600">정렬:</span>
      <div className="flex gap-2">
        <Button
          variant={currentSort === "createdAt" ? "primary" : "outline"}
          size="sm"
          onClick={() => onSortChange("createdAt")}
          disabled={disabled}
        >
          최신순
        </Button>
        <Button
          variant={currentSort === "score" ? "primary" : "outline"}
          size="sm"
          onClick={() => onSortChange("score")}
          disabled={disabled}
        >
          유효성순
        </Button>
      </div>
    </div>
  );
}

