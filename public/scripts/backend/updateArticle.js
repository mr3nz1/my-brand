var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loadPage } from "./script.js";
import { initiateEditor } from "./editor.js";
import { displayErrors, errors } from "./newArticle.js";
import { getArticleRequest, updateArticleRequest, } from "../requests/articleRequests.js";
let articleId;
function alert(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const modal = document.querySelector(".modal");
        const message = document.createElement("p");
        const closeModalBtn = document.querySelector(".close-modal");
        if (modal) {
            message.textContent = content;
            modal.children[0].appendChild(message);
            modal.classList.add("modal-open");
        }
        if (closeModalBtn) {
            closeModalBtn.style.display = "none";
        }
        setTimeout(() => {
            if (modal) {
                modal.children[0].removeChild(message);
                modal.classList.remove("modal-open");
            }
            if (closeModalBtn) {
                closeModalBtn.style.display = "flex";
            }
        }, 5000);
    });
}
function updateContent(article) {
    return __awaiter(this, void 0, void 0, function* () {
        let articleDataForm = new FormData();
        Object.keys(article).forEach((key) => __awaiter(this, void 0, void 0, function* () {
            let value = article[key];
            if (value instanceof File) {
                articleDataForm.append(key, value);
            }
            else {
                articleDataForm.set(key, value);
            }
        }));
        for (let pair of articleDataForm.entries()) {
            console.log(pair[0] + " " + pair[1]);
        }
        const status = yield updateArticleRequest(articleId, articleDataForm);
        if (status) {
            if (article.isPublished) {
                alert("Update article published");
            }
            else {
                alert("Updated article successfully saved");
            }
            loadPage({ page: "blog" });
        }
        else {
            alert("Error creating article");
        }
    });
}
window.addEventListener("update_articleLoaded", (e) => __awaiter(void 0, void 0, void 0, function* () {
    // set up the editor
    initiateEditor();
    articleId = e.articleId;
    const saveBtn = document.querySelector(".save_content_btn");
    const publishBtn = document.querySelector(".publish_article_btn");
    const titleField = document.querySelector(".title_input_field");
    const descriptionField = document.querySelector(".description_input_field");
    const imageField = document.querySelector(".banner_image_input_field");
    const contentField = document.querySelector(".outputField");
    if (!articleId) {
        return loadPage({ page: "blog" });
    }
    const articleToUpdate = yield getArticleRequest(articleId);
    if (articleToUpdate) {
        titleField.value = articleToUpdate.title;
        descriptionField.value = articleToUpdate.description;
        contentField.innerHTML = articleToUpdate.content;
        publishBtn.addEventListener("click", () => {
            var _a;
            if (titleField.value === "") {
                errors.title = "Title is required";
            }
            else {
                errors.title = "";
            }
            if (descriptionField.value === "") {
                errors.description = "Description is required";
            }
            else {
                errors.description = "";
            }
            if (imageField.value === "") {
                errors.image = "Banner image is required";
            }
            else {
                errors.image = "";
            }
            if (contentField.children.length === 0) {
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
                updateContent({
                    title: titleField.value,
                    description: descriptionField.value,
                    content: contentField.innerHTML,
                    bannerImage: (_a = imageField.files) === null || _a === void 0 ? void 0 : _a[0],
                    isPublished: true,
                });
            }
        });
        saveBtn.addEventListener("click", () => {
            var _a;
            updateContent({
                title: titleField.value,
                description: descriptionField.value,
                content: contentField.innerHTML,
                bannerImage: (_a = imageField.files) === null || _a === void 0 ? void 0 : _a[0],
                isPublished: false,
            });
        });
    }
}));
