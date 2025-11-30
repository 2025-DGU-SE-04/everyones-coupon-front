/**
 * Badge 컴포넌트 - 상태 표시용 배지
 * 
 * @param {string} variant - 'primary' | 'success' | 'warning' | 'danger' | 'secondary'
 * @param {string} size - 'sm' | 'md'
 */
export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full';
  
  const variants = {
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-success-100 text-success-700',
    warning: 'bg-warning-100 text-warning-700',
    danger: 'bg-danger-100 text-danger-700',
    secondary: 'bg-secondary-100 text-secondary-700',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };
  
  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}

