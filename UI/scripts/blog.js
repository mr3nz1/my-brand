const currentPage = localStorage.getItem("currentPage");

function deleteArticle(articleId) {
  if (
    confirm("Are you sure you want to delete article with ID: " + articleId)
  ) {
    let newArticles = articles.filter((article) => article.id !== articleId);

    localStorage.setItem("articles", newArticles);
    location.reload();
  }
}

window.addEventListener("pageChange", () => {
  console.log("blog");
  // if (currentPage === "blog") {
  const articles = JSON.parse(localStorage.getItem("articles"));
  const publishedArticlesContainer = document.getElementById(
    "published_articles_container"
  );

  let articlesContent = "";

  articles.forEach((article) => {
    articlesContent += `
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
              <span class="underline_on_hover article_update_btn">Update</span>
              <span class="dot_separator"></span>
              <span class="underline_on_hover article_delete_btn" id="${article.id}">Delete</span>
          </div>
      </div>
      <img class="article_img" src="${article.image}" alt="" />
      </div>`;
  });

  publishedArticlesContainer.innerHTML = articlesContent;

  window.addEventListener("loadedPage", () => {
  const deleteBtns = document.querySelectorAll(".article_delete_btn");
  // const articles = JSON.parse(localStorage.getItem("articles"));
  
    console.log(deleteBtns);
    deleteBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", () => {
        const articleId = deleteBtn.getAttribute("id");
        if (
          confirm(
            "Are you sure you want to delete article with ID: " + articleId
          )
        ) {
          let newArticles = articles.filter(
            (article) => article.id !== articleId
          );
  
          localStorage.setItem("articles", JSON.stringify(newArticles));
          location.reload();
        }
      });
    });
  });
  // }
});

// window.addEventListener("DOMContentLoaded", () => {
// });

export { deleteArticle };
