import { Article } from "../types.js";

function loadRecentArticles() {
  let articlesJson = localStorage.getItem("articles");
  let articles: Article[] = [];

  if (articlesJson) {
    articles = JSON.parse(articlesJson);
  }
  const recentArticleContainer = document.getElementById(
    "recent_articles_container"
  )!;
  const moreArticlesContentContainer = document.getElementById(
    "more_articles_container"
  )!;

  let recentArticlesContent = "";
  let moreArticlesContent = "";

  [...articles.slice(0, 4)].forEach((article) => {
    recentArticlesContent += `
      <div class="article_container" class="article_meta_data">
      <div class="article_info_container">
        <h3 class=""><a class="underline_on_hover" href="./article.html#articleId=${article.id}">${article.title}</a></h3>
        <p>
          ${article.description}
        </p>
        <div class="article_meta_data">
          <p>${article.created_at}</p>
          <span class="dot_separator"></span>
          <p>14 min read</p>
          <span class="dot_separator"></span>
          <div class="likes_description">
            <img src="../assets/icons/heart.png" alt="" />
            <p>83 likes</p>
          </div>
        </div>
      </div>
      <img class="article_img" src="${article.image}" alt="" />
    </div>
      `;
  });

  articles.forEach((article) => {
    moreArticlesContent += `        <div class="article_container" class="article_meta_data">
          <div class="article_info_container">
            <h3 class=""><a class="underline_on_hover" href="./article.html#articleId=${article.id}">${article.title}</a></h3>
            <p>
              ${article.description}
            </p>
            <div class="article_meta_data">
              <p>${article.created_at}</p>
              <span class="dot_separator"></span>
              <p>14 min read</p>
              <span class="dot_separator"></span>
              <div class="likes_description">
                <img src="../assets/icons/heart.png" alt="" />
                <p>83 likes</p>
              </div>
            </div>
          </div>
          <img class="article_img" src="${article.image}" alt="" />
        </div>
  `;
  });

  recentArticleContainer.innerHTML = recentArticlesContent;
  moreArticlesContentContainer.innerHTML = moreArticlesContent;
}

window.addEventListener("DOMContentLoaded", () => {
  loadRecentArticles();
});
