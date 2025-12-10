// Select elements
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("list");
const totalText = document.getElementById("total");

// Load expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Add button click
addBtn.addEventListener("click", () => {
    const title = titleInput.value;
    const amount = Number(amountInput.value);

    if (title === "" || amount === 0) {
        alert("Enter valid details");
        return;
    }

    const expense = {
        id: Date.now(),
        title,
        amount
    };

    expenses.push(expense);
    saveData();
    render();

    titleInput.value = "";
    amountInput.value = "";
});

// Render expenses to screen
function render() {
    list.innerHTML = "";

    expenses.forEach(exp => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${exp.title} - ₹${exp.amount}
            <button class="delete-btn" onclick="deleteExpense(${exp.id})">X</button>
        `;
        list.appendChild(li);
    });

    // Calculate total using reduce
    const total = expenses.reduce((acc, item) => acc + item.amount, 0);
    totalText.textContent = total;

    saveData();
}

// Delete expense
function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    render();
}

// Save to localStorage
function saveData() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// First render
render();
