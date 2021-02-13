import React from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
  onClick(ev: React.MouseEvent<HTMLButtonElement>): void;
  children?: React.ReactNode | string;
  id?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, id }: ButtonProps) => {
  return (
    <StyledButton id={id} onClick={onClick}>{children || 'Button'}</StyledButton>
  );
};

const StyledButton = styled.button`
  margin-right: 10px;
  text-decoration: underline;
  font-weight: 700;
  color: white;
`;

export default Button;
