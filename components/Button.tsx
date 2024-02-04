import React from "react";

interface buttonInterFace {
  lable: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean; 
}

const Button: React.FC<buttonInterFace> = ({
  lable,
  onClick,
  disabled,
  fullWidth,
  large,
  outline,
  secondary,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
      disabled:opacity-70 
      disabled:cursor-not-allowed 
      rounded-full 
      font-semibold 
      hover:opacity-80 
      transition border-2
      ${fullWidth ? "w-full" : "w-fit"}
      ${secondary ? "bg-white" : "bg-pink-500"}
      ${secondary ? "text-black" : "text-white"}
      ${secondary ? "border-black" : "border-pink-500"}
      ${large ? "text-xl" : "text-md"}
      ${large ? "px-5" : "px-4"}
      ${large ? "py-3" : "py-2"}      
      ${outline ? "bg-transparent" : ""}
      ${outline ? "border-white" : ""}
      ${outline ? "text-white" : ""}
      `}
    >
      {lable}
    </button>
  );
};

export default Button;
