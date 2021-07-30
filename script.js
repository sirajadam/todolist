"use strict";

const submitBtn = document.querySelector(".submit-btn");
const updateBtn = document.querySelector(".update-btn");
const taskContainer = document.querySelector(".task-container");
const overlay = document.querySelector(".overlay");
const editModal = document.querySelector(".modal");
const editTaskInput = document.querySelector(".task-edit-input");
const editTaskCompleted = document.querySelector(".task-edit-completed");

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

  // ============ Editing Task ============
  editTask();

  // ============ Deleting Task ============
  deleteTask();

  // ============ Close Modal ============
  const btnCloseModal = document.querySelector(".btn-close-modal");

  btnCloseModal.addEventListener("click", function (e) {
    e.preventDefault();
    closeEditModal();
  });
}

function createTodoEl(taskName, completedStatus) {
  const alert = document.querySelector(".alert");
  const taskHtml = `
  <div class="row task">
    <span class="task-name ${
      completedStatus ? "completed" : ""
    }">${taskName}</span>
    <div class="btn-container">
      <button type="submit" class="btn edit-btn">
        <i class="uil uil-edit"></i>
      </button>
      <button type="submit" class="btn delete-btn">
        <i class="uil uil-trash-alt"></i>
      </button>
    </div>
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

function editTask() {
  const editBtn = document.querySelectorAll(".edit-btn");

  editBtn.forEach((todo) =>
    todo.addEventListener("click", function (e) {
      let task = todo.parentNode.parentNode.firstElementChild;
      let taskText = task.innerHTML;
      let completed = task.classList.contains("completed");
      editTaskCompleted.checked = completed;
      editTaskInput.value = taskText;
      openEditModal();

      updateBtn.onclick = function (e) {
        e.preventDefault();
        // updating task
        task.textContent = editTaskInput.value;
        editTaskCompleted.checked === completed
          ? null
          : task.classList.toggle("completed");

        updateLocalStorage();
        closeEditModal();
      };
    })
  );
}

function deleteTask() {
  const delBtn = document.querySelectorAll(".delete-btn");

  delBtn.forEach((task) =>
    task.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.parentNode.remove();
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

function openEditModal() {
  editModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeEditModal() {
  editModal.classList.add("hidden");
  overlay.classList.add("hidden");
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
