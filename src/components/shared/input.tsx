import React, { forwardRef, InputHTMLAttributes } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
  const { className = "", id, "aria-label": ariaLabel, "aria-describedby": ariaDescribedby, errorMessage, ...rest } = props;

  // Memoize the ID generation to prevent unnecessary recalculations
  const inputId = React.useMemo(() => id || `input-${Math.random().toString(36).substr(2, 9)}`, [id]);
  const errorId = `${inputId}-error`;

  // Extract styles to improve readability
  const inputClassName = React.useMemo(() => {
    const baseStyles =
      "w-fit px-2.5 min-w-[152px] h-[42px] bg-transparent border border-gray-200 rounded hover:bg-gray-50 !outline-none focus-visible:bg-gray-50 focus-visible:border-gray-300";
    const errorStyles = errorMessage ? "border-red-500" : "";
    return `${baseStyles} ${errorStyles} ${className}`.trim();
  }, [errorMessage, className]);

  return (
    <div className='input-wrapper'>
      <input
        ref={ref}
        id={inputId}
        aria-label={ariaLabel}
        aria-describedby={errorMessage ? errorId : ariaDescribedby}
        aria-invalid={!!errorMessage}
        className={inputClassName}
        {...rest}
      />
      {errorMessage && (
        <div id={errorId} className='text-red-500 text-sm mt-1' role='alert'>
          {errorMessage}
        </div>
      )}
    </div>
  );
});

CustomInput.displayName = "CustomInput";

export default CustomInput;
