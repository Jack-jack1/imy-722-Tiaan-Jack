function isValidHexChar(char) {
  return /^[0-9A-F]$/i.test(char);
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
  if(dec < 0) return "0"
  const cappedValue = Math.min(dec, 0xFFFF);
  
  return cappedValue.toString(16).toUpperCase();
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
  const res = hexToDecimal(a) - hexToDecimal(b);

  return decimalToHex(res);
}

function multiply(a, b) {
  return decimalToHex(hexToDecimal(a) * hexToDecimal(b));
}

function divide(a, b) {
  const valB = hexToDecimal(b);
  if (valB === 0) return "0"; 
  

  const res = Math.floor(hexToDecimal(a) / valB);
  return decimalToHex(res);
}

function calculate(state) {
  if (!state.firstNumber || !state.secondNumber || !state.operator) return "0";

  switch (state.operator) {
    case '+': return add(state.firstNumber, state.secondNumber);
    case '-': return subtract(state.firstNumber, state.secondNumber);
    case '*': return multiply(state.firstNumber, state.secondNumber);
    case '/': return divide(state.firstNumber, state.secondNumber);
    default: return "0";
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