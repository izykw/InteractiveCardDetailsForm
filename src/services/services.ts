import { CardDetails } from './types';

interface CardDetailError {
	isError: boolean;
	errorText: string;
}

// I think I need to rewrite this function
// 1. I can only return errorText which is of type string | null;
export const validate = (name: string, value: string): CardDetailError => {
	let isError: boolean = false;
	let errorText: string = '';

	const numberRegex = /^\d+$/;

	if (!value) {
		isError = true;
		errorText = "Can't be blank";

		return {
			isError,
			errorText,
		};
	}

	switch (name) {
		case 'cardNumber': {
			if (!numberRegex.test(value)) {
				isError = true;
				errorText = 'Wrong format, numbers only';
			} else if (!isCorrectCreditCardNumber(value)) {
				isError = true;
				errorText = 'Invalid card number';
			}
			break;
		}
		case 'expMonth': {
			const monthRegex = /^(0[1-9]|1[0-2])$/;

			if (!monthRegex.test(value)) {
				isError = true;
				errorText = 'Wrong format';
			}
			break;
		}
		case 'expYear': {
			const yearRegex = /^([2-9][0-9])$/;

			if (!yearRegex.test(value)) {
				isError = true;
				errorText = 'Wrong format';
			}
			break;
		}
		case 'cvc': {
			if (!numberRegex.test(value)) {
				isError = true;
				errorText = 'Wrong format, numbers only';
			} else if (value.length !== 3) {
				isError = true;
				errorText = 'Incorrect code';
			}
			break;
		}
		default: {
			console.log("Case doesn't exist");
		}
	}

	return {
		isError,
		errorText,
	};
};

// Luhn algorithm for card validation
const isCorrectCreditCardNumber = (value: string) => {
	const temp = value.split('');
	const length = temp.length;

	let checksum = length % 2 === 0 ? 0 : Number(temp[0]);
	for (let i = length - 2; i >= 0; i -= 2) {
		let multValue = Number(temp[i]) * 2;

		if (multValue >= 10 && multValue <= 99) {
			multValue = Math.floor(multValue / 10) + (multValue % 10);
		}

		checksum += Number(multValue);
		checksum += Number(temp[i + 1]);
	}

	return checksum % 10 === 0;
};

export const valueToCardFormat = (value: string) => {
	let formattedValue = value
		.replace(/ /g, '')
		.replace(/(.{4})/g, '$1 ')
		.trim();

	return formattedValue;
};

export const isValidKeyForCardDetail = (
	value: string,
	CardDetailsObj: CardDetails
): value is keyof CardDetails => {
	return value in CardDetailsObj;
};

export const resetCardDetails = (
	setCardDetails: React.Dispatch<React.SetStateAction<CardDetails>>
) => {
	setCardDetails((details) => {
		const emptyDetails: CardDetails = { ...details };
		for (const key in emptyDetails) {
			if (Object.prototype.hasOwnProperty.call(emptyDetails, key)) {
				if (isValidKeyForCardDetail(key, emptyDetails)) {
					emptyDetails[key] = '';
				}
			}
		}
		return emptyDetails;
	});
};
