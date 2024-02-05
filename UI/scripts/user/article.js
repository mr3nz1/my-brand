let articles;
let targetArticle;

function formatDate(date) {
  const options = { month: "short", day: "numeric", year: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function getArticleIdFromURL() {
  const hash = window.location.hash.substring(1); // Get the hash part excluding the '#'
  const params = new URLSearchParams(hash);

  // Assuming 'articleId' is the parameter you want to extract
  const articleId = params.get("articleId");

  return articleId;
}

function loadArticle(articleId) {
  const articleTitleElement = document.getElementById("articleTitle");
  const articleDescriptionElement = document.getElementById(
    "articleDescriptionElement"
  );
  const articleCreatedDateElement = document.getElementById("created_at");
  const articleContentElement = document.getElementById("article_text_content");
  const articleImageContainerElement = document.getElementById(
    "bannerImageContainer"
  );

  articles = JSON.parse(localStorage.getItem("articles"));
  targetArticle = articles.filter((article) => article.id === articleId)[0];

  articleTitleElement.textContent = targetArticle.title;
  articleDescriptionElement.textContent = targetArticle.description;
  articleCreatedDateElement.textContent = targetArticle.created_at;
  articleContentElement.innerHTML = targetArticle.content;

  const image = document.createElement("img");
  image.setAttribute("src", targetArticle.image);

  articleImageContainerElement.appendChild(image);
}

function loadComments() {
  const comments = JSON.parse(localStorage.getItem("comments"));
  const commentsForThisArticle = comments.filter(
    (comment) => comment.id === targetArticle.id
  );

  // const listOfComments = document.querySelector(".list_of_comments")

  // listOfComments.
}

function addComment(comment) {
  let comments = JSON.parse(localStorage.getItem("comments"));
  let updatedComments = [
    ...comments,
    { ...comment, articleId: targetArticle.id, created_at: formatDate(new Date()) },
  ];
  localStorage.setItem("comments", JSON.stringify(updatedComments));
}

window.addEventListener("DOMContentLoaded", () => {
  const articleId = getArticleIdFromURL();

  if (!articleId) {
    location.href = "../";
  }

  loadArticle(articleId);
});

const form = document.querySelector(".add-comment-container form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll(".add-comment-container form input");

  let comment = {};

  inputs.forEach((input) => {
    comment[input.name] = input.value;
  });

  addComment(comment);

  inputs.forEach((input) => {
    input.value = "";
  });
});
