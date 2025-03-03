import { forwardRef, InputHTMLAttributes, useMemo } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
  const { className = "", id = "", "aria-label": ariaLabel, "aria-describedby": ariaDescribedby, errorMessage, ...rest } = props;

  // Memoize the ID generation to prevent unnecessary recalculations
  const errorId = `${id}-error`;

  // Extract styles to improve readability
  const inputClassName = useMemo(() => {
    const baseStyles =
      "w-fit !px-2.5 min-w-[152px] h-[42px] bg-transparent !border !border-gray-200 rounded hover:bg-gray-50 !outline-none focus-visible:bg-gray-50 focus-visible:!border-gray-300";
    const errorStyles = errorMessage ? "border-red-500" : "";
    return `${baseStyles} ${errorStyles} ${className}`.trim();
  }, [errorMessage, className]);

  return (
    <div className='input-wrapper !flex-grow'>
      <input
        ref={ref}
        id={id}
        aria-label={ariaLabel}
        aria-describedby={errorMessage ? errorId : ariaDescribedby}
        aria-invalid={!!errorMessage}
        className={inputClassName}
        {...rest}
      />
      {errorMessage && (
        <div id={errorId} className='text-red-500 text-sm mt-1'>
          {errorMessage}
        </div>
      )}
    </div>
  );
});

CustomInput.displayName = "CustomInput";

export default CustomInput;
