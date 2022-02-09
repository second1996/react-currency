import React from 'react';

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    oppositeCurrency,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;

  const amountRound = Math.round(amount * 10000) / 10000;

  return (
    <div className="currency-form-group">
      <input type="number" min="0" value={amountRound} onChange={onChangeAmount} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((currency, idx) => (
          <option
            key={currency + '_' + idx}
            value={currency}
            disabled={currency === oppositeCurrency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
