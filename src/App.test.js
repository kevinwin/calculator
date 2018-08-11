import { createWorkingNumber } from './App';

describe('createWorkingNumber', () => {
  let prevTotal, value, expected;
  const allNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  it('appends a decimal if the previous total has no decimals and the value is a decimal', () => {
    prevTotal = '123';
    value = '.';
    expected = '123.';

    expect(createWorkingNumber(prevTotal, value)).toBe(expected);
  });

  it('does not append a decimal if the previous total has a decimal', () => {
    prevTotal = '123.4';
    value = '.';
    expected = '123.4';

    expect(createWorkingNumber(prevTotal, value)).toBe(expected);
  });

  it('adds values after a decimal', () => {
    prevTotal = '123.';
    allNums.forEach(num => {
      expected = `${prevTotal}${num}`;
      expect(createWorkingNumber(prevTotal, num)).toBe(expected);
    })
  });

  it('adds numbers to the right of the previous value if the value is not zero', () => {
    prevTotal = '1';
    allNums.forEach(num => {
      expected = `${prevTotal}${num}`;
      expect(createWorkingNumber(prevTotal, num)).toBe(expected);
    });
  });

  it('sums numbers to the previous value if the previous value is zero and the value is a number', () => {
    prevTotal = '0';

    allNums.forEach(num => {
      expected = num;
      expect(createWorkingNumber(prevTotal, num)).toBe(expected);
    });
  })

  it('does not append another zero if the previous total is zero', () => {
    prevTotal = '0';
    value = '0';

    expected = '0';
    expect(createWorkingNumber(prevTotal, value)).toBe(expected);
  });
})
