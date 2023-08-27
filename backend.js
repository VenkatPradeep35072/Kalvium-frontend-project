const express = require('express');
const app = express();

// Array to store history of operations
const history = [];

// Function to evaluate mathematical expression
function evaluateExpression(expression) {
  try {
    return eval(expression);
  } catch (error) {
    return 'Invalid expression';
  }
}

// Middleware to handle mathematical operations
app.get('/:operands*', (req, res) => {
  const operands = req.params.operands.split('/');
  let expression = '';

  for (let i = 0; i < operands.length; i++) {
    if (i % 2 === 0) {
      expression += operands[i];
    } else {
      expression += ` ${operands[i]} `;
    }
  }

  const result = evaluateExpression(expression);

  // Store operation in history
  if (history.length >= 20) {
    history.shift();
  }
  history.push({ question: expression, answer: result });

  res.json({ question: expression, answer: result });
});

// Endpoint to view history
app.get('/history', (req, res) => {
  res.json(history);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});