import styled from 'styled-components';
import CardFront from './CardFront';
import CardBack from './CardBack';
import { CardDetailsProps } from '../services/types';

const StyledCard = styled.div`
	display: flex;
	flex-direction: column;
	gap: 38px;

	margin-bottom: 181px;
	margin-right: 128px;

	@media (max-width: 1213px) {
		flex-direction: column-reverse;
		margin-bottom: -22px;
		margin-right: 0;
	}
`;

type CardProps = Pick<CardDetailsProps, 'cardDetails'>;

const Card = ({ cardDetails }: CardProps) => {
	return (
		<StyledCard>
			<CardFront cardDetails={cardDetails}></CardFront>
			<CardBack cvc={cardDetails.cvc}></CardBack>
		</StyledCard>
	);
};

export default Card;
