// Investment Accounts Assignment Start Code

// HTML Variables
let containerEl = document.getElementById("container");
let outputEl = document.getElementById("output");
let goBtnEl = document.getElementById("go");
let menuEl = document.getElementById("menu");
let minOutputEl = document.getElementById('minoutput');
let maxOutputEl = document.getElementById('maxoutput');

// Global Variable
let accounts = [];
for (let n = 1; n <= 200; n++) {
  accounts.push(Math.random() * 5000);
}
let maxAmount = 5000; // account values should be b/t 0 and max

// Display Data
drawArray();

function drawArray() {
  let outputStr = "";
  let divHeight;
  for (let i = 0; i < accounts.length; i++) {
    divHeight = (accounts[i] / maxAmount) * 600; // Scale accounts to fit in array visualizer container
    outputStr += `<div style="height:${divHeight}px"></div>`;
  }
  containerEl.innerHTML = outputStr;
}

// Main Menu & Go Button
goBtnEl.addEventListener("click", mainMenu);

function mainMenu() {
  // Get value of menu select element
  let selection = menuEl.value;

  // Take action based on menu selection
  if (selection === "count-range") {
    countRange();
  } else if (selection === "donor") {
    generousDonor();
  } else if (selection === "hacker") {
    hackerAttack();
  } else if (selection === "stats") {
    investmentStats();
  } else if (selection === "add") {
    addAccount();
  } else if (selection === "remove-low") {
    removeLow();
  } else if (selection === "robin-hood") {
    robinHood();
  }

  // Redraw array to show any changes
  drawArray();
}

// ******************************************************
// MENU SELECTION FUNCTIONS
// ******************************************************
function countRange() {
  // Output the number of accounts with amounts between $2,000 and $4,000, inclusive
  let count = 0;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] < 4000 && accounts[i] > 2000) {
      count++
    }
    outputEl.innerHTML = count;
  }
}

function generousDonor() {
  // A generous donor has decided to give $500 to every investment
  // account that has less than $2000. 
  // Modify the investment account array to apply this donation.
  // Output the total amount of money that was donated.
  let count = 0;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] < 2000) {
      accounts[i] += 500;
      count += 500;
    }
  }
  outputEl.innerHTML = count;
}

function hackerAttack() {
  // A hacker steals 5% from every account.
  // Modify the investment account array to apply this theft.
  // Output the total amount that was stolen.
  count = 0;
  for (let i = 0; i < accounts.length; i++) {
    accounts[i] -= (accounts[i] * 0.05)
    count -= (accounts[i] * 0.05);
  }
  outputEl.innerHTML = count;
}

function investmentStats() {
  // Output the minimum account amount, the maximum account amount
  // and the average account amount.
  let total = 0
  for (let i = 0; i < accounts.length; i++) {
    total += accounts[i];
  }

  outputEl.innerHTML = total / (accounts.length + 1);
  minOutputEl.innerHTML = Math.min(...accounts);
  maxOutputEl.innerHTML = Math.max(...accounts)
}

function addAccount() {
  // Prompt for a new account amount and add this to the invesment account
  // array. Output a confirmation that a new account was added with an
  // opening amount of _______.
  let promptData = prompt('How much money do you want to add to your new account?');
  accounts.push(promptData);
  outputEl.innerHTML = "A new account has been added with an opening amount of " + promptData + "$.";
}

function removeLow() {
  // Remove all accounts that are below $500.
  // Output how many accounts were removed.
  let count = 0;
  for (let i = 0; i < accounts.length; i++) {
    while (accounts[i] < 500) {
      accounts.splice(i, 1);
      count++
    }
  }
  outputEl.innerHTML = "The amount of accounts that have been removed are " + count;
}

function robinHood() {
  // Steal from the rich and give to the poor.
  // Take $400 from every account that has over $4000.
  // Then evenly distribute the total amount taken between all the
  // accounts that have less than $1000.
  // Output how many accounts received money and 
  // how much each account received.

  let richAccounts = 0;
  let poorAccounts = 0;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] > 4000) {
      richAccounts++;
    } else if (accounts[i] < 1000) {
      poorAccounts++;
    }
  }
  let returns = (richAccounts * 400) / poorAccounts;

  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] < 1000) {
      accounts[i] += returns;
    } else if (accounts[i] > 4000) {
      accounts[i] -= 400;
    }
  }

  outputEl.innerHTML = 'The amount of accounts that got returns from Robin Hood are ' + poorAccounts;
  minOutputEl.innerHTML = 'The amount of money returned to the poor is ' + returns + '$.'
}