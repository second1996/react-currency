import { useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';
import useCurrencies from './hooks/useCurrenciesNames';
import useCurrenciesLatest from './hooks/useCurrenciesLatest';

const FROM = 0;
const TO = 1;

function App() {
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const {
    setFromCurrency,
    setToCurrency,
    currencyOptions,
    fromCurrency,
    toCurrency,
    exchangeRate,
  } = useCurrenciesLatest();
  const currenciesNames = useCurrencies();

  let toAmount, fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  function handleAmountChange(e, type) {
    let value = e.target.value;

    switch (type) {
      case FROM:
        setAmount(value);
        setAmountInFromCurrency(true);
        break;

      case TO:
        setAmount(value);
        setAmountInFromCurrency(false);
        break;

      default:
        setAmount(value);
        setAmountInFromCurrency(true);
        break;
    }
  }

  return (
    <>
      <div className="currency">
        <div className="currency-current">
          <div className="from">1 {currenciesNames[fromCurrency]} equals</div>
          <div className="to">
            {exchangeRate.toFixed(2)} {currenciesNames[toCurrency]}
          </div>
        </div>
        <div className="currency-form">
          <CurrencyRow
            currencyOptions={currencyOptions}
            oppositeCurrency={toCurrency}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)}
            onChangeAmount={(e) => handleAmountChange(e, FROM)}
            amount={fromAmount}
          />
          <CurrencyRow
            currencyOptions={currencyOptions}
            oppositeCurrency={fromCurrency}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
            onChangeAmount={(e) => handleAmountChange(e, TO)}
            amount={toAmount}
          />
        </div>
      </div>
    </>
  );
}

export default App;
