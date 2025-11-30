/**
 * Textarea 컴포넌트 - 통일된 텍스트 영역
 */
export default function Textarea({
  label,
  error,
  className = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-secondary-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-3 rounded-xl border-2
          text-base text-secondary-900
          placeholder:text-secondary-400
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          disabled:bg-secondary-50 disabled:cursor-not-allowed
          resize-none
          transition-all duration-200
          ${error ? 'border-danger-500 focus:ring-danger-500' : 'border-secondary-200'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-danger-600">{error}</p>
      )}
    </div>
  );
}

