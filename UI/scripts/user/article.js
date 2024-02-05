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

  const articles = JSON.parse(localStorage.getItem("articles"));
  const targetArticle = articles.filter(
    (article) => article.id === articleId
  )[0];

  articleTitleElement.textContent = targetArticle.title;
  articleDescriptionElement.textContent = targetArticle.description;
  articleCreatedDateElement.textContent = targetArticle.created_at;
  articleContentElement.innerHTML = targetArticle.content;

  const image = document.createElement("img");
  image.setAttribute("src", targetArticle.image);

  articleImageContainerElement.appendChild(image);
}

window.addEventListener("DOMContentLoaded", () => {
  const articleId = getArticleIdFromURL();

  if (!articleId) {
    location.href = "../";
  }

  loadArticle(articleId);
});
