import { useEffect, useState } from 'react';

export default function useCurrenciesLatest() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState(1);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_FRANK_URL}/latest`)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];

        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`${process.env.REACT_APP_FRANK_URL}/latest?from=${fromCurrency}&to=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  return {
    setFromCurrency,
    setToCurrency,
    currencyOptions,
    fromCurrency,
    toCurrency,
    exchangeRate,
  };
}
