var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createTaskRequest, deleteTaskRequest, getTasksRequest, } from "../requests/taskRequests.js";
import { initiateEditor } from "./editor.js";
function displayTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const tasks = yield getTasksRequest();
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
    });
}
function checkForErrors() {
    return __awaiter(this, void 0, void 0, function* () {
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
        if (errors.title !== "" || errors.content !== "") {
            return;
        }
        const status = yield createTaskRequest({ title, content });
        if (status) {
            const event = new Event("displayTasks");
            window.dispatchEvent(event);
            titleField.value = "";
            if (contentField) {
                contentField.innerHTML = "";
            }
        }
    });
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
    deleteBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        const status = yield deleteTaskRequest(id);
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
    }));
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
window.addEventListener("displayTasks", () => __awaiter(void 0, void 0, void 0, function* () {
    yield displayTasks();
    configureDeleteFeature();
}));
window.addEventListener("tasksLoaded", () => {
    initiateEditor();
    const event = new Event("displayTasks");
    window.dispatchEvent(event);
    const taskSubmitBtn = document.getElementById("task_submit_button");
    taskSubmitBtn === null || taskSubmitBtn === void 0 ? void 0 : taskSubmitBtn.addEventListener("click", () => {
        checkForErrors();
    });
});
