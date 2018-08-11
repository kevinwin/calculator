import React, { Component } from 'react';
import Calculator from './Calculator';
import './App.css';

class App extends Component {

  state = {
    total: '0',
    partialCalculation: '',
  }

  updateTotal = (value) => {
    const isNumber = !Number.isNaN(value);

    isNumber && this.setState((prevState) => ({
      total: createWorkingNumber(prevState.total, value),
      partialCalculation: prevState.partialCalculation + value
      })
    );
  }

  resetTotal = () => {
    this.setState({
      total: '0',
      partialCalculation: ''
    });
  }

  divideBy100 = () => {
    this.setState((prevState) => ({
      total: createWorkingPercent(prevState.total)
    }))
  }

  toggleSign = () => {
    this.setState((prevState) => ({
      total: createToggledNumber(prevState.total)
    }))
  }

  render() {
    const { updateTotal, resetTotal, divideBy100, toggleSign } = this;
    const { total, partialCalculation } = this.state;
    return (
      <div className="App">
          <Calculator total={total} memory={partialCalculation} handleNumClick={updateTotal} handleResetClick={resetTotal} handlePercentClick={divideBy100} handleToggleSignClick={toggleSign} />
      </div>
    );
  }
}

export function createWorkingNumber(prevTotal, value) {
  const hasDecimal = prevTotal.indexOf('.') !== -1;
  const isNumber = (...args) => !Number.isNaN(args);

  if (hasDecimal && value === '.') return prevTotal;
  if (!hasDecimal && value === '.') return `${prevTotal}.`
  if (prevTotal === '0' && isNumber(value)) return value;

  if (isNumber(value)) return `${prevTotal}${value}`;
}

export function createWorkingPercent(prevTotal) {
  const isEssentiallyZero = /^-?0\.?$/.test(prevTotal);
  if (isEssentiallyZero) return '0';
  return String(+(prevTotal) / 100);
}

export function createToggledNumber(prevTotal) {
  const isEssentiallyZero = /^-?0\.?$/.test(prevTotal);
  if (isEssentiallyZero) return '0';
  return prevTotal.indexOf('-') === -1 ? `-${prevTotal}` : prevTotal.slice(1);
}

export default App;
