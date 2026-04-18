const {
  isValidHexChar,
  isValidHexInput,
  applyBackspace,
  clearInput,
  hexToDecimal,
  decimalToHex,
  storeFirstNumber,
  storeSecondNumber,
  storeOperator,
  add,
  subtract,
  multiply,
  divide,
  calculate,
} = require('./calculator');

describe('INPUT HANDLING', () => {

  test('accepts valid numeric characters 0–9', () => {
    for (let i = 0; i <= 9; i++) {
      expect(isValidHexChar(String(i))).toBe(true);
    }
  });

  test('accepts valid hex letters A–F (uppercase)', () => {
    ['A','B','C','D','E','F'].forEach(char => {
      expect(isValidHexChar(char)).toBe(true);
    });
  });

  test('rejects invalid characters like G, Z, #, space', () => {
    ['G','Z','#',' ','!'].forEach(char => {
      expect(isValidHexChar(char)).toBe(false);
    });
  });

  test('allows input up to 2 digits', () => {
    expect(isValidHexInput('A')).toBe(true);
    expect(isValidHexInput('1F')).toBe(true);
  });

  test('rejects input longer than 2 digits', () => {
    expect(isValidHexInput('1FF')).toBe(false);
    expect(isValidHexInput('ABC')).toBe(false);
  });

  test('backspace removes the last character', () => {
    expect(applyBackspace('1F')).toBe('1');
    expect(applyBackspace('A')).toBe('');
    expect(applyBackspace('')).toBe('');
  });

  test('clear returns an empty string', () => {
    expect(clearInput('FF')).toBe('');
    expect(clearInput('')).toBe('');
  });

});

describe('NUMBER MANAGEMENT', () => {

  test('converts hex input to decimal: A → 10', () => {
    expect(hexToDecimal('A')).toBe(10);
  });

  test('converts hex input to decimal: FF → 255', () => {
    expect(hexToDecimal('FF')).toBe(255);
  });

  test('converts hex input to decimal: 0 → 0', () => {
    expect(hexToDecimal('0')).toBe(0);
  });

  test('converts decimal to hex: 21 → "15"', () => {
    expect(decimalToHex(21)).toBe('15');
  });

  test('converts decimal to hex: 255 → "FF"', () => {
    expect(decimalToHex(255)).toBe('FF');
  });

  test('converts decimal to hex: 0 → "0"', () => {
    expect(decimalToHex(0)).toBe('0');
  });

  test('stores the first number', () => {
    const state = storeFirstNumber({}, 'A');
    expect(state.firstNumber).toBe('A');
  });

  test('stores the second number', () => {
    const state = storeSecondNumber({}, 'B');
    expect(state.secondNumber).toBe('B');
  });

  test('stores the selected operator', () => {
    const state = storeOperator({}, '+');
    expect(state.operator).toBe('+');
  });

  test('stores all four operators correctly', () => {
    ['+', '-', '*', '/'].forEach(op => {
      const state = storeOperator({}, op);
      expect(state.operator).toBe(op);
    });
  });

});

describe('OPERATIONS', () => {

  test('adds A + B to return 15 (hex)', () => {
    expect(add('A', 'B')).toBe('15');
  });

  test('adds 1 + 1 to return 2', () => {
    expect(add('1', '1')).toBe('2');
  });

  test('adds F + 1 to return 10 (hex)', () => {
    expect(add('F', '1')).toBe('10');
  });

  test('subtracts B - A to return 1', () => {
    expect(subtract('B', 'A')).toBe('1');
  });

  test('subtracts F - F to return 0', () => {
    expect(subtract('F', 'F')).toBe('0');
  });

  test('multiplies 3 * 3 to return 9', () => {
    expect(multiply('3', '3')).toBe('9');
  });

  test('multiplies A * 2 to return 14 (hex)', () => {
    expect(multiply('A', '2')).toBe('14');
  });

  test('divides A / 2 to return 5', () => {
    expect(divide('A', '2')).toBe('5');
  });

  test('divides F / 3 to return 5', () => {
    expect(divide('F', '3')).toBe('5');
  });

  test('calculate dispatches addition correctly', () => {
    const state = { firstNumber: 'A', secondNumber: 'B', operator: '+' };
    expect(calculate(state)).toBe('15');
  });

  test('calculate dispatches subtraction correctly', () => {
    const state = { firstNumber: 'B', secondNumber: 'A', operator: '-' };
    expect(calculate(state)).toBe('1');
  });

  test('calculate dispatches multiplication correctly', () => {
    const state = { firstNumber: 'A', secondNumber: '2', operator: '*' };
    expect(calculate(state)).toBe('14');
  });

  test('calculate dispatches division correctly', () => {
    const state = { firstNumber: 'A', secondNumber: '2', operator: '/' };
    expect(calculate(state)).toBe('5');
  });

});

describe('4. OUTPUT DISPLAY REQUIREMENTS', () => {
  test('caps output at 4 digits (FFFF)', () => {
    expect(decimalToHex(70000)).toBe('FFFF');
  });
});

describe('5. USER INTERFACE REQUIREMENTS', () => {
  test('backspace logic removes the last character', () => {
    expect(applyBackspace('1F')).toBe('1');
  });

  test('clear logic resets input to an empty string', () => {
    expect(clearInput()).toBe('');
  });
});

describe('6. VALIDATION & ERROR HANDLING', () => {
  test('prevents negative results (returns 0)', () => {
    expect(subtract('A', 'F')).toBe('0');
  });




  
  test('prevents decimal places (rounds down)', () => {
    
    expect(divide('F', '2')).toBe('7');
  });

  test('calculate dispatcher handles all operators', () => {
    const state = { firstNumber: 'A', secondNumber: '2', operator: '*' };
    expect(calculate(state)).toBe('14');
  });
});