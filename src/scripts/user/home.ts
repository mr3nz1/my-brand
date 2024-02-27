import { Article } from "../types.js";
import { formatDate } from "../utilities.js";

function generateUniqueId() {
  const timestamp = new Date().getTime();
  const randomPart = Math.floor(Math.random() * 1000); // Example: generate a random number between 0 and 999
  const uniqueId = `id_${timestamp}_${randomPart}`;

  return uniqueId;
}

function loadArticles() {
  let articles: Article[];
  let articlesJson = localStorage.getItem("articles");

  if (articlesJson) {
    articles = JSON.parse(articlesJson).slice(0, 4);
  } else {
    articles = [];
  }

  const articlesContainer = document.getElementById("articles_container")!;

  let articlesContent = "";

  articles.forEach((article) => {
    articlesContent += `
      <div class="article_container">
      <div class="article_info_container">
        <h3 class="">${article.title}</h3>
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
    </div>`;
  });

  articlesContainer.innerHTML = articlesContent;
}

let isModalOpen = false;

function openModal() {
  if (!isModalOpen) {
    const modal = document.querySelector(".modal")!;
    const modalCancelBtn =
      document.querySelector<HTMLDivElement>(".close-modal")!;

    const h2 = document.createElement("h2");
    h2.textContent = "Thanks for you're message.";
    modal.children[0].appendChild(h2);
    modal.classList.add("modal-open");
    modalCancelBtn.style.display = "none";

    isModalOpen = true;

    setTimeout(() => {
      modal.children[0].removeChild(h2);
      modal.classList.remove("modal-open");
      modalCancelBtn.style.display = "flex";
      isModalOpen = false;
    }, 5000);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const messageForm = document.getElementById("message_form")!;

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs: HTMLInputElement[] = Array.from(
      document.querySelectorAll(".default_input_field")
    );
    const data: { [key: string]: any } = {};
    inputs.forEach((input) => {
      const name = input.getAttribute("name")!;
      const value = input.value;
      data[name] = value;
    });

    let messages = JSON.parse(localStorage.getItem("messages")!);

    if (!messages) {
      messages = [];
    }

    let newMessages = [
      ...messages,
      {
        ...data,
        id: generateUniqueId(),
        created_at: formatDate(new Date()),
      },
    ];
    localStorage.setItem("messages", JSON.stringify(newMessages));

    inputs.forEach((input) => {
      input.value = "";
    });

    openModal();
  });

  loadArticles();
});
