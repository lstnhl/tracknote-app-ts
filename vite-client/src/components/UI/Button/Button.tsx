import React, { FC } from 'react';
import s from './Button.module.scss';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ onClick, children }) => {
  return <button className={s.button} onClick={onClick}>{children}</button>;
};

export default Button;
