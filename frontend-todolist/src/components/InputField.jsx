import React from 'react';

const InputField = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  icon: Icon,
  error,
  disabled = false,
  showToggle,
  showValue,
  onToggle,
  maxLength
}) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-white/40" />
        </div>
      )}

      <input
        type={showToggle ? (showValue ? 'text' : 'password') : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={`w-full py-4 px-4 ${Icon ? 'pl-10' : 'pl-4'} ${
          showToggle ? 'pr-12' : 'pr-4'
        } bg-white/20 border rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
          error ? 'border-red-400 focus:ring-red-400' : 'border-white/30 focus:ring-red-400'
        }`}
      />

      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/60 transition-colors"
          tabIndex={-1}
        >
          {showValue ? <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-9 0-1.04.186-2.045.525-2.988M6.18 6.18A9 9 0 0112 5c5 0 9 4 9 9a9 9 0 01-.585 2.925M3 3l18 18" />
          </svg> : 
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>}
        </button>
      )}

      {error && <p className="text-red-300 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
