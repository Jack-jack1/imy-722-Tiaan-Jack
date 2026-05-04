/* =====================================================================
   gui.js — Wires the buttons in index.html to calculator.js.

   This file ONLY handles user input and rendering. All maths lives in
   calculator.js so it can be unit-tested without a browser.
   ===================================================================== */

(function () {
  const C = window.Calculator;

  // DOM references
  const display   = document.getElementById('display');
  const opIndicator = document.getElementById('op-indicator');
  const keypad    = document.getElementById('keypad');

  // Calculator state
  const state = {
    firstNumber:  '',   // saved when user presses an operator
    secondNumber: '',   // saved when user presses equals
    operator:     null, // '+', '-', '*', '/'
    current:      '',   // what the user is currently typing
    justEvaluated: false,
  };

  /** Re-paint the display from state. */
  function render() {
    let shown;
    if (state.current !== '')             shown = state.current;
    else if (state.firstNumber !== '')    shown = state.firstNumber;
    else                                  shown = '0';
    display.textContent = shown;
    display.classList.remove('error');
    opIndicator.textContent = state.operator ? `OP ${state.operator}` : ' ';
  }

  /** Show a short error message in the display. */
  function showError(msg) {
    display.textContent = msg;
    display.classList.add('error');
  }

  /* === Button handlers ================================================ */

  function pressDigit(ch) {
    if (state.justEvaluated) resetAll();
    if (!C.isValidHexChar(ch)) return;
    const next = state.current + ch;
    if (!C.isValidHexInput(next)) return;     // 2-digit cap
    state.current = next;
    render();
  }

  function pressOperator(op) {
    if (state.current === '' && state.firstNumber === '') return;
    if (state.current !== '') {
      state.firstNumber = state.current;
      state.current = '';
    }
    state.operator = op;
    state.justEvaluated = false;
    render();
  }

  function pressEquals() {
    if (!state.operator || state.firstNumber === '' || state.current === '') return;
    state.secondNumber = state.current;

    if (state.operator === '/' && C.hexToDecimal(state.secondNumber) === 0) {
      showError('DIV/0'); return;
    }

    const result = C.calculate(state);
    if (result == null) return;
    if (C.hexToDecimal(result) < 0) { showError('NEG'); return; }
    if (result.length > 4)          { showError('OVERFLOW'); return; }

    state.current = result;
    state.firstNumber = '';
    state.secondNumber = '';
    state.operator = null;
    state.justEvaluated = true;
    render();
  }

  function pressBack() {
    if (state.current !== '') state.current = C.applyBackspace(state.current);
    render();
  }

  function resetAll() {
    state.firstNumber  = C.clearInput();
    state.secondNumber = C.clearInput();
    state.operator     = null;
    state.current      = '';
    state.justEvaluated = false;
  }
  function pressClear() { resetAll(); render(); }

  /* === Event wiring =================================================== */

  keypad.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn'); if (!btn) return;
    if (btn.dataset.key)             pressDigit(btn.dataset.key);
    else if (btn.dataset.op)         pressOperator(btn.dataset.op);
    else if (btn.dataset.action === 'equals') pressEquals();
    else if (btn.dataset.action === 'back')   pressBack();
    else if (btn.dataset.action === 'clear')  pressClear();
  });

  // Test hook so automated tests can drive the GUI
  window.HexCalcGUI = {
    press(label) {
      if (label === 'AC')   return pressClear();
      if (label === 'BACK') return pressBack();
      if (label === '=')    return pressEquals();
      if ('+-*/'.includes(label)) return pressOperator(label);
      return pressDigit(label);
    },
    getDisplay: () => display.textContent,
    getState:   () => ({ ...state }),
  };

  render();
})();
