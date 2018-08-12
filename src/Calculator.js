import React from 'react';
import './Calculator.css';

const Calculator = (props) => {
  const { total, memory, scale, handleNumClick, handleResetClick, handlePercentClick, handleToggleSignClick, handleOperation } = props;
  const normalDisplay = <div className="display" ref={props.displayRef} style={{transform: `scale(${scale},${scale})`}}>{total}</div>;
  const infinityDisplay = <div className="display infinity" ref={props.displayRef}>Not a number</div>;
  return (
    <div className="Calculator">
      <div className="display-wrapper">
        {/-?Infinity/.test(total) ? infinityDisplay : normalDisplay}
      </div>
      <div className="reset" title="Clear (Esc)" onClick={ () => handleResetClick() }>{memory ? 'C' : 'AC'}</div>
      <div className="sign-toggler" title="Negate the displayed value (or press Option-Minus [-])" onClick={ () => handleToggleSignClick() }>&plusmn;</div>
      <div className="percent" title="Percent (or press %)" onClick={() => handlePercentClick() }>%</div>
      <div className="num-zero-wrapper" onClick={ () => handleNumClick('0') }>
        <div className="num-zero">0</div>
      </div>
      <div className="num-one" onClick={ () => handleNumClick('1') } >1</div>
      <div className="num-two" onClick={ () => handleNumClick('2') }>2</div>
      <div className="num-three" onClick={ () => handleNumClick('3') }>3</div>
      <div className="num-four" onClick={ () => handleNumClick('4') }>4</div>
      <div className="num-five" onClick={ () => handleNumClick('5') }>5</div>
      <div className="num-six" onClick={ () => handleNumClick('6') }>6</div>
      <div className="num-seven" onClick={ () => handleNumClick('7') }>7</div>
      <div className="num-eight" onClick={ () => handleNumClick('8') }>8</div>
      <div className="num-nine" onClick={ () => handleNumClick('9') }>9</div>
      <div className="sign-divide" title="Divide (or press /)" onClick={ () => handleOperation('/') }>&divide;</div>
      <div className="sign-multiply" title="Multiply (or press *)" onClick={ () => handleOperation('*') }>&times;</div>
      <div className="sign-subtract" title="Subtract (or press -)" onClick={ () => handleOperation('-') }>-</div>
      <div className="sign-add" title="Add (or press +)" onClick={ () => handleOperation('+') }>+</div>
      <div className="sign-equal" title="Equal (or press Return)" onClick={ () => handleOperation('=') }>=</div>
      <div className="sign-decimal" onClick={ () => handleNumClick('.') }>.</div>
    </div>
  );

}

export default Calculator;


