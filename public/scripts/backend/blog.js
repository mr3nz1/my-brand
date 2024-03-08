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
import { url } from "../utilities.js";
import { deleteArticleRequest } from "../requests/articleRequests.js";
const currentPage = localStorage.getItem("currentPage");
let articles;
let isModalOpen = false;
function deleteArticle(articleId) {
    const closeModal = document.querySelector(".close-modal");
    const modal = document.querySelector(".modal");
    const title = document.createElement("h2");
    const message = document.createElement("p");
    const deleteBtn = document.createElement("button");
    title.textContent = "Delete";
    message.textContent = "Want to delete article with id: " + articleId;
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("button");
    if (modal) {
        modal.children[0].appendChild(title);
        modal.children[0].appendChild(message);
        modal.children[0].appendChild(deleteBtn);
        modal.classList.add("modal-open");
        isModalOpen = true;
    }
    deleteBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        const status = yield deleteArticleRequest(articleId);
        if (modal && isModalOpen && status) {
            modal.children[0].removeChild(title);
            modal.children[0].removeChild(message);
            modal.children[0].removeChild(deleteBtn);
            modal.classList.remove("modal-open");
            isModalOpen = false;
        }
        const event = new Event("deletedArticle");
        window.dispatchEvent(event);
    }));
    closeModal === null || closeModal === void 0 ? void 0 : closeModal.addEventListener("click", () => {
        if (modal) {
            modal.children[0].removeChild(title);
            modal.children[0].removeChild(message);
            modal.children[0].removeChild(deleteBtn);
            modal.classList.remove("modal-open");
            isModalOpen = false;
        }
    });
}
function getArticles() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(url + "/articles/", {
            method: "GET",
        });
        if (res.status !== 200) {
            return false;
        }
        const dataJson = yield res.text();
        const data = JSON.parse(dataJson);
        return data.data.articles;
    });
}
function loadArticles() {
    return __awaiter(this, void 0, void 0, function* () {
        articles = yield getArticles();
        const unPublishedArticles = articles.filter((article) => article.isPublished !== true);
        const publishedArticles = articles.filter((article) => article.isPublished === true);
        const publishedArticlesContainer = document.getElementById("published_articles_container");
        const unPublishedArticlesContainer = document.getElementById("unpublished_articles_container");
        let publishedArticlesContent = "";
        let unPublishedArticlesContent = "";
        publishedArticles.forEach((article) => {
            publishedArticlesContent += `
    <div class="article_container">
      <div class="article_info_container">
        <h3 class=""><a class="underline_on_hover" href="./article.html">${article.title}</a></h3>
        <p>${article.description}</p>
        <div class="article_meta_data">
          <p>${article.created_at}</p>
          <span class="dot_separator"></span>
          <p>14 min read</p>
          <span class="dot_separator"></span>
          <div class="likes_description">
            <img src="../assets/icons/heart.png" alt="" />
            <p>83 likes</p>
          </div>
          <span class="dot_separator"></span>
          <span class="underline_on_hover article_update_btn" id="${article.id}">Update</span>
          <span class="dot_separator"></span>
          <span class="underline_on_hover article_delete_btn" id="${article.id}">Delete</span>
        </div>
      </div>
      <img class="article_img" src="${article.bannerImageUrl}" alt="" />
    </div>`;
        });
        unPublishedArticles.forEach((article) => {
            console.log(article);
            unPublishedArticlesContent += `
    <div class="article_container">
      <div class="article_info_container">
        <h3 class=""><a class="underline_on_hover" href="./article.html">${article.title}</a></h3>
        <p>${article.description}</p>
        <div class="article_meta_data">
          <p>Jan 2, 2024</p>
          <span class="dot_separator"></span>
          <p>14 min read</p>
          <span class="dot_separator"></span>
          <div class="likes_description">
            <img src="../assets/icons/heart.png" alt="" />
            <p>83 likes</p>
          </div>
          <span class="dot_separator"></span>
          <span class="underline_on_hover article_update_btn" id="${article.id}">Update</span>
          <span class="dot_separator"></span>
          <span class="underline_on_hover article_delete_btn" id="${article.id}">Delete</span>
        </div>
      </div>
      <img class="article_img" src="${article.bannerImageUrl}" alt="" />
    </div>`;
        });
        if (publishedArticlesContainer) {
            publishedArticlesContainer.innerHTML = publishedArticlesContent;
        }
        if (unPublishedArticlesContainer) {
            unPublishedArticlesContainer.innerHTML = unPublishedArticlesContent;
        }
        const event = new Event("configureBtns");
        dispatchEvent(event);
    });
}
const event = new Event("blogLoaded");
dispatchEvent(event);
function configureDeleteAndUpdateBtns() {
    const deleteBtns = document.querySelectorAll(".article_delete_btn");
    const updateBtns = document.querySelectorAll(".article_update_btn");
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", () => {
            const articleId = deleteBtn.getAttribute("id");
            if (!isModalOpen) {
                deleteArticle(articleId);
            }
        });
    });
    updateBtns.forEach((updateBtn) => {
        updateBtn.addEventListener("click", () => {
            const articleId = updateBtn.getAttribute("id");
            loadPage({ page: "update_article", articleId });
        });
    });
}
window.addEventListener("blogLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    yield loadArticles();
}));
window.addEventListener("deletedArticle", () => __awaiter(void 0, void 0, void 0, function* () {
    yield loadArticles();
}));
window.addEventListener("configureBtns", () => {
    configureDeleteAndUpdateBtns();
});
export { deleteArticle };
