import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';

const API_URL = 'https://api.frankfurter.app/latest';

function App() {
	const [currencyOptions, setCurrencyOptions] = useState([]);
	const [fromCurrency, setFromCurrency] = useState();
	const [toCurrency, setToCurrency] = useState();
	const [exchangeRate, setExchangeRate] = useState(1);
	const [amount, setAmount] = useState(1);
	const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

	let toAmount, fromAmount;

	if (amountInFromCurrency) {
		fromAmount = amount;
		toAmount = (amount * exchangeRate).toFixed(2);
	} else {
		toAmount = amount;
		fromAmount = (amount / exchangeRate).toFixed(2);
	}

	useEffect(() => {
		fetch(`${API_URL}`)
			.then(res => res.json())
			.then(data => {
				const firstCurrency = Object.keys(data.rates)[0];

				setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
				setFromCurrency(data.base);
				setToCurrency(firstCurrency);
				setExchangeRate(data.rates[firstCurrency]);
			});
	}, []);

	useEffect(() => {
		if (fromCurrency != null && toCurrency != null) {
			fetch(`${API_URL}?from=${fromCurrency}&to=${toCurrency}`)
				.then(res => res.json())
				.then(data => setExchangeRate(data.rates[toCurrency]));
		}
	}, [fromCurrency, toCurrency]);
	

	function handleFromAmountChange(e) {
		setAmount(e.target.value);
		setAmountInFromCurrency(true);
	}

	function handleToAmountChange(e) {
		setAmount(e.target.value);
		setAmountInFromCurrency(false);
	}

	return (
		<>
			<h1>Конвертор валют</h1>
			<CurrencyRow
				currencyOptions={currencyOptions}
				selectedCurrency={fromCurrency}
				onChangeCurrency={(e) => setFromCurrency(e.target.value)}
				onChangeAmount={handleFromAmountChange}
				amount={fromAmount}
			/>
			<div>=</div>
			<CurrencyRow
				currencyOptions={currencyOptions}
				selectedCurrency={toCurrency}
				onChangeCurrency={(e) => setToCurrency(e.target.value)}
				onChangeAmount={handleToAmountChange}
				amount={toAmount}
			/>
		</>
	);
}

export default App;
