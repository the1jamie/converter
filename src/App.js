import React from 'react';
import {url} from './constants';
import CurrencyInput from './component/currencyInput';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      amount: '',
      conversion: '',
      from: '',
      to: '',
      currency: {
        CAD: 0,
        USD: 0,
        EUR: 0,
      },
      currList: function() {
        return Object.keys(this.currency);
      }
    }
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async getExchangeRates() {
    const protocol = 'http';
    const {origin, path, accessKey: key} = url;
    let symbols = this.state.currList().join(',')
    try {
      let reponse = await fetch(`${protocol}://${origin}/${path}?access_key=${key}&symbols=${symbols}`);
      let data = await reponse.json();
      return data;
    } catch(err) {
      throw err
    }
  }

  componentDidMount(){
    this.getExchangeRates().then(exchange => {
      const from = this.state.currList()[0];
      const to = from;
      const {rates:{CAD, USD, EUR}, date} = exchange;
      this.setState({
        currency: { CAD, USD, EUR
         },
         date, 
         from, 
         to
      })
    })
  } 

  convert(amount, to = this.state.to, from = this.state.from) {
    const { currency } = this.state;
    const result = amount * (currency[to]/currency[from])
    return result.toFixed(2)
  }

  handleCurrencyChange(e) {
    const to = (e.target.id === 'to') ? e.target.value : undefined;
    const from = (e.target.id === 'from') ? e.target.value : undefined;

    this.setState({
      [e.target.id]: e.target.value,
      conversion: this.convert(this.state.amount, to, from)
    })
  }
  
  handleValueChange(e) {
    this.setState({
      amount: e.target.value,
      conversion: this.convert(e.target.value)
    })
  }

  handleClick(e) {
    alert(`Based on http://fixer.io/ (${this.state.date}). `)
  }

  render(){
    return (
      <form className="App">
        <h1>Currency converter</h1>
        <p>Type in amount and select currency:</p>
        <CurrencyInput currList={this.state.currList()} id='from' onCurrChange={this.handleCurrencyChange} onValueChange={this.handleValueChange}/>
        <CurrencyInput currList={this.state.currList()} id='to' onCurrChange={this.handleCurrencyChange} conversion={this.state.conversion}/>
        <a href="#" onClick={this.handleClick} >disclaimer</a>
      </form>
    );
  }
}

export default App;
