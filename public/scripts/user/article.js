var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getArticleRequest, getArticlesRequest, } from "../requests/articleRequests.js";
import { createCommentRequest, getCommentRequest, } from "../requests/commentRequests.js";
import { formatDate } from "../utilities.js";
let targetArticle;
function getArticleIdFromURL() {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = window.location.hash.substring(1); // Get the hash part excluding the '#'
        const params = new URLSearchParams(hash);
        // Assuming 'articleId' is the parameter you want to extract
        const articleId = params.get("articleId");
        return articleId;
    });
}
function loadArticle(articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        const articleTitleElement = document.getElementById("articleTitle");
        const articleDescriptionElement = document.getElementById("articleDescriptionElement");
        const articleCreatedDateElement = document.getElementById("created_at");
        const articleContentElement = document.getElementById("article_text_content");
        const articleImageContainerElement = document.getElementById("bannerImageContainer");
        targetArticle = yield getArticleRequest(articleId);
        articleTitleElement.textContent = targetArticle.title;
        articleDescriptionElement.textContent = targetArticle.description;
        articleContentElement.innerHTML = targetArticle.content;
        const image = document.createElement("img");
        image.setAttribute("src", `${targetArticle.bannerImageUrl}`);
        articleImageContainerElement.appendChild(image);
        loadComments();
    });
}
function loadComments() {
    return __awaiter(this, void 0, void 0, function* () {
        const commentsForThisArticle = yield getCommentRequest(targetArticle.id);
        const listOfComments = document.querySelector(".list_of_comments");
        let commentsHtmlElements = "";
        commentsForThisArticle.forEach((comment) => {
            commentsHtmlElements += `<div class="comment">
    <div class="comment_content_container">
      <div class="message_user_image">
        <img src="https://dummyimage.com/500x500/e67e22/ffffff&text=${comment.name[0]}" alt="">
      </div>

      <div class="single_comment_text_container">
        <div class="single_comment_title_and_date">
          <h4>${comment.name}</h4>
          <p>${formatDate(comment.createdAt)}</p>
        </div>

        <p>
          ${comment.comment}
        </p>

        <div class="single_message_actions">
          <div class="underline_on_hover">
            <img src="../assets/icons/reply.png" alt="">
            <span>Reply</span>
          </div>

          <span class="dot_separator"></span>

          <div class="underline_on_hover">
            <img src="../assets/icons/like.png" alt="">
            <span>40 likes</span>
          </div>

          <span class="dot_separator"></span>

          <div class="underline_on_hover">
            <img src="../assets/icons/dislike.png" alt="">
          </div>
        </div>
      </div>

    </div>

  </div>`;
        });
        listOfComments.innerHTML = commentsHtmlElements;
    });
}
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
function addComment(comment) {
    return __awaiter(this, void 0, void 0, function* () {
        const status = yield createCommentRequest(comment);
        if (status) {
            loadComments();
        }
    });
}
window.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const articleId = yield getArticleIdFromURL();
    if (!articleId) {
        location.href = "../";
    }
    loadArticle(articleId);
    loadArticles();
}));
const form = document.querySelector(".article_comments form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(".article_comments form input");
    let comment = {
        articleId: targetArticle.id,
        comment: "",
        email: "",
        name: "",
    };
    inputs.forEach((input) => {
        comment[input.name] = input.value;
    });
    addComment(comment);
    inputs.forEach((input) => {
        input.value = "";
    });
});
