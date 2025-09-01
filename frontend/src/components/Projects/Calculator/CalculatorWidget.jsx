import React, { useState, useEffect } from 'react';
import './CalculatorWidget.css';

const CalculatorWidget = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState('');
  const [currentOperation, setCurrentOperation] = useState(null);
  const [shouldResetScreen, setShouldResetScreen] = useState(false);

  const appendNumber = (number) => {
    if (display === '0' || shouldResetScreen) {
      setDisplay(number);
      setShouldResetScreen(false);
    } else {
      setDisplay(display + number);
    }
  };

  const appendPoint = () => {
    if (shouldResetScreen) {
      setDisplay('0.');
      setShouldResetScreen(false);
      return;
    }
    if (display === '') {
      setDisplay('0.');
      return;
    }
    if (display.includes('.')) {
      return;
    }
    setDisplay(display + '.');
  };

  const clear = () => {
    setDisplay('0');
    setFirstOperand('');
    setCurrentOperation(null);
    setShouldResetScreen(false);
  };

  const deleteNumber = () => {
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const setOperation = (operator) => {
    if (currentOperation !== null && !shouldResetScreen) {
      evaluate();
    }
    setFirstOperand(display);
    setCurrentOperation(operator);
    if (operator !== 'x!') {
      setShouldResetScreen(true);
    } else {
      // For factorial, calculate immediately
      const result = factorial(Number(display));
      setDisplay(roundResult(result).toString());
      setCurrentOperation(null);
      setShouldResetScreen(true);
    }
  };

  const evaluate = () => {
    if (currentOperation === null || shouldResetScreen) {
      return;
    }
    if (currentOperation === '÷' && display === '0') {
      alert("You can't divide by 0!");
      clear();
      return;
    }

    const secondOperand = display;
    const result = operate(currentOperation, firstOperand, secondOperand);
    setDisplay(roundResult(result).toString());
    setCurrentOperation(null);
    setShouldResetScreen(true);
  };

  const roundResult = (number) => {
    return Math.round(number * 1000) / 1000;
  };

  const add = (a, b) => a + b;
  const subtract = (a, b) => a - b;
  const multiply = (a, b) => a * b;
  const divide = (a, b) => a / b;

  const factorial = (a) => {
    if (a === 0) return 1;
    let product = 1;
    for (let i = a; i > 0; i--) {
      product *= i;
    }
    return product;
  };

  const power = (a, b) => Math.pow(a, b);

  const operate = (operator, a, b) => {
    a = Number(a);
    b = Number(b);
    
    switch (operator) {
      case '+':
        return add(a, b);
      case '−':
        return subtract(a, b);
      case '×':
        return multiply(a, b);
      case '÷':
        if (b === 0) return null;
        return divide(a, b);
      case 'x!':
        return factorial(a);
      case 'x^y':
        return power(a, b);
      default:
        return null;
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
      if (e.key === '.') appendPoint();
      if (e.key === '=' || e.key === 'Enter') evaluate();
      if (e.key === 'Backspace') deleteNumber();
      if (e.key === 'Escape') clear();
      if (e.key === '+') setOperation('+');
      if (e.key === '-') setOperation('−');
      if (e.key === '*') setOperation('×');
      if (e.key === '/') setOperation('÷');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, firstOperand, currentOperation, shouldResetScreen]);

  return (
    <div className="calculator-widget">
      <div className="calculator-header">
        <h3>Basic Calculator</h3>
        <p>Trig functions do not yet work</p>
      </div>
      <div className="calculator">
        <div className="screen">{display}</div>
        <div className="buttons-grid">
          <div id="numbers">
            <div className="row" id="row-6">
              <button className="btn btn-function" onClick={() => setOperation('x!')}>x!</button>
              <button className="btn btn-function" onClick={() => setOperation('x^y')}>x^y</button>
              <div className="btn disabled">π</div>
            </div>
            <div className="row" id="row-5">
              <div className="btn disabled">sin</div>
              <div className="btn disabled">cos</div>
              <div className="btn disabled">tan</div>
            </div>
            <div id="row-4" className="row">
              <button className="btn" onClick={() => appendNumber('7')}>7</button>
              <button className="btn" onClick={() => appendNumber('8')}>8</button>
              <button className="btn" onClick={() => appendNumber('9')}>9</button>
            </div>
            <div id="row-3" className="row">
              <button className="btn" onClick={() => appendNumber('4')}>4</button>
              <button className="btn" onClick={() => appendNumber('5')}>5</button>
              <button className="btn" onClick={() => appendNumber('6')}>6</button>
            </div>
            <div id="row-2" className="row">
              <button className="btn" onClick={() => appendNumber('1')}>1</button>
              <button className="btn" onClick={() => appendNumber('2')}>2</button>
              <button className="btn" onClick={() => appendNumber('3')}>3</button>
            </div>
            <div id="row-1" className="row">
              <button className="btn" onClick={appendPoint}>.</button>
              <button className="btn btn-zero" onClick={() => appendNumber('0')}>0</button>
              <button className="btn btn-equals" onClick={evaluate}>=</button>
            </div>
          </div>
          <div id="operand-buttons">
            <button className="o-btn" onClick={() => setOperation('÷')}>÷</button>
            <button className="o-btn" onClick={() => setOperation('×')}>×</button>
            <button className="o-btn" onClick={() => setOperation('−')}>−</button>
            <button className="o-btn" onClick={() => setOperation('+')}>+</button>
            <button className="o-btn btn-red span-2" onClick={clear}>CLEAR</button>
            <button className="o-btn btn-blue span-2" onClick={deleteNumber}>DELETE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorWidget;
