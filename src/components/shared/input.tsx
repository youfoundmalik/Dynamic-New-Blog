import React, { forwardRef, InputHTMLAttributes } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
  const { className = "", id, "aria-label": ariaLabel, "aria-describedby": ariaDescribedby, errorMessage, ...r } = props;

  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${inputId}-error`;

  return (
    <div className='input-wrapper'>
      <input
        ref={ref}
        id={inputId}
        aria-label={ariaLabel}
        aria-describedby={errorMessage ? errorId : ariaDescribedby}
        aria-invalid={!!errorMessage}
        className={`w-fit px-2.5 min-w-[152px] h-[42px] bg-transparent border border-gray-200 rounded hover:bg-gray-50 !outline-none focus-visible:bg-gray-50 focus-visible:border-gray-300 ${
          errorMessage ? "border-red-500" : ""
        } ${className}`}
        {...r}
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
