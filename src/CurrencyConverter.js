//Import Statements
import React, { useState, useEffect } from "react";
import axios from "axios";

//Functional Component
const CurrencyConverter = () => {
  //State Variables
  const [currencies, setCurrencies] = useState({});
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  //Fetching Currency Data
  useEffect(() => {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        setCurrencies(response.data.rates);
      })
      .catch((error) => {
        console.error("Error fetching currency data: ", error);
      });
  }, []);

  //Conversion Logic
  const convertCurrency = () => {
    const exchangeRate = currencies[toCurrency] / currencies[fromCurrency];
    const result = (amount * exchangeRate).toFixed(2);
    setConvertedAmount(result);
  };

  //Rendering the User Interface
  return (
    <div className="container">
      <h2>Currency Converter</h2>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="form-select mt-3"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.keys(currencies).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>
          Converted Amount:{" "}
          {convertedAmount !== null ? convertedAmount : "0.00"} {toCurrency}
        </h3>
        <button onClick={convertCurrency}>Convert</button>
        <select
          className="form-select mt-3"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.keys(currencies).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyConverter;
