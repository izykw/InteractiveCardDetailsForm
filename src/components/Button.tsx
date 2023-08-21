import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	background-color: #21092f;
	padding: 17px;
	width: 380px;
	border-radius: 7px;
	border: 0;

	font-size: 16px;
	letter-spacing: 2px;
	color: #fff;

	&:active {
		box-shadow: inset 0px 0px 10px 2px #8e8593;
		transform: scale(0.97);
	}

	@media (max-width: 1213px) {
		width: 328px;
	}
`;

interface ButtonProps {
	children: string;
	type: 'submit' | 'button';
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, type, onClick }: ButtonProps) => {
	return (
		<StyledButton type={type} onClick={onClick}>
			{children}
		</StyledButton>
	);
};

export default Button;
