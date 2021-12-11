import { FC } from 'react';
import './Button.scss';

type ButtonProps = {
  name: string
  onClick: () => void;
  type: 'submit' | 'reset' | 'button';
}

const Button:FC<ButtonProps> = ({ name, onClick, type }) => (
  <div className="button-wrapper">
    <button
      className="button"
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  </div>
);

export default Button;
