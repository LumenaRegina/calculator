let num1 = "";
let num2 = "";
let operator = "";
let currentInput = "";
let result = "";

let calculator = document.querySelector(".calculator");
let display = document.querySelector(".display");

function add(num1, num2) {
  return Number.parseFloat(num1 + num2).toFixed(3);
}

function subtract(num1, num2) {
  return Number.parseFloat(num1 - num2).toFixed(3);
}

function multiply(num1, num2) {
  return Number.parseFloat(num1 * num2).toFixed(3);
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "Error";
  }
  return Number.parseFloat(num1 / num2).toFixed(3);
}

function calculate(num1, num2, operator) {
  const n1 = Number(num1);
  const n2 = Number(num2);

  switch (operator) {
    case "+":
      return add(n1, n2);
    case "-":
      return subtract(n1, n2);
    case "*":
      return multiply(n1, n2);
    case "/":
      if (n2 === 0){
        return "Error! Div by 0"
      }
      return divide(n1, n2);
    default:
      return null;
  }
}

calculator.addEventListener("click", (event) => {
  const clickedButton = event.target;
  const buttonValue = clickedButton.textContent;

  if (clickedButton.classList.contains("number")) {
    if (result !== "" && operator === "") {
      num1 = "";
      result = "";
    }
    
    currentInput += buttonValue;
    if (operator === "") {
      num1 = currentInput;
    } else {
      num2 = currentInput;
    }
    if (currentInput.includes(".")){
      document.querySelector(".comma").disabled = true
    }
  } else if (clickedButton.classList.contains("operator")) {
    document.querySelector(".comma").disabled = false
    if (result !== "") {
      num1 = String(result);
      num2 = "";
      currentInput = "";
      result = "";
    }
    if (operator !== "") {
      num1 = String(calculate(num1, currentInput, operator));
      currentInput = "";
    }
    operator = buttonValue;
    currentInput = "";
  } else if (clickedButton.classList.contains("enter")) {
    result = calculate(num1, currentInput, operator);
    num1 = String(result);
    num2 = "";
    operator = "";
    currentInput = "";
  } else if (clickedButton.classList.contains("clear")) {
    num1 = "";
    num2 = "";
    operator = "";
    currentInput = "";
    result = "";
  }

  if (result !== "" || (operator === "" && num1 !== "" && num2 === "")) {
    display.textContent = result !== "" ? result : num1;
  } else if (operator !== "") {
    display.textContent = num1 + operator + currentInput;
  } else {
    display.textContent = "DISPLAY";
  }
});