// Select DOM elements
const inputEl = document.querySelector(".js-input");
const addBtn = document.querySelector(".js-input-btn");
const taskContainer = document.querySelector(".task-container");
const clearBtn = document.querySelector(".js-clear-btn");

// Store tasks in an array
let tasks = [];

// Save tasks to localStorage
function saveToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTask() {
  const saved = JSON.parse(localStorage.getItem("tasks"));
  if (saved) {
    tasks = saved;
  }
}

// Showing Task List!!
function showTask() {
  taskContainer.innerHTML = "";
  if (tasks.length === 0) {
    taskContainer.innerHTML = `<li>Please input your task!!</li>`;
    return;
  } else {
    tasks.forEach((task, index) => {
      const list = document.createElement("li");
      list.textContent = task;
      taskContainer.appendChild(list);

      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      list.appendChild(delBtn);

      delBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveToStorage();
        showTask();
      });
    });
  }
}

// Adding task to the ToDO List
function addTask() {
  const task = inputEl.value.trim();
  if (task !== "") {
    tasks.push(task);
    saveToStorage();
    showTask();
  }
  inputEl.value = "";
}

// Clear all ToDO List
function clearTask() {
  tasks.length = 0;
  saveToStorage();
  showTask();
}
clearBtn.addEventListener("click", clearTask);

// Add event listeners
addBtn.addEventListener("click", addTask);
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// loading first ToDo List
loadTask();
showTask();

