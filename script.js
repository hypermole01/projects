// Initialize variables
let transactions = [];
let totalIncome = 0;
let totalExpenses = 0;
let balance = 0;

// Function to add income
function addIncome() {
  const incomeDescription = document.getElementById('incomeDescription').value;
  const incomeAmount = parseFloat(document.getElementById('incomeAmount').value);

  // Validate input
  if (incomeDescription === '' || isNaN(incomeAmount)) {
    alert('Please enter valid income details');
    return;
  }

  // Create transaction object
  const transaction = {
    type: 'income',
    description: incomeDescription,
    amount: incomeAmount,
  };

  // Update transactions array
  transactions.push(transaction);

  // Update totals
  totalIncome += incomeAmount;
  balance += incomeAmount;

  // Clear input fields
  document.getElementById('incomeDescription').value = '';
  document.getElementById('incomeAmount').value = '';

  // Update UI
  updateTransactionHistory();
  updateSummary();
}

// Function to add expense
function addExpense() {
  const expenseDescription = document.getElementById('expenseDescription').value;
  const expenseCategory = document.getElementById('expenseCategory').value;
  const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

  // Validate input
  if (expenseDescription === '' || expenseCategory === '' || isNaN(expenseAmount)) {
    alert('Please enter valid expense details');
    return;
  }

  // Create transaction object
  const transaction = {
    type: 'expense',
    description: expenseDescription,
    category: expenseCategory,
    amount: expenseAmount,
  };

  // Update transactions array
  transactions.push(transaction);

  // Update totals
  totalExpenses += expenseAmount;
  balance -= expenseAmount;

  // Clear input fields
  document.getElementById('expenseDescription').value = '';
  document.getElementById('expenseCategory').value = '';
  document.getElementById('expenseAmount').value = '';

  // Update UI
  updateTransactionHistory();
  updateSummary();
}

// Function to clear all transactions
function clearAll() {
  transactions = [];
  totalIncome = 0;
  totalExpenses = 0;
  balance = 0;

  // Update UI
  updateTransactionHistory();
  updateSummary();
}

// Function to update transaction history
function updateTransactionHistory() {
  const transactionHistory = document.getElementById('transactionHistory');
  transactionHistory.innerHTML = '';

  transactions.forEach((transaction, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${transaction.description}</td>
      <td>${transaction.category || ''}</td>
      <td>${transaction.amount}</td>
      <td>${transaction.type}</td>
      <td><button onclick="deleteTransaction(${index})">Delete</button></td>
    `;
    transactionHistory.appendChild(row);
  });
}

// Function to update summary
function updateSummary() {
  document.getElementById('totalIncome').textContent = totalIncome;
  document.getElementById('totalExpenses').textContent = totalExpenses;
  document.getElementById('balance').textContent = balance;
}

// Function to delete transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateTransactionHistory();
  updateSummary();

  // Recalculate totals
  totalIncome = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);

  totalExpenses = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      return acc + transaction.amount;
    }
    return acc;
  }, 0);

  balance = totalIncome - totalExpenses;
}

// Add event listeners
window.onload = function() {
document.getElementById('addIncomeButton').addEventListener('click', addIncome);
document.getElementById('addExpenseButton').addEventListener('click', addExpense);
document.getElementById('clearAllButton').addEventListener('click', clearAll);
};