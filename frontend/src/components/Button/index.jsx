import React from 'react';

const Button = ({ type, variant, className, children }) => {
  const baseStyles = 'h-[70px] w-[200px] rounded-[25px] text-white text-[30px] font-["Alatsi"] font-normal border-none';
  const variantStyles =
    variant === 'primary' ? 'bg-[#643073] hover:bg-[#743084]' : '';

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;