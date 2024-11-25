import React, { useRef, useEffect, useState, forwardRef, memo, useImperativeHandle } from 'react';
import './styles.css';

export const Input = memo(forwardRef(({
  onFocus,
  onBlur,
  onChange,
  value,
  type = 'text',
  error,
  loading,
  disabled,
  placeholder,
  className,
  errorMessage,
  ...props
}, ref) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useImperativeHandle(ref, () => inputRef.current, []);

  useEffect(() => {
    const handleTouchMove = () => {
      if (inputRef.current && isFocused) {
        inputRef.current.blur();
      }
    };

     document.addEventListener('touchmove', handleTouchMove);

     return ()=> {
       document.removeEventListener('touchmove', handleTouchMove);
     }
  }, [isFocused]);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  }

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleChange = (e) => {
    if (onChange) onChange(e);
  };

  const inputClassNames = [
    'input',
    error ? 'error' : '',
    loading ? 'loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input-wrapper">
      <input
        data-testid="input"
        ref={inputRef}
        className={inputClassNames}
        type={type}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        disabled={disabled || loading}
        placeholder={placeholder}
        {...props}
      />
      {loading && <div data-testid="loader" className="loader" />}
      {error && errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
}));
