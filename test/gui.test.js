/**
 * @jest-environment jsdom
 */

beforeAll(() => {
  document.body.innerHTML = `
    <div id="display">0</div>
    <span id="op-indicator"></span>
    <section id="keypad"></section>
  `;
  require('../js/calculator');
  require('../js/gui');
});

beforeEach(() => {
  window.HexCalcGUI.press('AC');
});

const gui     = () => window.HexCalcGUI;
const display = () => document.getElementById('display').textContent;

describe('DIGIT INPUT', () => {

  test('pressing a hex digit shows it on the display', () => {
    gui().press('A');
    expect(display()).toBe('A');
  });

  test('pressing two digits shows both', () => {
    gui().press('1');
    gui().press('F');
    expect(display()).toBe('1F');
  });

  test('third digit is blocked by the 2-digit cap', () => {
    gui().press('1');
    gui().press('F');
    gui().press('F');
    expect(display()).toBe('1F');
  });

  test('all hex letters A–F are accepted', () => {
    for (const ch of ['A', 'B', 'C', 'D', 'E', 'F']) {
      gui().press('AC');
      gui().press(ch);
      expect(display()).toBe(ch);
    }
  });

  test('all digits 0–9 are accepted', () => {
    for (const ch of ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) {
      gui().press('AC');
      gui().press(ch);
      expect(display()).toBe(ch);
    }
  });

});

describe('OPERATOR INPUT', () => {

  test('pressing an operator stores it in state', () => {
    gui().press('A');
    gui().press('+');
    expect(gui().getState().operator).toBe('+');
  });

  test('pressing an operator with no input does nothing', () => {
    gui().press('+');
    expect(gui().getState().operator).toBeNull();
  });

  test('all four operators are accepted', () => {
    for (const op of ['+', '-', '*', '/']) {
      gui().press('AC');
      gui().press('A');
      gui().press(op);
      expect(gui().getState().operator).toBe(op);
    }
  });

});

describe('EQUALS / CALCULATION', () => {

  test('A + B = 15', () => {
    gui().press('A');
    gui().press('+');
    gui().press('B');
    gui().press('=');
    expect(display()).toBe('15');
  });

  test('F - A = 5', () => {
    gui().press('F');
    gui().press('-');
    gui().press('A');
    gui().press('=');
    expect(display()).toBe('5');
  });

  test('A * 2 = 14', () => {
    gui().press('A');
    gui().press('*');
    gui().press('2');
    gui().press('=');
    expect(display()).toBe('14');
  });

  test('A / 2 = 5', () => {
    gui().press('A');
    gui().press('/');
    gui().press('2');
    gui().press('=');
    expect(display()).toBe('5');
  });

  test('equals with no operator does nothing', () => {
    gui().press('A');
    gui().press('=');
    expect(display()).toBe('A');
  });

  test('operator is cleared after equals', () => {
    gui().press('A');
    gui().press('+');
    gui().press('B');
    gui().press('=');
    expect(gui().getState().operator).toBeNull();
  });

});

describe('CLEAR & BACKSPACE', () => {

  test('AC resets display to 0', () => {
    gui().press('A');
    gui().press('AC');
    expect(display()).toBe('0');
  });

  test('AC clears a stored operator', () => {
    gui().press('A');
    gui().press('+');
    gui().press('AC');
    expect(gui().getState().operator).toBeNull();
  });

  test('BACK removes the last character', () => {
    gui().press('1');
    gui().press('F');
    gui().press('BACK');
    expect(display()).toBe('1');
  });

  test('BACK on a single character returns display to 0', () => {
    gui().press('A');
    gui().press('BACK');
    expect(display()).toBe('0');
  });

});

describe('ERROR HANDLING', () => {

  test('division by zero shows DIV/0', () => {
    gui().press('A');
    gui().press('/');
    gui().press('0');
    gui().press('=');
    expect(display()).toBe('DIV/0');
  });

  test('AC clears an error state', () => {
    gui().press('A');
    gui().press('/');
    gui().press('0');
    gui().press('=');
    gui().press('AC');
    expect(display()).toBe('0');
  });

});

describe('POST-EVALUATION FLOW', () => {

  test('pressing a digit after equals starts a fresh number', () => {
    gui().press('A');
    gui().press('+');
    gui().press('B');
    gui().press('=');
    gui().press('1');
    expect(display()).toBe('1');
  });

  test('result is cleared when a new number is started', () => {
    gui().press('A');
    gui().press('+');
    gui().press('B');
    gui().press('=');
    gui().press('F');
    expect(display()).toBe('F');
    expect(gui().getState().firstNumber).toBe('');
  });

});
