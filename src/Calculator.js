import React from 'react';
import './Calculator.css';

const Calculator = (props) => {
  const { total, memory, handleNumClick, handleResetClick, handlePercentClick, handleToggleSignClick } = props;
  return (
    <div className="Calculator">
      <div className="display-wrapper">
        <div className="display">{total}</div>
      </div>
      <div className="reset" onClick={ () => handleResetClick() }>{memory ? 'C' : 'AC'}</div>
      <div className="sign-toggler" onClick={ () => handleToggleSignClick() }>&plusmn;</div>
      <div className="percent" onClick={() => handlePercentClick() }>%</div>
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
      <div className="sign-divide">&divide;</div>
      <div className="sign-multiply">&times;</div>
      <div className="sign-subtract">-</div>
      <div className="sign-add">+</div>
      <div className="sign-equal">=</div>
      <div className="sign-decimal" onClick={ () => handleNumClick('.') }>.</div>
    </div>
  );

}

export default Calculator;


