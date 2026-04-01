const visor = document.querySelector(".visor");
const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";
let previousInput = "";
let abrevfloat = previousInput.toFixed(2);
let operator = null;
let waitingForNextNumber = false;

function updateDisplay() {
  visor.textContent = currentInput;
  result.textContent = "";
}

function inputNumber(number) {
  if (waitingForNextNumber) {
    currentInput = number;
    waitingForNextNumber = false;
  } else {
    currentInput = currentInput === "0" ? number : currentInput + number;
  }
}

function inputDecimal() {
  if (waitingForNextNumber) {
    currentInput = "0.";
    waitingForNextNumber = false;
    return;
  }

  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
}

function clearCalculator() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  waitingForNextNumber = false;
}

function toggleSign() {
  if (currentInput !== "0") {
    currentInput = (parseFloat(currentInput) * -1).toString();
  }
}

function applyPercent() {
  currentInput = (parseFloat(currentInput) / 100).toString();
}

function chooseOperator(nextOperator) {
  if (operator && !waitingForNextNumber) {
    calculate();
  }

  previousInput = currentInput;
  operator = nextOperator;
  waitingForNextNumber = true;
}

function calculate() {
  if (operator === null || previousInput === "" || waitingForNextNumber) return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let computation;

  switch (operator) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = current === 0 ? "Erro" : prev / current;
      break;
    default:
      return;
  }

  currentInput = computation.toString();
  previousInput = "";
  operator = null;
  waitingForNextNumber = false;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.dataset.number;
    const action = button.dataset.action;
    const selectedOperator = button.dataset.operator;

    if (number !== undefined) {
      if (number === ".") {
        inputDecimal();
      } else {
        inputNumber(number);
      }
    } else if (selectedOperator !== undefined) {
      chooseOperator(selectedOperator);
    } else if (action !== undefined) {
      switch (action) {
        case "clear":
          clearCalculator();
          break;
        case "toggle-sign":
          toggleSign();
          break;
        case "percent":
          applyPercent();
          break;
        case "calculate":
          calculate();
          break;
      }
    }

    updateDisplay();
  });
});

updateDisplay();