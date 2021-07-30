"use strict";

const submitBtn = document.querySelector(".submit-btn");
const taskContainer = document.querySelector(".task-container");

// initialize localStorage

const todos = JSON.parse(localStorage.getItem("tasks"));

if (todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  // ============ Adding Task ============
  let taskInput = document.querySelector(".form-input").value;
  let completed = false;

  // ============ Clearing input field ============
  document.querySelector(".form-input").value = "";

  if (todo) {
    taskInput = todo.text;
    completed = todo.completed;
  }

  // ============ Creating todo element ============
  createTodoEl(taskInput, completed);

  // ============ Completing Task ============
  completeTask();

  // ============ Deleting Task ============
  deleteTask();
}

function createTodoEl(taskName, completedStatus) {
  const alert = document.querySelector(".alert");

  const taskHtml = `<div class="row task">
  <span class="task-name ${
    completedStatus ? "completed" : ""
  }">${taskName}</span>
  <button type="submit" class="btn delete-btn">
  <i class="uil uil-trash-alt"></i>
  </button>
  </div>`;

  if (taskName.length == 0) {
    alert.textContent = "please enter a to-do";
    // showing alert text
    alert.classList.add("alert-danger");
  } else {
    taskContainer.insertAdjacentHTML("beforeend", taskHtml);
    updateLocalStorage();
    alert.classList.remove("alert-danger");
  }
}

function deleteTask() {
  const delBtn = document.querySelectorAll(".delete-btn");

  delBtn.forEach((task) =>
    task.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.remove();
      updateLocalStorage();
    })
  );
}

function completeTask() {
  const task = document.querySelectorAll(".task-name");
  task.forEach(
    (task) =>
      (task.onclick = function () {
        this.classList.toggle("completed");
        updateLocalStorage();
      })
  );
}

function updateLocalStorage() {
  const todosEl = document.querySelectorAll(".task-name");

  const taskArray = [];

  todosEl.forEach((task) => {
    taskArray.push({
      text: task.innerHTML,
      completed: task.classList.contains("completed"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(taskArray));
}
