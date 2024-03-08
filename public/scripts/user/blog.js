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
function loadRecentArticles() {
    return __awaiter(this, void 0, void 0, function* () {
        let articlesJson = localStorage.getItem("articles");
        let articles = yield getArticlesRequest();
        const recentArticleContainer = document.getElementById("recent_articles_container");
        const moreArticlesContentContainer = document.getElementById("more_articles_container");
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
      <img class="article_img" src="${article.bannerImageUrl}" alt="" />
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
          <img class="article_img" src="${article.bannerImageUrl}" alt="" />
            </div>
  `;
        });
        recentArticleContainer.innerHTML = recentArticlesContent;
        moreArticlesContentContainer.innerHTML = moreArticlesContent;
    });
}
window.addEventListener("DOMContentLoaded", () => {
    loadRecentArticles();
});
