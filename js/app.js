let transactions = [];

document.getElementById("saveBtn").addEventListener("click", addTransaction);

function addTransaction() {
  let amount = document.getElementById("amount").value;
  let date = document.getElementById("date").value;
  let category = document.getElementById("category").value;
  let sub = document.getElementById("subCategory").value;
  let desc = document.getElementById("description").value;

  if (amount === "" || category === "") {
    alert("Please fill required fields");
    return;
  }

  let transaction = {
    id: Date.now(),
    amount: Number(amount),
    date: date,
    category: category,
    subCategory: sub,
    description: desc
  };

  // ✅ ADD HERE (after creating object)
  transactions.push(transaction);

  saveToLocal();        // ✅ SAVE DATA

  displayTransactions(); // ✅ UPDATE TABLE
  updateSummary();       // ✅ UPDATE TOTAL

  // (optional) clear form
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
  document.getElementById("category").value = "";
  document.getElementById("subCategory").value = "";
  document.getElementById("description").value = "";
}

function displayTransactions() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  transactions.forEach(tx => {
    let row = `
      <tr>
        <td>${tx.date}</td>
        <td>${tx.category}</td>
        <td>${tx.subCategory}</td>
        <td>${tx.description}</td>
        <td>${tx.amount}</td>
        <td>
          <button onclick="deleteTransaction(${tx.id})">Delete</button>
        </td>
      </tr>
    `;

    list.innerHTML += row;
  });
}

function deleteTransaction(id) {
  let confirmDelete = confirm("Are you sure?");
  if (!confirmDelete) return;

  transactions = transactions.filter(tx => tx.id !== id);
  saveToLocal(); 
  displayTransactions();
  updateSummary();
}

function updateSummary() {
  let income = 0;
  let expense = 0;

  transactions.forEach(tx => {
    if (tx.category === "Income") {
      income += tx.amount;
    } else {
      expense += tx.amount;
    }
  });

  document.getElementById("income").textContent = income;
  document.getElementById("expense").textContent = expense;
  document.getElementById("balance").textContent = income - expense;
}

function saveToLocal() {
  localStorage.setItem("data", JSON.stringify(transactions));
}

function loadFromLocal() {
  let data = localStorage.getItem("data");

  if (data) {
    transactions = JSON.parse(data);
    displayTransactions();
    updateSummary();
  }
}

window.onload = loadFromLocal;