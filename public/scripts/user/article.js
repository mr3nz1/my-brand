import { formatDate } from "../utilities.js";
let articles = [];
let targetArticle;
function getArticleIdFromURL() {
    const hash = window.location.hash.substring(1); // Get the hash part excluding the '#'
    const params = new URLSearchParams(hash);
    // Assuming 'articleId' is the parameter you want to extract
    const articleId = params.get("articleId");
    return articleId;
}
function loadArticle(articleId) {
    const articleTitleElement = document.getElementById("articleTitle");
    const articleDescriptionElement = document.getElementById("articleDescriptionElement");
    const articleCreatedDateElement = document.getElementById("created_at");
    const articleContentElement = document.getElementById("article_text_content");
    const articleImageContainerElement = document.getElementById("bannerImageContainer");
    let articlesJson = localStorage.getItem("articles");
    if (articlesJson) {
        articles = JSON.parse(articlesJson);
    }
    else {
        articles = [];
    }
    targetArticle = articles.filter((article) => article.id === articleId)[0];
    articleTitleElement.textContent = targetArticle.title;
    articleDescriptionElement.textContent = targetArticle.description;
    if (articleId !== undefined) {
        targetArticle = articles.filter((article) => article.id === articleId)[0];
    }
    articleContentElement.innerHTML = targetArticle.content;
    const image = document.createElement("img");
    image.setAttribute("src", targetArticle.image);
    articleImageContainerElement.appendChild(image);
    loadComments();
}
function loadComments() {
    const commentsJson = localStorage.getItem("comments");
    let comments;
    if (commentsJson) {
        comments = JSON.parse(commentsJson);
    }
    else {
        comments = [];
    }
    const commentsForThisArticle = comments.filter((comment) => comment.articleId === targetArticle.id);
    const listOfComments = document.querySelector(".list_of_comments");
    let commentsHtmlElements = "";
    commentsForThisArticle.forEach((comment) => {
        commentsHtmlElements += `<div class="comment">
    <div class="comment_content_container">
      <div class="message_user_image">
        <img src="../assets/images/sandra.jpg" alt="">
      </div>

      <div class="single_comment_text_container">
        <div class="single_comment_title_and_date">
          <h4>${comment.fullName}</h4>
          <p>${comment.created_at}</p>
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
}
function addComment(comment) {
    let commentsJson = localStorage.getItem("comments");
    let comments = [];
    if (commentsJson) {
        comments = JSON.parse(commentsJson);
    }
    else {
        comments = [];
    }
    let updatedComments = [
        ...comments,
        Object.assign(Object.assign({}, comment), { articleId: targetArticle.id, created_at: formatDate(new Date()) }),
    ];
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    loadComments();
}
window.addEventListener("DOMContentLoaded", () => {
    const articleId = getArticleIdFromURL();
    if (!articleId) {
        location.href = "../";
    }
    loadArticle(articleId);
});
const form = document.querySelector(".article_comments form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(".article_comments form input");
    let comment = {
        articleId: "", // Initialize all properties
        comment: "",
        created_at: "",
        email: "",
        fullName: "",
    };
    inputs.forEach((input) => {
        comment[input.name] = input.value;
    });
    addComment(comment);
    inputs.forEach((input) => {
        input.value = "";
    });
});
