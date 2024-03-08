var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getArticlesRequest } from "../requests/articleRequests.js";
import { createMessageRequest } from "../requests/messageRequests.js";
import { formatDate } from "../utilities.js";
function loadArticles() {
    return __awaiter(this, void 0, void 0, function* () {
        let articles = yield getArticlesRequest();
        const articlesContainer = document.getElementById("articles_container");
        let articlesContent = "";
        articles.forEach((article) => {
            articlesContent += `
      <div class="article_container">
      <div class="article_info_container">
      <h3 class=""><a class="underline_on_hover" href="./article.html#articleId=${article.id}">${article.title}</a></h3>
      <p>
          ${article.description}
        </p>
        <div class="article_meta_data">
          <p>${formatDate(article.createdAt)}</p>
          <span class="dot_separator"></span>
          <p>14 min read</p>
          <span class="dot_separator"></span>
          <div class="likes_description">
            <img src="../assets/icons/heart.png" alt="" />
            <p>83 likes</p>
          </div>
        </div>
      </div>
      <img class="article_img" src="${article.bannerImageUrl}" alt="" />
    </div>`;
        });
        articlesContainer.innerHTML = articlesContent;
    });
}
let isModalOpen = false;
function openModal(text, error) {
    if (!isModalOpen) {
        const modal = document.querySelector(".modal");
        const modalCancelBtn = document.querySelector(".close-modal");
        const h2 = document.createElement("h2");
        h2.textContent = text;
        modal.children[0].appendChild(h2);
        modal.classList.add("modal-open");
        modalCancelBtn.style.display = "none";
        if (error) {
            h2.style.color = "#f44336";
        }
        isModalOpen = true;
        setTimeout(() => {
            modal.children[0].removeChild(h2);
            modal.classList.remove("modal-open");
            modalCancelBtn.style.display = "flex";
            isModalOpen = false;
        }, 5000);
    }
}
window.addEventListener("DOMContentLoaded", () => {
    const messageForm = document.getElementById("message_form");
    messageForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const inputs = Array.from(document.querySelectorAll(".default_input_field"));
        const data = {};
        inputs.forEach((input) => {
            const name = input.getAttribute("name");
            const value = input.value;
            data[name] = value;
        });
        let newMessage = Object.assign({}, data);
        const status = yield createMessageRequest(newMessage);
        if (status) {
            openModal("Thanks for you're message.", false);
        }
        else {
            openModal("Error sending message.", true);
        }
        inputs.forEach((input) => {
            input.value = "";
        });
    }));
    loadArticles();
});
