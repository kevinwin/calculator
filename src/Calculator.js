import React from 'react';
import './Calculator.css';

const Calculator = (props) => (
  <div className="Calculator">
    <div className="display-wrapper">
      <div className="display">{props.total}</div>
    </div>
    <div className="reset">AC</div>
    <div className="sign-toggler">&plusmn;</div>
    <div className="percent">%</div>
    <div className="num-zero-wrapper">
      <div className="num-zero">0</div>
    </div>
    <div className="num-one">1</div>
    <div className="num-two">2</div>
    <div className="num-three">3</div>
    <div className="num-four">4</div>
    <div className="num-five">5</div>
    <div className="num-six">6</div>
    <div className="num-seven">7</div>
    <div className="num-eight">8</div>
    <div className="num-nine">9</div>
    <div className="sign-divide">&divide;</div>
    <div className="sign-multiply">&times;</div>
    <div className="sign-subtract">-</div>
    <div className="sign-add">+</div>
    <div className="sign-equal">=</div>
    <div className="sign-decimal">.</div>
  </div>
);

export default Calculator;
  

