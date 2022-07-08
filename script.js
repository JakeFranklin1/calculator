let currentNum = "";
let previousNum = "";
let operator = "";

const currentDispNum = document.querySelector(".calcDispCurrent");
const previousDispNum = document.querySelector(".calcDispPrev");

const operators = document.querySelectorAll(".operator");
const numberBtn = document.querySelectorAll(".operand");
const decimalBtn = document.querySelector(".decimal");
const equalsBtn = document.querySelector(".equals");
const clear = document.querySelector(".clear");

window.addEventListener("keydown", function (e) {
  const key = document.querySelector(`button[data-key='${e.keyCode}']`);
  key.click();
});



decimalBtn.addEventListener("click", addDecimal);
clear.addEventListener("click", clearCalculator);

equalsBtn.addEventListener("click", () => {
  if (currentNum != "" && previousNum != "") {
    calculate();
  }
});

numberBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

function handleNumber(number) {
  if (previousNum !== "" && currentNum !== "" && operator === "") {
    previousNum = "";
    currentDispNum.textContent = currentNum;
  }
  if (currentNum.length <= 8) {
    currentNum += number;
    currentDispNum.textContent = currentNum;
  }
}

operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

function handleOperator(op) {
  if (previousNum === "") {
    previousNum = currentNum;
    operatorCheck(op);
  } else if (currentNum === "") {
    operatorCheck(op);
  } else {
    calculate();
    operator = op;
    currentDispNum.textContent = "0";
    previousDispNum.textContent = previousNum + " " + operator;
  }
}

function operatorCheck(text) {
  operator = text;
  previousDispNum.textContent = previousNum + " " + operator;
  currentDispNum.textContent = "0";
  currentNum = "";
}

function calculate() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);

  if (operator === "+") {
    previousNum = previousNum + currentNum;
  } else if (operator === "-") {
    previousNum = previousNum - currentNum;
  } else if (operator === "*") {
    previousNum = previousNum * currentNum;
  } else if (operator === "/") {
    if (currentNum <= 0) {
      previousNum = "lmao";
      previousDispNum.textContent = "";
      currentDispNum.textContent = previousNum;
      operator = "";
      return;
    }
    previousNum = previousNum / currentNum;
  }
  previousNum = roundNumber(previousNum);
  previousNum = previousNum.toString();
  displayResults();
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

function displayResults() {
  if (previousNum.length <= 8) {
    currentDispNum.textContent = previousNum;
  } else {
    currentDispNum.textContent = previousNum.slice(0, 8) + "...";
  }
  previousDispNum.textContent = "0";
  operator = "";
  currentNum = "";
}

function clearCalculator() {
  currentNum = "";
  previousNum = "";
  operator = "";
  currentDispNum.textContent = "0";
  previousDispNum.textContent = "0";
}

function addDecimal() {
  if (!currentNum.includes(".")) {
    currentNum += ".";
    currentDispNum.textContent = currentNum;
  }
}

// LOGIC

// const add = (a, b) => a + b;

// const subtract = (a, b) => a - b;

// const divide = (a, b) => a / b;

// const multiply = (a, b) => a * b;

// const operate = function (operator, a, b) {
//   a = Number(a);
//   b = Number(b);

//   switch (operator) {
//     case "+":
//       return add(a, b);
//     case "-":
//       return subtract(a, b);
//     case "*":
//       return multiply(a, b);
//     case "/":
//       if (b === 0) return null;
//       else return divide(a, b);
//     default:
//       return null;
//   }
// };
