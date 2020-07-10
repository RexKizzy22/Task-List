// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskBtn = document.querySelector(".btn");

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // Add task event
  form.addEventListener("submit", addTask);
  // Display tasks addEventListener
  document.addEventListener("DOMContentLoaded", getTasks);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear task event
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

function addTask(e) {
  // Validate taskInput
  if (taskInput.value === "") {
    alert("Add Task");
  }
  // Create a list element
  const li = document.createElement("li");
  li.className = "collection-item";
  // Append task to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create a link element
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  // Append icon to link
  link.innerHTML = "<i class='fa fa-remove'></i>";
  // Append to list item
  li.appendChild(link);
  // Append to ul
  taskList.appendChild(li);

  // Persist to local storage
  addTaskToLocalStorage(taskInput.value);

  // Clear taskInput
  taskInput.value = "";

  e.preventDefault();
}

function addTaskToLocalStorage(task) {
  // Initialize storage variable
  let tasks;
  // Check if there exists a storage variable
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  // Save storage variable back to LS
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  // Initialize storage variable
  let tasks;
  // Check if there exists a storage variable
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(task => {
    // Create a list element
    const li = document.createElement("li");
    li.className = "collection-item";
    // Append task to li
    li.appendChild(document.createTextNode(task));
    // Create a link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    // Append icon to link
    link.innerHTML = "<i class='fa fa-remove'></i>";
    // Append to list item
    li.appendChild(link);
    // Append to ul
    taskList.appendChild(li);
  });

}

function removeTask(e) {
  // Implement event delegation
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
      // Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(element) {
  let tasks;
  // Check if there exists a storage variable
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // Filter the selected item
  tasks = tasks.filter(task => {
    return element.textContent !== task;
  });
  // Save storage variable back to LS
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks() {
  // Slower
  // taskList.innerHTML = "";

  // Faster
  while (taskList.firstChild) {
    taskList.firstChild.remove();
  }
  // Clear tasks from localStorage
  clearTasksFromLS();
}

function clearTasksFromLS() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
