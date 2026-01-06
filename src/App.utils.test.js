import {
  createWorkingPercent,
  createToggledNumber,
  getLastLeftOperand,
  getLastRightOperand,
  getLastOperator,
  stripNonsensicalDots,
  calculateNextTotal
} from './App';

describe('createWorkingPercent', () => {
  it('divides a number by 100', () => {
    expect(createWorkingPercent('50')).toBe('0.5');
    expect(createWorkingPercent('100')).toBe('1');
    expect(createWorkingPercent('25')).toBe('0.25');
  });

  it('returns 0 for zero values', () => {
    expect(createWorkingPercent('0')).toBe('0');
    expect(createWorkingPercent('-0')).toBe('0');
    expect(createWorkingPercent('0.')).toBe('0');
  });

  it('handles decimal numbers', () => {
    expect(createWorkingPercent('1.5')).toBe('0.015');
  });

  it('handles negative numbers', () => {
    expect(createWorkingPercent('-50')).toBe('-0.5');
  });
});

describe('createToggledNumber', () => {
  it('toggles positive to negative', () => {
    expect(createToggledNumber('5')).toBe('-5');
    expect(createToggledNumber('123')).toBe('-123');
  });

  it('toggles negative to positive', () => {
    expect(createToggledNumber('-5')).toBe('5');
    expect(createToggledNumber('-123')).toBe('123');
  });

  it('returns 0 for zero values', () => {
    expect(createToggledNumber('0')).toBe('0');
    expect(createToggledNumber('-0')).toBe('0');
    expect(createToggledNumber('0.')).toBe('0');
  });

  it('handles decimals', () => {
    expect(createToggledNumber('1.5')).toBe('-1.5');
    expect(createToggledNumber('-1.5')).toBe('1.5');
  });
});

describe('getLastLeftOperand', () => {
  it('extracts left operand from simple expression', () => {
    expect(getLastLeftOperand('5+3')).toBe('5');
    expect(getLastLeftOperand('123-45')).toBe('123');
  });

  it('extracts left operand with decimal', () => {
    expect(getLastLeftOperand('5.5+3')).toBe('5.5');
  });

  it('extracts negative left operand', () => {
    expect(getLastLeftOperand('-5+3')).toBe('-5');
  });

  it('returns the number when no operator', () => {
    expect(getLastLeftOperand('123')).toBe('123');
  });

  it('returns empty string for empty input', () => {
    expect(getLastLeftOperand('')).toBe('');
  });
});

describe('getLastRightOperand', () => {
  it('extracts right operand from expression', () => {
    expect(getLastRightOperand('5+3')).toBe('3');
    expect(getLastRightOperand('123-45')).toBe('45');
  });

  it('extracts negative right operand', () => {
    expect(getLastRightOperand('5+-3')).toBe('-3');
  });

  it('returns empty string when no right operand', () => {
    expect(getLastRightOperand('5+')).toBe('');
    expect(getLastRightOperand('123')).toBe('');
  });
});

describe('getLastOperator', () => {
  it('extracts addition operator', () => {
    expect(getLastOperator('5+3')).toBe('+');
  });

  it('extracts subtraction operator', () => {
    expect(getLastOperator('5-3')).toBe('-');
  });

  it('extracts multiplication operator', () => {
    expect(getLastOperator('5*3')).toBe('*');
  });

  it('extracts division operator', () => {
    expect(getLastOperator('5/3')).toBe('/');
  });

  it('returns empty string when no operator', () => {
    expect(getLastOperator('123')).toBe('');
  });
});

describe('stripNonsensicalDots', () => {
  it('removes duplicate dots from left operand', () => {
    expect(stripNonsensicalDots('1.2.+3')).toBe('1.2+3');
  });

  it('removes duplicate dots from right operand', () => {
    expect(stripNonsensicalDots('1+2.3.')).toBe('1+2.3');
  });

  it('leaves valid expressions unchanged', () => {
    expect(stripNonsensicalDots('1.2+3.4')).toBe('1.2+3.4');
  });
});

describe('calculateNextTotal', () => {
  it('performs addition', () => {
    const state = {};
    calculateNextTotal(state, '+', '5', '3');
    expect(state.total).toBe('8');
  });

  it('performs subtraction', () => {
    const state = {};
    calculateNextTotal(state, '-', '10', '4');
    expect(state.total).toBe('6');
  });

  it('performs multiplication', () => {
    const state = {};
    calculateNextTotal(state, '*', '6', '7');
    expect(state.total).toBe('42');
  });

  it('performs division', () => {
    const state = {};
    calculateNextTotal(state, '/', '20', '4');
    expect(state.total).toBe('5');
  });

  it('returns Infinity for division by zero', () => {
    const state = {};
    calculateNextTotal(state, '/', '5', '0');
    expect(state.total).toBe('Infinity');
  });

  it('handles decimal arithmetic precisely', () => {
    const state = {};
    calculateNextTotal(state, '+', '0.1', '0.2');
    expect(state.total).toBe('0.3');
  });
});
