// INPUT
var budget = document.getElementById("budget");
var expense = document.getElementById("expenseAmount");

//BUTTONS
var budgetBtn = document.getElementById("budgetBtn");
var expenseBtn = document.getElementById("expenseBtn");

//COUNTERS
var budgetCounter = document.getElementById("budgetCounter");
var expenseCounter = document.getElementById("expenseCounter");
var balanceCounter = document.getElementById("balanceCounter");

//MESSAGE
var balanceMessage = document.getElementById("budgetMessage");
var expenseTitle = document.getElementById("expenseTitle");
var expenseList = document.getElementById("expenseList");

budgetBtn.addEventListener("click", () => {
  if( budget.value != "" ){
    budgetCounter.innerHTML = "$" + budget.value;
    balanceCounter.innerHTML = "$" + budget.value;
    budget.value = null;
  }
});

expenseBtn.addEventListener("click", () => {
  if( expense.value != "" && expense.value > 0 && expense.value <= currentBalance() ){
    expenseCounter.innerHTML = "$" + expense.value;
    let newBalance = currentBalance() - expense.value;
    balanceCounter.innerHTML = "$" + newBalance;
    storeExpenses();
  } else if( expense.value >= currentBalance() ) {
    balanceMessage.innerHTML = "Non hai abbastanza soldi bro";
  }
});

function currentBalance(){
  let currentBalance = parseInt(balanceCounter.innerHTML.slice(1));
  return currentBalance;
}

function storeExpenses(){
  let arrMessage = [
    [""],
  ];

  console.log(arrMessage);

  for( i = 0; i < arrMessage.length; i++ ){
    let tr = document.createElement("tr");

    for( j = 0; j < arrMessage[i].length; j++ ){
      let td = document.createElement("td");

      arrMessage[i][0] = expenseTitle.value;
      arrMessage[i][1] = "$" + expense.value;

      td.innerHTML = arrMessage[i][j];
      tr.appendChild(td);
    }
    expenseList.appendChild(tr);
  }
}