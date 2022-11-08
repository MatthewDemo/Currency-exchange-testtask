import React from 'react';
import { Block } from './Block';
import { Header }  from './Header' 
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('USD');
  const [toCurrency, setToCurrency] = React.useState('UAH');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);
  const [rates, setRates] = React.useState({});
  const USD = rates['UAH']?.toFixed(3)
  const EUR = (1 / (rates['EUR'] / rates['UAH']))?.toFixed(3);


  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then(res => res.json())
      .then((json) => {
        setRates(json.rates);
      })
      .catch(err => {
        console.warn(err);
        alert('Не удалось получить данные')
      })
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    setToPrice(result.toFixed(2));
    setFromPrice(value);
  }
  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    setFromPrice(result.toFixed(2))
    setToPrice(value)
  };
 
  React.useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])

  return (
    <>
      <Header rates={rates} USD={USD} EUR={EUR}>
      
      </Header>
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
    </>
   
  );
}

export default App;
