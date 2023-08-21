import styled from 'styled-components';
import { ReactComponent as IconComplete } from '../assets/icon-complete.svg';
import Button from './Button';

const StyledFormSubmitted = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	margin-bottom: 180px;

	& > svg {
		margin-bottom: 41px;
	}

	@media (max-width: 767px) {
		margin-bottom: 0px;
	}
`;

const Header = styled.span`
	font-size: 26px;
	font-weight: 600;
	letter-spacing: 4px;
	text-transform: uppercase;

	margin-bottom: 22px;
`;

const Text = styled.span`
	color: #8e8593;
	margin-bottom: 48px;
`;

interface FormSubmittedProps {
	onFormSubmitted: () => void;
}

const FormSubmitted = ({ onFormSubmitted }: FormSubmittedProps) => {
	return (
		<StyledFormSubmitted>
			<IconComplete />
			<Header>Thank you!</Header>
			<Text>We've added your card details</Text>
			<Button type='button' onClick={onFormSubmitted}>
				Continue
			</Button>
		</StyledFormSubmitted>
	);
};

export default FormSubmitted;
