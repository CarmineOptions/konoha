import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`px-3 py-2 bg-black text-sm rounded-md text-[#FEFBF3] disabled:opacity-50 ${props.className}`}
    >
      {children}
    </button>
  );
};
