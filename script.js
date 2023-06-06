document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    let expression = '';
  
    // Helper function to update the display
    const updateDisplay = (value) => {
      display.textContent = value;
    };
  
    // Get the buttons by their class names
    const digitButtons = document.querySelectorAll('.digit');
    const operatorButtons = document.querySelectorAll('.operator');
    const clearButton = document.querySelector('.clear');
    const allClearButton = document.querySelector('.all-clear');
    const equalsButton = document.querySelector('.equals');
    const pointButton = document.querySelector('.point');
  
    // Event listeners for digit buttons
    digitButtons.forEach((button) => {
      button.addEventListener('click', () => {
        expression += button.textContent;
        updateDisplay(expression);
      });
    });
  
    // Event listeners for operator buttons
    operatorButtons.forEach((button) => {
      button.addEventListener('click', () => {
        expression += button.textContent;
        updateDisplay(expression);
      });
    });
  
    // Event listener for clear button
    clearButton.addEventListener('click', () => {
      expression = expression.slice(0, -1);
      updateDisplay(expression);
    });
  
    // Event listener for all clear button
    allClearButton.addEventListener('click', () => {
      expression = '';
      updateDisplay(expression);
    });
  
    // Event listener for equals button
    equalsButton.addEventListener('click', () => {
      let result;
      try {
        const equations = expression.split(/([+\-*/])/);
        result = parseFloat(equations[0]);
        let equation = equations[0];
        for (let i = 1; i < equations.length; i += 2) {
          const operator = equations[i];
          const operand = parseFloat(equations[i + 1]);
          switch (operator) {
            case '+':
              result += operand;
              break;
            case '-':
              result -= operand;
              break;
            case '*':
              result *= operand;
              break;
            case '/':
              result /= operand;
              break;
            default:
              throw new Error('Invalid operator');
          }
          equation += ` ${operator} ${operand}`;
          updateDisplay(equation);
          equation = result.toString();
        }
        expression = result.toString();
      } catch (error) {
        result = 'Error';
        updateDisplay(result);
      }
    });
  
    // Event listener for point button
    pointButton.addEventListener('click', () => {
      if (
        expression === '' ||
        /[+\-*/]$/.test(expression) ||
        !/\d*\.\d*$/.test(expression)
      ) {
        expression += '.';
        updateDisplay(expression);
      }
    });
  
    // Initialize the display
    updateDisplay(expression);
  });
  