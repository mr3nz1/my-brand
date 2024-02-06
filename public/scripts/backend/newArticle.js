import { loadPage } from "./script.js";
import { initiateEditor } from "./editor.js";
const currentPage = localStorage.getItem("currentPage");
let errors = {
    title: "",
    description: "",
    image: "",
    content: "",
};
function displayErrors() {
    const errorElements = document.querySelectorAll(".default_input_container .error");
    errorElements.forEach((errorElement) => {
        const type = errorElement.getAttribute("errorType");
        if (type) {
            errorElement.textContent = errors[type];
        }
    });
}
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
function saveContent(article) {
    let existingArticles = JSON.parse(localStorage.getItem("articles") || "[]");
    if (article.published) {
        article = Object.assign(Object.assign({}, article), { created_at: formatDate(new Date()) });
    }
    let articles;
    if (article.id) {
        existingArticles = existingArticles.filter((item) => {
            return item.id !== article.id;
        });
    }
    articles = [
        ...existingArticles,
        Object.assign(Object.assign({}, article), { id: article.id ? article.id : generateUniqueId() }),
    ];
    localStorage.setItem("articles", JSON.stringify(articles));
    const modal = document.querySelector(".modal");
    const message = document.createElement("p");
    const closeModalBtn = document.querySelector(".close-modal");
    if (modal) {
        if (article.published) {
            message.textContent = "Successfully Published";
            modal.children[0].appendChild(message);
        }
        else {
            message.textContent = "Successfully Saved";
            modal.children[0].appendChild(message);
        }
        modal.classList.add("modal-open");
    }
    if (closeModalBtn) {
        closeModalBtn.style.display = "none";
    }
    setTimeout(() => {
        if (modal) {
            modal.classList.remove("modal-open");
        }
        if (closeModalBtn) {
            closeModalBtn.style.display = "flex";
        }
    }, 5000);
    loadPage({ page: "blog" });
}
window.addEventListener("new_articleLoaded", (e) => {
    initiateEditor();
    const saveBtn = document.querySelector(".save_content_btn");
    const publishBtn = document.querySelector(".publish_article_btn");
    const titleField = document.querySelector(".title_input_field");
    const descriptionField = document.querySelector(".description_input_field");
    const imageField = document.querySelector(".banner_image_input_field");
    const contentField = document.querySelector(".outputField");
    if (publishBtn) {
        publishBtn.addEventListener("click", () => {
            if (titleField && titleField.value === "") {
                errors.title = "Title is required";
            }
            else {
                errors.title = "";
            }
            if (descriptionField && descriptionField.value === "") {
                errors.description = "Description is required";
            }
            else {
                errors.description = "";
            }
            if (imageField && imageField.value === "") {
                errors.image = "Banner image is required";
            }
            else {
                errors.image = "";
            }
            if (contentField && contentField.children.length === 0) {
                errors.content = "Content is not supposed to be empty";
            }
            else {
                errors.content = "";
            }
            if (errors.title !== "" ||
                errors.description !== "" ||
                errors.content !== "" ||
                errors.image !== "") {
                displayErrors();
            }
            else {
                saveContent({
                    title: titleField.value,
                    description: descriptionField.value,
                    content: contentField.innerHTML,
                    image: imageField.value,
                    published: true,
                    id: "",
                });
            }
        });
    }
    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            if (titleField && descriptionField && imageField && contentField) {
                saveContent({
                    title: titleField.value,
                    description: descriptionField.value,
                    content: contentField.innerHTML,
                    image: imageField.value,
                    published: false,
                    id: "",
                });
            }
        });
    }
});
export { errors, generateUniqueId, formatDate, saveContent, displayErrors };
