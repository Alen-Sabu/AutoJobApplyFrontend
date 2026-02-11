import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
}) => {
  const base = "px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none";
  const variants = {
    primary: "bg-primary text-darkmode hover:bg-transparent hover:border hover:border-primary hover:text-primary",
    secondary: "bg-transparent border border-primary text-primary hover:bg-primary hover:text-darkmode",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
