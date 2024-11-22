import React, { useRef, useEffect, useCallback, useState } from 'react';
import './styles.css';

const Input = React.forwardRef(({
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

  useEffect(() => {
    const handleTouchMove = () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    };

    if (isFocused) {
      document.addEventListener('touchmove', handleTouchMove);
    }
  }, [isFocused]);

  const handleFocus = useCallback((e) => {
    setIsFocused(true);
    setTimeout(() => {
      if (onFocus) onFocus(e);
    }, 0);
  }, [onFocus]);

  const handleBlur = useCallback((e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  }, [onBlur]);

  const handleChange = useCallback((e) => {
    if (onChange) onChange(e);
  }, [onChange]);

  const inputClassName = [
    'input',
    error ? 'error' : '',
    loading ? 'loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input-wrapper">
      <input
        ref={(node) => {
          inputRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={inputClassName}
        type={type}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
      />
      {error && errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
});

export default Input;
