/**
 * Card 컴포넌트 - 통일된 카드 디자인
 * 
 * @param {boolean} interactive - 클릭 가능한 카드
 * @param {boolean} elevated - 그림자 강도
 */
export default function Card({
  children,
  interactive = false,
  elevated = true,
  className = '',
  ...props
}) {
  const baseStyles = 'bg-white rounded-2xl p-5';
  const interactiveStyles = interactive ? 'cursor-pointer hover:shadow-strong transition-all duration-200 active:scale-[0.98]' : '';
  const shadowStyles = elevated ? 'shadow-soft' : '';
  
  return (
    <div
      className={`${baseStyles} ${interactiveStyles} ${shadowStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

