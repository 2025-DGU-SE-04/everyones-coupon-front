/**
 * Button 컴포넌트 - 디자인 시스템 기반 통일된 버튼
 * 
 * @param {string} variant - 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} fullWidth - 전체 너비 사용
 * @param {boolean} disabled - 비활성화
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus:ring-primary-500 shadow-medium hover:shadow-strong',
    secondary: 'bg-secondary-100 text-secondary-800 hover:bg-secondary-200 active:bg-secondary-300 focus:ring-secondary-500',
    danger: 'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700 focus:ring-danger-500 shadow-medium hover:shadow-strong',
    ghost: 'bg-transparent text-secondary-700 hover:bg-secondary-100 active:bg-secondary-200 focus:ring-secondary-500',
    outline: 'border-2 border-secondary-300 text-secondary-700 hover:bg-secondary-50 active:bg-secondary-100 focus:ring-secondary-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3.5 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

