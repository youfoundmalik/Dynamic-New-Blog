import React, { forwardRef, InputHTMLAttributes } from "react";

const CustomInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const { className = "", ...r } = props;
  return (
    <input
      ref={ref}
      className={`w-fit px-2.5 min-w-[152px] h-[42px] bg-transparent border border-gray-200 rounded hover:bg-gray-50 !outline-none focus-visible:bg-gray-50 focus-visible:border-gray-300 ${className}`}
      {...r}
    />
  );
});

CustomInput.displayName = "CustomInput";

export default CustomInput;
