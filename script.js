"use strict";

const submitBtn = document.querySelector(".submit-btn");
const taskContainer = document.querySelector(".task-container");

// ============ Adding Task ============
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // Look to see if bad practice
  let taskInput = document.querySelector(".form-input").value;
  const alert = document.querySelector(".alert");

  const taskHtml = `<div class="row task">
  <span class="task-name">${taskInput}</span>
  <button type="submit" class="btn delete-btn">
  <i class="uil uil-trash-alt"></i>
  </button>
  </div>`;

  if (taskInput.length == 0) {
    alert.textContent = "please enter a to-do";
    // showing alert text
    alert.classList.add("alert-danger");
  } else {
    taskContainer.insertAdjacentHTML("afterbegin", taskHtml);
    // removing alert text
    alert.classList.remove("alert-danger");
  }

  // ============ Clearing input field ============
  document.querySelector(".form-input").value = "";

  // ============ Completing Task ============
  // const task = document.querySelectorAll(".task");
  // task.forEach((task) =>
  //   task.addEventListener("click", function (e) {
  //     this.classList.add("completed");
  //     // Check for bug: some elements don't click or click 3-4 times
  //   })
  // );
  const task = document.querySelectorAll(".task-name");
  task.forEach(
    (task) =>
      (task.onclick = function () {
        this.classList.toggle("completed");
      })
  );
  // Check for bug: some elements don't click or click 3-4 times

  // var tasks = document.querySelectorAll(".task");
  // for (var i = 0; i < tasks.length; i++) {
  //   tasks[i].onclick = function () {
  //     this.classList.toggle("completed");
  //   };
  // }

  //   Try using event propogation if fit

  // ============ Deleting Task ============
  const delBtn = document.querySelectorAll(".delete-btn");
  delBtn.forEach((task) =>
    task.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.remove();
    })
  );
});
