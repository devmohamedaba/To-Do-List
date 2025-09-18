let allSpans = document.querySelectorAll(".buttons span");
let results = document.querySelector(".results");
let theInput = document.getElementById("the-input");

// Load saved items on page load
window.onload = function () {
    let items = JSON.parse(localStorage.getItem("todoList")) || [];
    items.forEach(item => createItem(item));
};

// Create and display a new item
function createItem(text) {
    let existingItems = Array.from(document.querySelectorAll(".todo-item h2"))
        .map(el => el.textContent);

    if (existingItems.includes(text)) return;

    let item = document.createElement("div");
    item.className = "todo-item";

    let title = document.createElement("h2");
    title.textContent = text;

    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => {
        item.remove();
        removeFromStorage(text);
    };

    item.appendChild(title);
    item.appendChild(delBtn);
    results.appendChild(item);
}

// Save item to localStorage
function saveToStorage(text) {
    let items = JSON.parse(localStorage.getItem("todoList")) || [];
    if (!items.includes(text)) {
        items.push(text);
        localStorage.setItem("todoList", JSON.stringify(items));
    }
}

// Remove item from localStorage
function removeFromStorage(text) {
    let items = JSON.parse(localStorage.getItem("todoList")) || [];
    items = items.filter(item => item !== text);
    localStorage.setItem("todoList", JSON.stringify(items));
}

// Check if input is empty
function checkInput() {
    if (theInput.value === '') {
        results.innerHTML = '<span style="color:red">The Input Cannot Be Empty</span>';
    }
}

// Delete all items
function deleteItem() {
    console.log("I am A Delete Item");
}

// Handle button clicks
allSpans.forEach(span => {
    span.addEventListener("click", (e) => {
        if (e.target.classList.contains("add")) {
            if (theInput.value.trim() !== '') {
                createItem(theInput.value.trim());
                saveToStorage(theInput.value.trim());
                theInput.value = "";
            } else {
                checkInput();
            }
        }

        if (e.target.classList.contains("delete")) {
            deleteItem();
        }

        if (e.target.classList.contains("clear-all")) {
            results.innerHTML = "";
            localStorage.removeItem("todoList");
        }

        if (e.target.classList.contains("toggle-mode")) {
            document.body.classList.toggle("dark");
            e.target.textContent = document.body.classList.contains("dark")
                ? "☀️ "
                : "🌙 ";
        }
    });
});
