import { initiateEditor } from "./editor.js ";

function generateUniqueId() {
  const timestamp = new Date().getTime();
  const randomPart = Math.floor(Math.random() * 1000); // Example: generate a random number between 0 and 999
  const uniqueId = `id_${timestamp}_${randomPart}`;

  return uniqueId;
}

function formatDate(date) {
  const options = { month: "short", day: "numeric", year: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function addTask(title, content) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  const updatedTasks = [
    {
      title: title,
      content: content,
      id: generateUniqueId(),
      created_at: formatDate(new Date()),
    },
    ...tasks,
  ];

  console.log(updatedTasks);

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  const event = new Event("displayTasks");

  return dispatchEvent(event);
}

function displayTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  const tasksContainerElement = document.querySelector(".tasks_container");

  let tasksContent = "";

  tasks.forEach((task) => {
    tasksContent += `
      <div class="task" id=${task.id}>
        <h3>${task.title}</h3>
        <div>
          ${task.content}
        </div>
      </div>
    `;
  });

  console.log(tasks);

  tasksContainerElement.innerHTML = tasksContent;
}

function checkForErrors() {
  const errorElements = document.querySelectorAll(".error");

  const titleField = document.getElementById("task_title");
  const contentField = document.querySelector(".outputField");
  let errors = {
    title: "",
    content: "",
  };

  if (titleField.value === "") {
    errors.title = "Make sure you provide the task title";
  } else {
    errors.title = "";
  }

  if (contentField.children.length === 0) {
    errors.content = "make sure you provide the task content";
  } else {
    errors.content = "";
  }

  errorElements.forEach((errorElement) => {
    const errorType = errorElement.getAttribute("errorType");
    errorElement.textContent = errors[errorType];
  });

  const title = titleField.value;
  const content = contentField.innerHTML;

  // clean the input fields
  titleField.value = "";
  contentField.innerHTML = "";

  if (errors.title !== "" || errors.content !== "") {
    return;
  }
  
  return addTask(title, content);
}

function deleteTask(id) {
  if (confirm("Are you sure you want to delete article with id: " + id)) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    const updatedTasks = tasks.filter((task) => id !== task.id);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    const event = new Event("displayTasks");

    return dispatchEvent(event);
  }
  return;
}

function configureDeleteFeature() {
  const tasks = document.querySelectorAll(".task");

  tasks.forEach((task) => {
    task.addEventListener("dblclick", () => {
      const id = task.getAttribute("id");
      deleteTask(id);
    });
  });
}

window.addEventListener("displayTasks", () => {
  displayTasks();
  configureDeleteFeature();
});

window.addEventListener("tasksLoaded", () => {
  // initiateRichText Editor
  initiateEditor();
  const event = new Event("displayTasks");
  dispatchEvent(event);

  const taskSubmitBtn = document.getElementById("task_submit_button");

  taskSubmitBtn.addEventListener("click", () => {
    checkForErrors();
  });
});
