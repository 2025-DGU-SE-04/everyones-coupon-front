import Button from "./ui/Button";

/**
 * SortSelector 컴포넌트 - 쿠폰 정렬 옵션 선택
 * 
 * @param {string} currentSort - 현재 정렬 옵션 ('createdAt' | 'score')
 * @param {function} onSortChange - 정렬 변경 핸들러
 * @param {boolean} disabled - 비활성화 상태
 */
export default function SortSelector({ currentSort, onSortChange, disabled = false, options = null }) {
  // 기본 옵션 (기존 컴포넌트의 호환성 유지)
  const defaultOptions = [
    { value: "createdAt", label: "최신순" },
    { value: "score", label: "유효성순" },
  ];

  const opts = Array.isArray(options) && options.length > 0 ? options : defaultOptions;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-secondary-600">정렬:</span>
      <div className="flex gap-2">
        {opts.map((opt) => (
          <Button
            key={opt.value}
            variant={currentSort === opt.value ? "primary" : "outline"}
            size="sm"
            onClick={() => onSortChange(opt.value)}
            disabled={disabled}
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

