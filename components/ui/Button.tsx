import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  isSubmit?: boolean;
  isUnstyled?: boolean;
};

export const buttonClasses =
  'rounded-[5px] bg-primary p-4 text-white hover:opacity-hover';

const Button: React.FC<ButtonProps> = ({
  children,
  isSubmit = false,
  isUnstyled = false,
  ...props
}) => (
  <button
    {...props}
    type={isSubmit ? 'submit' : 'button'}
    className={clsx(
      props.className,
      !isUnstyled && buttonClasses,
      props.disabled && 'cursor-not-allowed opacity-50'
    )}
  >
    {children}
  </button>
);

export default Button;
