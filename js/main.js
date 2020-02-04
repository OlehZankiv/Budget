'use strict';

let startBtn = document.getElementById("start"),
  budgetValue = document.getElementsByClassName('budget-value')[0],
  dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
  levelValue = document.getElementsByClassName('level-value')[0],
  expensesValue = document.getElementsByClassName('expenses-value')[0],
  optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
  incomeValue = document.getElementsByClassName('income-value')[0],
  monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
  yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

  expensesItem = document.getElementsByClassName('expenses-item'),
  expensesBtn = document.getElementsByTagName('button')[0],
  optionalExpensesBtn = document.getElementsByTagName('button')[1],
  countBtn = document.getElementsByTagName('button')[2],
  optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
  incomeItem = document.querySelector('.choose-income'),
  checkSavings = document.querySelector('#savings'),
  sumValue = document.querySelector('.choose-sum'),
  percentValue = document.querySelector('.choose-percent'),
  yearValue = document.querySelector('.year-value'),
  monthValue = document.querySelector('.month-value'),
  dayValue = document.querySelector('.day-value');

startBtn.addEventListener("click", function () {
  let money, time;

  //Date
  do {
    let date = new Date(),
      year = date.getFullYear(),
      month = convertToZeroNumber(date.getMonth() + 1),
      dayOfMonth = convertToZeroNumber(date.getDate());

    time = prompt("Введите дату, формат(YYYY-MM-DD)", `${year}-${month}-${dayOfMonth}`);
  } while (!time);
  //Budget
  do {
    money = +prompt("Введите ваш месячный бютжет", "");
  }
  while (!isNumber(money) || money == "" || money == null || money < 0);

  //Save data of Budget
  appData.budget = money;
  budgetValue.textContent = appData.budget;

  //Save data of Time
  appData.timeData = time;
  let trueDate = new Date(Date.parse(time));
  yearValue.value = trueDate.getFullYear();
  monthValue.value = convertToZeroNumber(trueDate.getMonth() + 1);
  dayValue.value = convertToZeroNumber(trueDate.getDate());
});

expensesBtn.addEventListener("click", function () {
  if (appData.budget) {
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
      let a = expensesItem[i].value,
        b = expensesItem[++i].value;

      if ((typeof (a)) != null && (typeof (b)) != null &&
        (a != "" && a != " ") && (b != "" && b != " ") && a.length < 50 && b > 0) {
        appData[a] = +b;
        sum += +b;
      }
    }
    expensesValue.textContent = sum;
    if (appData.budget != undefined) {
      budgetValue.textContent = appData.budget;
      budgetValue.textContent += " = " + appData.budget + " - " + sum + " = " + (appData.budget - sum);
    }
  } else {
    budgetValue.textContent = "Вы не ввели бюджет";
    expensesValue.textContent = "Вы не ввели бюджет";
  }
});

optionalExpensesBtn.addEventListener("click", function () {
  if (appData.budget) {
    optionalExpensesValue.textContent = null;
    for (let i = 0; i < optionalExpensesItem.length; i++) {
      let opt = optionalExpensesItem[i].value;

      appData.optionalExpenses[i] = opt;

      optionalExpensesValue.textContent += appData.optionalExpenses[i] + " ";
    }

  } else {
    optionalExpensesValue.textContent = "Вы не ввели бюджет";
  }
});

countBtn.addEventListener("click", function () {
  if (appData.budget) {
    let nowBudget = appData.budget - expensesValue.textContent;
    appData.moneyPerDay = (nowBudget / 30).toFixed(2);
    dayBudgetValue.textContent = appData.moneyPerDay;

    if (appData.moneyPerDay <= 100) {
      levelValue.textContent = "Минимальный уровень достатка";
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay <= 2000) {
      levelValue.textContent = "Средний уровень достатка";
    } else if (appData.moneyPerDay > 2000) {
      levelValue.textContent = "Высокий уровень достатка";
    } else {
      levelValue.textContent = "Что-то пошло не так.\nError";
    }
  } else {
    dayBudgetValue.textContent = "Вы не ввели бюджет";
    levelValue.textContent = "Вы не ввели бюджет";
  }
});

incomeItem.addEventListener("input", function () {
  if (appData.budget) {
    let item = incomeItem.value;
    appData.income = item.split(", ");

    incomeValue.textContent = appData.income.join(", ");
  } else {
    incomeValue.textContent = "Вы не ввели бюджет";
  }
});

checkSavings.addEventListener("click", function () {
  if (appData.savings === false) {
    appData.savings = true;
  } else {
    appData.savings = true;
  }
});

sumValue.addEventListener("input", function () {
  if (appData.budget) {
    if (appData.savings) {
      let sum = +sumValue.value,
        percent = +percentValue.value;

      appData.monthIncome = ((sum / 100) / 12) * percent;
      appData.yearIncome = ((sum / 100)) * percent;

      monthSavingsValue.textContent = appData.monthIncome.toFixed(2);
      yearSavingsValue.textContent = appData.yearIncome.toFixed(2);
    }
  } else {
    monthSavingsValue.textContent = "Вы не ввели бюджет";
    yearSavingsValue.textContent = "Вы не ввели бюджет";
  }
});

percentValue.addEventListener("input", function () {
  if (appData.budget) {
    if (appData.savings) {
      let sum = +sumValue.value,
        percent = +percentValue.value;

      appData.monthIncome = ((sum / 100) / 12) * percent;
      appData.yearIncome = ((sum / 100)) * percent;

      monthSavingsValue.textContent = appData.monthIncome.toFixed(2);
      yearSavingsValue.textContent = appData.yearIncome.toFixed(2);
    }
  } else {
    yearSavingsValue.textContent = "Вы не ввели бюджет";
    monthSavingsValue.textContent = "Вы не ввели бюджет";
  }
});

//APPDATA
let appData = {
  budget: undefined,
  timeData: undefined,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false
};

//help functions

function isNumber(str) {
  return !isNaN(str);
}

function convertToZeroNumber(number) {
  if (number < 10) {
    return "0" + number;
  }
}