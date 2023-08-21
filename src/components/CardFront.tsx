import styled from 'styled-components';
import bgCardFront from '../assets/bg-card-front.png';
import { ReactComponent as Logo } from '../assets/card-logo.svg';
import { CardDetailsProps } from '../services/types';
import { valueToCardFormat } from '../services/services';

const StyledCardFront = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	background-image: url(${bgCardFront});
	background-size: cover;
	color: #fff;

	width: 447px;
	height: 245px;
	padding: 29px 31px;

	@media (max-width: 1213px) {
		position: relative;
		bottom: 68px;
		left: 18px;

		width: 286px;
		height: 156px;
		padding: 16px 20px;

		z-index: 1;
	}
`;

const CardLogo = styled(Logo)`
	margin-bottom: 38px;

	@media (max-width: 1213px) {
		scale: 0.65;
		margin-left: -15px;
		margin-top: -7px;
		margin-bottom: 14px;
	}
`;

const CardBody = styled.div`
	font-size: 27px;
	letter-spacing: 4px;

	@media (max-width: 1213px) {
		font-size: 18px;
		letter-spacing: 2px;
	}
`;

const CardFooter = styled.div`
	display: flex;
	justify-content: space-between;

	font-size: 14px;
	letter-spacing: 2px;

	margin-bottom: -2px;

	@media (max-width: 1213px) {
		margin-bottom: 4px;

		font-size: 10px;
		font-weight: 400;
		letter-spacing: 1px;
	}

	& > .cardholder {
		text-transform: uppercase;
	}

	& > .card-date {
		letter-spacing: 1px;
	}
`;

type CardFrontProps = Pick<CardDetailsProps, 'cardDetails'>;

const CardFront = ({ cardDetails }: CardFrontProps) => {
	const { cardholder, cardNumber, expMonth, expYear } = cardDetails;
	return (
		<StyledCardFront>
			<CardLogo />
			<CardBody>
				{valueToCardFormat(cardNumber) || '0000 0000 0000 0000'}
			</CardBody>
			<CardFooter>
				<span className='cardholder'>{cardholder || 'Name Surname'}</span>
				<span className='card-date'>
					{expMonth || '00'}/{expYear || '00'}
				</span>
			</CardFooter>
		</StyledCardFront>
	);
};

export default CardFront;
