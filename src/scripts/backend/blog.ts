import { loadPage } from "./script.js";

const currentPage: string | null = localStorage.getItem("currentPage");
let articles: Article[];

type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  published: boolean;
  created_at?: string;
};

function deleteArticle(articleId: string): void {
  const closeModal: HTMLElement | null = document.querySelector(".close-modal");
  const modal: HTMLElement | null = document.querySelector(".modal");
  const title: HTMLHeadingElement = document.createElement("h2");
  const message: HTMLParagraphElement = document.createElement("p");
  const deleteBtn: HTMLButtonElement = document.createElement("button");

  title.textContent = "Delete";
  message.textContent = "Want to delete article with id: " + articleId;
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("button");
  if (modal) {
    modal.children[0].appendChild(title);
    modal.children[0].appendChild(message);
    modal.children[0].appendChild(deleteBtn);
    modal.classList.add("modal-open");
  }

  deleteBtn.addEventListener("click", () => {
    articles = JSON.parse(localStorage.getItem("articles") || "[]");
    let newArticles = articles.filter((article) => article.id !== articleId);

    localStorage.setItem("articles", JSON.stringify(newArticles));

    if (modal) {
      modal.children[0].removeChild(title);
      modal.children[0].removeChild(message);
      modal.children[0].removeChild(deleteBtn);
    }

    const event = new Event("deletedArticle");
    window.dispatchEvent(event);
  });

  closeModal?.addEventListener("click", () => {
    if (modal) {
      modal.children[0].removeChild(title);
      modal.children[0].removeChild(message);
      modal.children[0].removeChild(deleteBtn);
      modal.classList.remove("modal-open");
    }
  });
}

function loadArticles(): void {
  articles = JSON.parse(localStorage.getItem("articles") || "[]");

  const publishedArticles = articles.filter(
    (article) => article.published === true
  );
  const unPublishedArticles = articles.filter(
    (article) => article.published !== true
  );

  const publishedArticlesContainer: HTMLElement | null =
    document.getElementById("published_articles_container");
  const unPublishedArticlesContainer: HTMLElement | null =
    document.getElementById("unpublished_articles_container");

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
      <img class="article_img" src="${article.image}" alt="" />
    </div>`;
  });

  unPublishedArticles.forEach((article) => {
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
      <img class="article_img" src="${article.image}" alt="" />
    </div>`;
  });

  if (publishedArticlesContainer) {
    publishedArticlesContainer.innerHTML = publishedArticlesContent;
  }
  if (unPublishedArticlesContainer) {
    unPublishedArticlesContainer.innerHTML = unPublishedArticlesContent;
  }
}

function configureDeleteAndUpdateBtns(): void {
  const deleteBtns = document.querySelectorAll(".article_delete_btn");
  const updateBtns = document.querySelectorAll(".article_update_btn");

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      const articleId = deleteBtn.getAttribute("id")!;
      deleteArticle(articleId);
    });
  });

  updateBtns.forEach((updateBtn) => {
    updateBtn.addEventListener("click", () => {
      const articleId = updateBtn.getAttribute("id")!;
      loadPage({ page: "update_article", articleId });
    });
  });
}

window.addEventListener("blogLoaded", () => {
  loadArticles();
  configureDeleteAndUpdateBtns();
});

window.addEventListener("deletedArticle", () => {
  loadArticles();
  configureDeleteAndUpdateBtns();
});

export { deleteArticle };
