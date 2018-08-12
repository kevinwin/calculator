import React, { Component } from 'react';
import Calculator from './Calculator';
import Big from 'big.js';
import './App.css';

class App extends Component {

  state = {
    partialCalculation: '',
    lastClicked: '',
    scale: 1,
    total: '0',
  }

  componentDidMount() {
    document.addEventListener('keydown', handleKeydown.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('keydown');
  }

  componentDidUpdate() {
    const { scale } = this.state;
    const node = this.node;
    const parentNode = node.parentNode;
    const offset = 30;

    const availableWidth = parentNode.offsetWidth - offset;
    const actualWidth = node.offsetWidth + offset;
    const actualScale = availableWidth / actualWidth;

    if (scale === actualScale) return;

    if (actualScale < 1) {
      this.setState({ scale: actualScale });
    } else if (scale < 1) {
      this.setState({ scale: 1 });
    }
  }

  updateTotal = (value) => {
    const isNumber = !Number.isNaN(value);

    isNumber && this.setState((prevState) => {
      const leftOperand = getLastLeftOperand(prevState.partialCalculation);
      const lastOperator = getLastOperator(prevState.partialCalculation);
      const rightOperand = getLastRightOperand(prevState.partialCalculation);

      return {
        total: leftOperand && lastOperator && !rightOperand ? createWorkingNumber('0', value) : createWorkingNumber(prevState.total, value) ,
        partialCalculation: value === '.' ? stripNonsensicalDots(prevState.partialCalculation + value) : prevState.partialCalculation + value,
        lastClicked: value
      }
    }
    );
  }

  resetTotal = () => {
    this.setState({
      total: '0',
      partialCalculation: '',
      lastClicked: ''
    });
  }

  divideBy100 = () => {
    this.setState((prevState) => {
      const leftOperand = getLastLeftOperand(prevState.partialCalculation);
      const rightOperand = getLastRightOperand(prevState.partialCalculation);
      const operator = getLastOperator(prevState.partialCalculation);
      return {
        partialCalculation: `${createWorkingPercent(leftOperand)}${operator}${rightOperand}`,
        total: createWorkingPercent(prevState.total),
      }
    })
  }

  toggleSign = () => {
    const leftOperand = getLastLeftOperand(this.state.partialCalculation);
    const operator = getLastOperator(this.state.partialCalculation);
    const rightOperand = getLastRightOperand(this.state.partialCalculation);
    this.setState((prevState) => ({
      partialCalculation: `${createToggledNumber(leftOperand)}${operator}${rightOperand}`,
      total: createToggledNumber(prevState.total),
    }))
  }

  performOperation = (operator) => {
    const lastOperator = getLastOperator(this.state.partialCalculation);
    const lastLeftOperand = getLastLeftOperand(this.state.partialCalculation);
    let lastRightOperand = getLastRightOperand(this.state.partialCalculation);

    if (!lastLeftOperand) {
      return this.setState({
        partialCalculation: '',
      })
    }

    if (!lastOperator || !lastRightOperand) {
      return this.setState((prevState) => {
        const justClickedEqualFromOperator = /[\/*.+-]/.test(lastOperator) && operator === '=';

        let oldState = {total: prevState.total};
        if (justClickedEqualFromOperator) {
          lastRightOperand = lastLeftOperand;
        }

        calculateNextTotal(oldState, lastOperator, lastLeftOperand, lastRightOperand);

        return {
          partialCalculation: justClickedEqualFromOperator ? oldState.total + lastOperator + lastLeftOperand : lastLeftOperand + operator,
          lastClicked: operator,
          total: oldState.total,
        }
      })
    }

    this.setState((prevState) => {
      const nextState = {};
      nextState.lastClicked = operator;
      if (operator === '=') {
        calculateNextTotal(nextState, lastOperator, lastLeftOperand, lastRightOperand);
        nextState.partialCalculation = `${nextState.total}${lastOperator}${lastRightOperand}`;
        return nextState;
      } else {
        if (prevState.lastClicked === '=') {
          nextState.partialCalculation = prevState.total + operator;
          return nextState;
        }

        calculateNextTotal(nextState, lastOperator, lastLeftOperand, lastRightOperand);

        nextState.partialCalculation = prevState.lastClicked === operator ? prevState.partialCalculation : nextState.total + operator;
        return nextState;
      }
    })


  }

  render() {
    const { updateTotal, resetTotal, divideBy100, toggleSign, performOperation } = this;
    const { total, partialCalculation, scale } = this.state;
    return (
      <div className="App">
        <Calculator total={total} memory={partialCalculation} scale={scale} handleNumClick={updateTotal} handleResetClick={resetTotal} handlePercentClick={divideBy100} handleToggleSignClick={toggleSign} handleOperation={performOperation} displayRef={node => this.node = node}/>
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

export function getLastLeftOperand(partialCalculation) {
  const regex = /(-?[0-9\.]+)([\/*\-+=])*/;
  const leftOperandMatch = partialCalculation.match(regex);
  const lastLeftOperand = leftOperandMatch ? leftOperandMatch[1] : '';

  return lastLeftOperand;
}

export function getLastRightOperand(partialCalculation) {
  const regex = /[0-9\.]+([\/*\-+=])(-?[0-9\.]+)/;
  const rightOperandMatch = partialCalculation.match(regex);
  const lastRightOperand = rightOperandMatch ? rightOperandMatch[2] : '';

  return lastRightOperand;
}

export function getLastOperator(partialCalculation) {
  const regex = /[0-9\.]+([\/*\-+=])(-?[0-9\.]*)/;
  const operatorMatch = partialCalculation.match(regex);
  const lastOperator = operatorMatch ? operatorMatch[1] : '';
  return lastOperator;
}

export function stripNonsensicalDots(partialCalculation) {
  let leftOperand = getLastLeftOperand(partialCalculation);
  let rightOperand = getLastRightOperand(partialCalculation);
  const operator = getLastOperator(partialCalculation);


  if (leftOperand.indexOf('.') !== leftOperand.lastIndexOf('.')) {
    leftOperand = leftOperand.slice(0, leftOperand.length - 1);
  }

  if (rightOperand.indexOf('.') !== rightOperand.lastIndexOf('.')) {
    rightOperand = rightOperand.slice(0, rightOperand.length - 1);
  }

  return `${leftOperand}${operator}${rightOperand}`;
}

export function calculateNextTotal(nextState, lastOperator, lastLeftOperand, lastRightOperand) {
  switch (lastOperator) {
    case '+':
      nextState.total = String(new Big(lastLeftOperand).plus(lastRightOperand));
      break;
    case '-':
      nextState.total = String(new Big(lastLeftOperand).minus(lastRightOperand));
      break;
    case '*':
      nextState.total = String(new Big(lastLeftOperand).times(lastRightOperand));
      break;
    case '/':
      nextState.total = lastRightOperand === '0' ? 'Infinity' : String(new Big(lastLeftOperand).div(lastRightOperand));
      break;
    default:
      break;
  }
}

export function handleKeydown(event) {
  const key = event.key;
  console.log(key);

  if (key === '–' && event.altKey) {
    return this.toggleSign();
  }

  switch (key) {
    case 'Escape':
      this.resetTotal();
    case 'Esc':
      this.resetTotal();
      break;
    case '%':
      this.divideBy100();
      break;
    case '/':
      this.performOperation('/');
      break;
    case '*':
      this.performOperation('*');
      break;
    case '-':
      this.performOperation('-');
      break;
    case '+':
      this.performOperation('+');
      break;
    case '=':
      this.performOperation('=');
    case 'Enter':
      this.performOperation('=');
      break;
    case '0':
      this.updateTotal('0');
      break;
    case '1':
      this.updateTotal('1');
      break;
    case '2':
      this.updateTotal('2');
      break;
    case '3':
      this.updateTotal('3');
      break;
    case '4':
      this.updateTotal('4');
      break;
    case '5':
      this.updateTotal('5');
      break;
    case '6':
      this.updateTotal('6');
      break;
    case '7':
      this.updateTotal('7');
      break;
    case '8':
      this.updateTotal('8');
      break;
    case '9':
      this.updateTotal('9');
      break;
    case '.':
      this.updateTotal('.');
      break;
    // Todo: Add backspace functionality
    default:
      break;
  }

}

export default App;
