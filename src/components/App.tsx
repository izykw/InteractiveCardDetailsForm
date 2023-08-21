import { useState } from 'react';
import styled from 'styled-components';
import bgDesktopImage from '../assets/bg-main-desktop.png';
import bgMobileImage from '../assets/bg-main-mobile.png';
import Card from './Card';
import FormSubmitted from './FormSubmitted';
import CardForm from './CardForm';
import { CardDetails } from '../services/types';
import { resetCardDetails } from '../services/services';

const Main = styled.div`
	background: url(${bgDesktopImage}) no-repeat;
	background-size: 483px 100%;

	@media (max-width: 1213px) {
		background-image: url(${bgMobileImage});
		background-size: 100% 240px;
	}
`;

const Container = styled.div`
	display: flex;
	align-items: center;

	height: 100vh;
	padding: 0 164px;

	@media (max-width: 1213px) {
		flex-direction: column;

		padding: 0;
	}
`;

const App = () => {
	const [isFormSubmitted, setFormSubmitted] = useState(false);
	const [cardDetails, setCardDetails] = useState<CardDetails>({
		cardholder: '',
		cardNumber: '',
		expMonth: '',
		expYear: '',
		cvc: '',
	});

	const onFormSubmitted = () => {
		setFormSubmitted(!isFormSubmitted);
		resetCardDetails(setCardDetails);
	};

	const onFormSubmit = () => {
		setFormSubmitted(true);
	};

	return (
		<Main>
			<Container>
				<Card cardDetails={cardDetails} />
				{isFormSubmitted ? (
					<FormSubmitted onFormSubmitted={onFormSubmitted} />
				) : (
					<CardForm
						cardDetails={cardDetails}
						setCardDetails={setCardDetails}
						onFormSubmit={onFormSubmit}
					/>
				)}
			</Container>
		</Main>
	);
};

export default App;
