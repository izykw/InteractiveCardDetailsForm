export interface CardDetails {
	cardholder: string;
	cardNumber: string;
	expMonth: string;
	expYear: string;
	cvc: string;
}

export interface CardDetailsProps {
	cardDetails: CardDetails;
	setCardDetails: React.Dispatch<React.SetStateAction<CardDetails>>;
}
