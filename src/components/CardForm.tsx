import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import {
	isValidKeyForCardDetail,
	validate,
	valueToCardFormat,
} from '../services/services';
import { CardDetailsProps, CardDetails } from '../services/types';

const StyledCardForm = styled.form`
	display: flex;
	flex-direction: column;

	width: 380px;
	gap: 20px;
	margin-bottom: 151px;

	& > span {
		gap: 0px;
		padding: 0;
		margin: 0;
	}

	@media (max-width: 1213px) {
		padding: 0 26px;
		gap: 16px;
		margin-bottom: 0;
		margin-top: -2px;
	}
`;

const Input = styled.input<{ $isError: boolean }>`
	position: relative;
	width: 100%;
	padding: 10px 12px;

	font-size: 18px;
	/* font-weight: 600; */

	outline: none;
	border: 1px solid;
	border-color: ${(props) => (props.$isError ? '#ff5252' : '#dedddf')};
	border-radius: 7px;

	&::placeholder {
		color: #dedddf;
	}

	&:focus {
		// Border color with linear-gradient
		border-color: transparent;
		background-image: linear-gradient(#fff, #fff),
			linear-gradient(to right, #6448fe, #600594);
		background-origin: border-box;
		background-clip: padding-box, border-box;
	}
`;

const Label = styled.label`
	font-size: 12px;
	text-transform: uppercase;
	letter-spacing: 2px;
	line-height: 2.5;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: start;

	& > .expiration-date {
		margin-right: 20px;

		& > div {
			display: flex;
			gap: 10px;

			& > input {
				width: 80px;
			}
		}
	}

	& .cvc {
		min-width: 189px;
	}

	@media (max-width: 1213px) {
		margin-bottom: 14px;

		& > .expiration-date {
			margin-right: 12px;

			& > div {
				gap: 8px;

				& > input {
					width: 72px;
				}
			}
		}

		& .cvc {
			min-width: 135px;
		}
	}
`;

const ErrorText = styled.span`
	display: inline-block;

	font-size: 12px;
	letter-spacing: 0px;
	line-height: 0;
	padding: 0;
	color: #ff5252;
	text-transform: lowercase;

	&::first-letter {
		text-transform: uppercase;
	}
`;

type Nullable<T> = {
	[K in keyof T]: T[K] | null;
};

type CardDetailError = Nullable<CardDetails>;

interface CardFormProps extends CardDetailsProps {
	onFormSubmit: () => void;
}

const CardForm = (props: CardFormProps) => {
	const { cardDetails, setCardDetails, onFormSubmit } = props;

	const [inputFieldErrors, setInputFieldErrors] = useState<CardDetailError>({
		cardholder: null,
		cardNumber: null,
		expMonth: null,
		expYear: null,
		cvc: null,
	});

	const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name;
		let value = event.target.value;
		value = name === 'cardNumber' ? value.replace(/ /g, '') : value;

		const { isError, errorText } = validate(name, value);

		if (isError) {
			setInputFieldErrors({ ...inputFieldErrors, [name]: errorText });
		} else {
			setInputFieldErrors({ ...inputFieldErrors, [name]: null });
		}
	};

	const updateInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		// Maybe I don't need to check value all the time when I update it.
		// It's better to check value when I send data, I think;
		setCardDetails({
			...cardDetails,
			[name]: name === 'cardNumber' ? value.replace(/ /g, '') : value,
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		let isValid = true;
		const newInputFieldErrors = { ...inputFieldErrors };
		Object.entries(cardDetails).forEach(([key, value]) => {
			if (isValidKeyForCardDetail(key, cardDetails)) {
				if (value === '') {
					newInputFieldErrors[key] = "Can't be blank";
				}
			}
		});
		Object.values(newInputFieldErrors).forEach((value) => {
			if (value !== null) {
				isValid = false;
			}
		});

		if (isValid) {
			onFormSubmit();
		} else {
			setInputFieldErrors({ ...newInputFieldErrors });
		}
	};

	const { cardholder, cardNumber, expMonth, expYear, cvc } = cardDetails;
	const {
		cardholder: cardholderError,
		cardNumber: cardNumberError,
		expMonth: expMonthError,
		expYear: expYearError,
		cvc: cvcError,
	} = inputFieldErrors;

	return (
		<StyledCardForm onSubmit={handleSubmit}>
			<Label>
				cardholder name
				<Input
					name='cardholder'
					placeholder='e.g. Jane Appleseed'
					value={cardholder}
					onChange={updateInputValue}
					onBlur={handleForm}
					$isError={!!cardholderError}
				/>
				{cardholderError && <ErrorText>{cardholderError}</ErrorText>}
			</Label>
			<Label>
				card number
				<Input
					name='cardNumber'
					placeholder='e.g. 1234 5678 9123 0000'
					value={valueToCardFormat(cardNumber)}
					onChange={updateInputValue}
					onBlur={handleForm}
					maxLength={23}
					$isError={!!cardNumberError}
				/>
				{cardNumberError && <ErrorText>{cardNumberError}</ErrorText>}
				{/* Max length 19 (some cards have it) characters and plus 4 spaces */}
			</Label>
			<Wrapper>
				<Label className='expiration-date'>
					Exp. date (MM/YY)
					<div>
						<Input
							name='expMonth'
							placeholder='MM'
							value={expMonth}
							onChange={updateInputValue}
							onBlur={handleForm}
							maxLength={2}
							$isError={!!expMonthError}
						/>
						<Input
							name='expYear'
							placeholder='YY'
							value={expYear}
							onChange={updateInputValue}
							onBlur={handleForm}
							maxLength={2}
							$isError={!!expYearError}
						/>
					</div>
					{(expMonthError || expYearError) && (
						<ErrorText>{expMonthError || expYearError}</ErrorText>
					)}
				</Label>
				<Label>
					CVC
					<Input
						name='cvc'
						className='cvc'
						placeholder='e.g. 123'
						value={cvc}
						onChange={updateInputValue}
						onBlur={handleForm}
						maxLength={3}
						$isError={!!cvcError}
					/>
					{cvcError && <ErrorText>{cvcError}</ErrorText>}
				</Label>
			</Wrapper>
			<Button type='submit'>Confirm</Button>
		</StyledCardForm>
	);
};

export default CardForm;
