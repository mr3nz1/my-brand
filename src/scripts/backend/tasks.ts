import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
} from "../requests/taskRequests.js";
import { initiateEditor } from "./editor.js";

async function displayTasks() {
  const tasks = await getTasksRequest();

  const tasksContainerElement =
    document.querySelector<HTMLElement>(".tasks_container")!;

  let tasksContent = "";

  tasks.forEach((task: { title: string; content: string; id: string }) => {
    tasksContent += `
      <div class="task">
        <h3>${task.title}</h3>
        <div>
          ${task.content}
        </div>
        <span class="task-deleteBtn"  id="${task.id}" title="Delete task with id: ${task.id}"></span>
      </div>
    `;
  });

  tasksContainerElement.innerHTML = tasksContent;
}

async function checkForErrors() {
  const errorElements = document.querySelectorAll(".error");

  const titleField = document.getElementById("task_title") as HTMLInputElement;
  const contentField = document.querySelector(".outputField");
  type Error = {
    title: string;
    content: string;
  };

  let errors: Error = {
    title: "",
    content: "",
  };

  if (titleField.value === "") {
    errors.title = "Make sure you provide the task title";
  } else {
    errors.title = "";
  }

  if (contentField && contentField.children.length === 0) {
    errors.content = "make sure you provide the task content";
  } else {
    errors.content = "";
  }

  errorElements.forEach((errorElement) => {
    const errorType = errorElement.getAttribute("errorType") || "";
    errorElement.textContent = errors[errorType as keyof Error];
  });

  const title = titleField.value;
  const content = contentField ? contentField.innerHTML : "";

  // clean the input fields

  if (errors.title !== "" || errors.content !== "") {
    return;
  }

  const status = await createTaskRequest({ title, content });

  if (status) {
    const event = new Event("displayTasks");
    window.dispatchEvent(event);

    titleField.value = "";
    if (contentField) {
      contentField.innerHTML = "";
    }
  }
}

function deleteTask(id: string): void {
  const closeModal = document.querySelector(".close-modal");
  const modal = document.querySelector(".modal");
  const title = document.createElement("h2");
  const message = document.createElement("p");
  const deleteBtn = document.createElement("button");

  title.textContent = "Delete";
  message.textContent = "Want to delete the article with id: " + id;
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("button");
  if (modal) {
    modal.children[0].appendChild(title);
    modal.children[0].appendChild(message);
    modal.children[0].appendChild(deleteBtn);
    modal.classList.add("modal-open");
  }

  deleteBtn.addEventListener("click", async () => {
    const status = await deleteTaskRequest(id);

    if (status) {
      const event = new Event("displayTasks");

      if (modal) {
        modal.children[0].removeChild(title);
        modal.children[0].removeChild(message);
        modal.children[0].removeChild(deleteBtn);
        modal.classList.remove("modal-open");
      }

      window.dispatchEvent(event);
    }
  });

  closeModal?.addEventListener("click", () => {
    if (modal) {
      modal.children[0].removeChild(title);
      modal.children[0].removeChild(message);
      modal.children[0].removeChild(deleteBtn);
      modal.classList.remove("modal-open");
    }
  });
}

function configureDeleteFeature(): void {
  const tasksDeleteBtns =
    document.querySelectorAll<HTMLSpanElement>(".task-deleteBtn");

  tasksDeleteBtns.forEach((taskDeleteBtn) => {
    taskDeleteBtn.addEventListener("click", () => {
      const id = taskDeleteBtn.getAttribute("id");
      if (id) deleteTask(id);
    });
  });
}

window.addEventListener("displayTasks", async () => {
  await displayTasks();
  configureDeleteFeature();
});

window.addEventListener("tasksLoaded", () => {
  initiateEditor();
  const event = new Event("displayTasks");
  window.dispatchEvent(event);

  const taskSubmitBtn = document.getElementById("task_submit_button");

  taskSubmitBtn?.addEventListener("click", () => {
    checkForErrors();
  });
});
