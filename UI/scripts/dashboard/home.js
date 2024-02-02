import { loadPage } from "../../dashboard/script.js";

window.addEventListener("homeLoaded", () => {
  const unPublishedArticlesContainer = document.getElementById(
    "unpublished_articles_container"
  );

  const articles = JSON.parse(localStorage.getItem("articles"));
  const unPublishedArticles = articles.filter(
    (article) => article.published !== true
  );

  let unPublishedArticlesContent = "";
  unPublishedArticles.forEach((article) => {
    unPublishedArticlesContent += `
    <div class="article_container">
    <div class="article_info_container">
          <h3 class=""><a class="underline_on_hover" href="./article.html">${article.title}</a>
          </h3>
          <p>
              ${article.description}
          </p>
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
      <img class="article_img" src="${article.image}" alt="" />
      </div>`;
  });
  unPublishedArticlesContainer.innerHTML = unPublishedArticlesContent;

  const deleteBtns = document.querySelectorAll(".article_delete_btn");
  const updateBtns = document.querySelectorAll(".article_update_btn");

  // listen to delete btns
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      const articleId = deleteBtn.getAttribute("id");
      if (
        confirm("Are you sure you want to delete article with ID: " + articleId)
      ) {
        let newArticles = articles.filter(
          (article) => article.id !== articleId
        );

        localStorage.setItem("articles", JSON.stringify(newArticles));
        location.reload();
      }
    });
  });

  // listen to update btns
  updateBtns.forEach((updateBtn) => {
    updateBtn.addEventListener("click", () => {
      const articleId = updateBtn.getAttribute("id");
      loadPage({ page: "update_article", articleId });
    });
  });
});
