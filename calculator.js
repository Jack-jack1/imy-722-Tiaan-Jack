function isValidHexChar(char) {
  return /^[0-9A-F]$/.test(char);
}

function isValidHexInput(str) {
  return str.length <= 2 && str.split('').every(isValidHexChar);
}

function applyBackspace(str) {
  return str.slice(0, -1);
}

function clearInput() {
  return '';
}

function hexToDecimal(hex) {
  return parseInt(hex, 16);
}

function decimalToHex(dec) {
  return dec.toString(16).toUpperCase();
}

function storeFirstNumber(state, val) {
  return { ...state, firstNumber: val };
}

function storeSecondNumber(state, val) {
  return { ...state, secondNumber: val };
}

function storeOperator(state, op) {
  return { ...state, operator: op };
}

function add(a, b) {
  return decimalToHex(hexToDecimal(a) + hexToDecimal(b));
}

function subtract(a, b) {
  return decimalToHex(hexToDecimal(a) - hexToDecimal(b));
}

function multiply(a, b) {
  return decimalToHex(hexToDecimal(a) * hexToDecimal(b));
}

function divide(a, b) {
  return decimalToHex(Math.floor(hexToDecimal(a) / hexToDecimal(b)));
}

function calculate(state) {
  switch (state.operator) {
    case '+': return add(state.firstNumber, state.secondNumber);
    case '-': return subtract(state.firstNumber, state.secondNumber);
    case '*': return multiply(state.firstNumber, state.secondNumber);
    case '/': return divide(state.firstNumber, state.secondNumber);
  }
}

module.exports = {
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
};
