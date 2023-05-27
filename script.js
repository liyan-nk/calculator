const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".button");
const equalsButton = document.querySelector(".equals-button");
let isFirstInput = true;

// Function to update the screen display
const updateScreen = (value) => {
  screen.textContent = value;
};

// Function to check if a character is an operator
const isOperator = (char) => {
  return /[+\-*/×÷]/.test(char);
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "C") {
      updateScreen("0");
      isFirstInput = true;
    } else if (button.textContent === "=") {
      let expression = screen.textContent;
      try {
        // Replace "×" with "*" and "÷" with "/"
        expression = expression.replace(/×/g, "*").replace(/÷/g, "/");
        let result = eval(expression);
        updateScreen(result);
        isFirstInput = true;
      } catch (error) {
        updateScreen("Error");
        isFirstInput = true;
      }
    } else {
      const lastCharacter = screen.textContent.slice(-1);
      const isLastCharacterOperator = isOperator(lastCharacter);
      const isCurrentCharacterOperator = isOperator(button.textContent);

      if (isLastCharacterOperator && isCurrentCharacterOperator) {
        // Replace the previous operator with the current operator
        let updatedExpression = screen.textContent.slice(0, -1) + button.textContent;
        updateScreen(updatedExpression);
        return;
      }

      if (isFirstInput) {
        if (isOperator(button.textContent)) {
          // Handle case where operator is pressed after the result
          updateScreen(screen.textContent + button.textContent);
        } else {
          // Replace the screen content with the new input
          updateScreen(button.textContent);
        }
        isFirstInput = false;
      } else {
        updateScreen(screen.textContent + button.textContent);
      }
    }
  });
});

// Initialize the screen with 0
updateScreen("0");
