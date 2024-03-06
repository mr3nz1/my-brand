import { loadPage } from "./script.js";

import { Article, Message, Task } from "../types.js";
import {
  deleteArticleRequest,
  getArticleRequest,
  getArticlesRequest,
} from "../requests/articleRequests.js";
import { getMessagesRequest } from "../requests/messageRequests.js";
import { getTasksRequest } from "../requests/taskRequests.js";
import { url } from "../utilities.js";

let articles: Article[];
let messages: Message[];
let tasks: Task[];
let isModalOpen: boolean;

async function loadStats() {
  const numberOfArticlesElement = document.getElementById(
    "number_of_articles_element"
  )!;
  const numberOfMessagesElement = document.getElementById(
    "number_of_messages_element"
  )!;
  const numberOfTasksElement = document.getElementById(
    "number_of_tasks_element"
  )!;

  if (!articles) {
    articles = await getArticlesRequest();
  }

  if (!messages) {
    messages = await getMessagesRequest();
  }

  if (!tasks) {
    tasks = await getTasksRequest();
  }

  console.log(articles);
  console.log(messages);
  console.log(tasks);

  numberOfArticlesElement.textContent = String(articles.length);
  numberOfMessagesElement.textContent = String(messages.length);
  numberOfTasksElement.textContent = String(tasks.length);
}

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
    isModalOpen = true;
  }

  deleteBtn.addEventListener("click", async () => {
    const status = await deleteArticleRequest(articleId);

    if (modal && isModalOpen && status) {
      modal.children[0].removeChild(title);
      modal.children[0].removeChild(message);
      modal.children[0].removeChild(deleteBtn);
      modal.classList.remove("modal-open");
      isModalOpen = false;
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
      isModalOpen = false;
    }
  });
}

window.addEventListener("homeLoaded", async () => {
  const unPublishedArticlesContainer = document.getElementById(
    "unpublished_articles_container"
  )!;

  if (!articles) {
    articles = await getArticlesRequest();
  }

  console.log(articles);
  console.log(messages);
  console.log(tasks);

  const unPublishedArticles = articles.filter(
    (article) => article.isPublished !== true
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
      <img class="article_img" src="http://13.60.34.0:3000/photos/${article.bannerImageUrl}" alt="" />
      </div>`;
  });
  unPublishedArticlesContainer.innerHTML = unPublishedArticlesContent;

  const deleteBtns = document.querySelectorAll(".article_delete_btn");
  const updateBtns = document.querySelectorAll(".article_update_btn");

  // listen to delete btns
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      const articleId = deleteBtn.getAttribute("id")!;
      deleteArticle(articleId);
    });
  });

  // listen to update btns
  updateBtns.forEach((updateBtn) => {
    updateBtn.addEventListener("click", () => {
      const articleId = updateBtn.getAttribute("id")!;
      loadPage({ page: "update_article", articleId });
    });
  });

  // load stats
  loadStats();
});
