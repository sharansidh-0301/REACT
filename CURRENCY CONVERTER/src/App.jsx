import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css'

function App() {

  const [amount, setAmount] = useState (0);
  const [fromCurrency, setFromCurrency] = useState ("USD");
  const [toCurrency, setToCurrency] = useState ("INR");
  const [converted, setConverted] = useState (null);
  const [exchangerate, setExchangeRate] = useState (null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try{
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(url);
        setExchangeRate(response.data.rates[toCurrency]);
      }catch(err){
        console.log(err);
      };
    };
    getExchangeRate();
  },[fromCurrency, toCurrency]);

  const handleAmountChange = (e) =>{
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ?  0 :value);  
  };

  const handleFromCurrency = (e)=>{
    setFromCurrency(e.target.value)
  };

  
  const handleToCurrency = (e)=>{
    setToCurrency(e.target.value)
  };


  useEffect(() => {
    if(exchangerate !== null){
      setConverted((amount*exchangerate).toFixed(2));
    }
  },[amount, exchangerate]);
  
  
  return (
    <>
      <div>
        <div className="container">
          <div className="box"></div>
          <div className="data">
            <h1>Currency Conveter</h1>
            <div className="input-container">
              <label htmlFor="amount">Amount: </label>
              <input type="number" id='amount' value={amount} onChange={handleAmountChange}/>
            </div>
            <div className="input-container">
              <label htmlFor="from-currency">From Currency :</label>
              <select  id="from-currency" value={fromCurrency} onChange={handleFromCurrency}>
                <option value="USD">USD - United States Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound Sterling</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="CHF">CHF - Swiss Franc</option>
                <option value="CNY">CNY - Chinese Yuan</option>
                <option value="SEK">SEK - Swedish Krona</option>
                <option value="NZD">NZD - New Zealand Dollar</option>
                <option value="MXN">MXN - Mexican Peso</option>
                <option value="SGD">SGD - Singapore Dollar</option>   
                <option value="HKD">HKD - Hong Kong Dollar</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="to-currency">To Currency :</label>
              <select  id="to-currency" value={toCurrency} onChange={handleToCurrency}>
                <option value="USD">USD - United States Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound Sterling</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="CHF">CHF - Swiss Franc</option>
                <option value="CNY">CNY - Chinese Yuan</option>
                <option value="SEK">SEK - Swedish Krona</option>
                <option value="NZD">NZD - New Zealand Dollar</option>
                <option value="MXN">MXN - Mexican Peso</option>
                <option value="SGD">SGD - Singapore Dollar</option>   
                <option value="HKD">HKD - Hong Kong Dollar</option>
              </select>
            </div>
            <div className="result">
              <p>{amount} {fromCurrency} is equal to {converted} {toCurrency}</p>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
