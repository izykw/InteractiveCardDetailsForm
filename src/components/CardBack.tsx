import styled from 'styled-components';
import bgCardBack from '../assets/bg-card-back.png';

const StyledCardBack = styled.div`
	position: relative;
	width: 447px;
	height: 245px;

	background-image: url(${bgCardBack});
	background-size: cover;

	color: #fff;
	font-size: 14px;
	letter-spacing: 2px;

	margin-left: 93px;

	@media (max-width: 1213px) {
		width: 286px;
		height: 156px;
		top: 32px;
		right: 18px;
	}

	& > span {
		position: absolute;
		left: 362px;
		top: 111px;

		@media (max-width: 1213px) {
			left: 229px;
			top: 73px;
			font-size: 10px;
			letter-spacing: 1px;
		}
	}
`;

interface CardBackProps {
	cvc: string;
}

const CardBack = ({ cvc }: CardBackProps) => {
	return (
		<StyledCardBack>
			<span>{cvc || '000'}</span>
		</StyledCardBack>
	);
};

export default CardBack;
