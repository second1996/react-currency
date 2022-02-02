import React from 'react';

export default function CurrencyRow(props) {
	const { currencyOptions, selectedCurrency, onChangeCurrency, onChangeAmount, amount } = props;

	return (
		<div>
			<input type="number" value={amount} onChange={onChangeAmount} />
			<select value={selectedCurrency} onChange={onChangeCurrency}>
				{currencyOptions.map((option, idx) => (
					<option key={option + '_' + idx} value={option}>{option}</option>
				))}
			</select>
		</div>
	);
};
