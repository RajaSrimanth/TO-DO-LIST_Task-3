const inputBox = document.getElementById("input-box");
const fcount = document.getElementById("completed-counter");
const unfcount = document.getElementById("uncompleted-counter");
const listContainer = document.getElementById("list-container");


function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("You haven't entered any task..Please write down a task!!");
    console.log("No task added");
    return;
  }

  function updateCounters() {
    const ftasks = document.querySelectorAll(".completed").length;
    const unftasks = document.querySelectorAll("li:not(.completed)").length;
    fcount.textContent = ftasks;
    unfcount.textContent = unftasks;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
    `;

  listContainer.appendChild(li);

  inputBox.value = " ";

  const cbox = li.querySelector("input");
  const ebutton = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector("span");
  const delbutton = li.querySelector(".delete-btn");

  cbox.addEventListener("click", function () {
    li.classList.toggle("completed", cbox.checked);
    updateCounters();
  });

  ebutton.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null) {
      taskSpan.textContent = update;
      li.classList.remove("completed");
      cbox.checked = false;
      updateCounters();
    }
  });

  delbutton.addEventListener("click", function () {
    if (confirm("Do you want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });
  updateCounters();
}

inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});