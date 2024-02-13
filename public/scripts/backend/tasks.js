import { initiateEditor } from "./editor.js";
function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomPart = Math.floor(Math.random() * 1000);
    const uniqueId = `id_${timestamp}_${randomPart}`;
    return uniqueId;
}
function formatDate(date) {
    const options = {
        month: "short",
        day: "numeric",
        year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
}
function addTask(title, content) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = [
        {
            title: title,
            content: content,
            id: generateUniqueId(),
            created_at: formatDate(new Date()),
        },
        ...tasks,
    ];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    const event = new Event("displayTasks");
    window.dispatchEvent(event);
}
function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const tasksContainerElement = document.querySelector(".tasks_container");
    let tasksContent = "";
    tasks.forEach((task) => {
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
    }
    else {
        errors.title = "";
    }
    if (contentField && contentField.children.length === 0) {
        errors.content = "make sure you provide the task content";
    }
    else {
        errors.content = "";
    }
    errorElements.forEach((errorElement) => {
        const errorType = errorElement.getAttribute("errorType") || "";
        errorElement.textContent = errors[errorType];
    });
    const title = titleField.value;
    const content = contentField ? contentField.innerHTML : "";
    // clean the input fields
    titleField.value = "";
    if (contentField) {
        contentField.innerHTML = "";
    }
    if (errors.title !== "" || errors.content !== "") {
        return;
    }
    addTask(title, content);
}
function deleteTask(id) {
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
    deleteBtn.addEventListener("click", () => {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const updatedTasks = tasks.filter((task) => id !== task.id);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        const event = new Event("displayTasks");
        if (modal) {
            modal.children[0].removeChild(title);
            modal.children[0].removeChild(message);
            modal.children[0].removeChild(deleteBtn);
            modal.classList.remove("modal-open");
        }
        window.dispatchEvent(event);
    });
    closeModal === null || closeModal === void 0 ? void 0 : closeModal.addEventListener("click", () => {
        if (modal) {
            modal.children[0].removeChild(title);
            modal.children[0].removeChild(message);
            modal.children[0].removeChild(deleteBtn);
            modal.classList.remove("modal-open");
        }
    });
}
function configureDeleteFeature() {
    const tasksDeleteBtns = document.querySelectorAll(".task-deleteBtn");
    tasksDeleteBtns.forEach((taskDeleteBtn) => {
        taskDeleteBtn.addEventListener("click", () => {
            const id = taskDeleteBtn.getAttribute("id");
            if (id)
                deleteTask(id);
        });
    });
}
window.addEventListener("displayTasks", () => {
    displayTasks();
    configureDeleteFeature();
});
window.addEventListener("tasksLoaded", () => {
    initiateEditor();
    const event = new Event("displayTasks");
    window.dispatchEvent(event);
    const taskSubmitBtn = document.getElementById("task_submit_button");
    taskSubmitBtn === null || taskSubmitBtn === void 0 ? void 0 : taskSubmitBtn.addEventListener("click", () => {
        checkForErrors();
    });
});
