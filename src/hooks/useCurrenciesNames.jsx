import { useEffect, useState } from 'react';

export default function useCurrencies() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_FRANK_URL}/currencies`)
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(data);
      });
  }, []);

  return currencies;
}
