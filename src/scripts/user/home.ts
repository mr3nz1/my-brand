import { getArticlesRequest } from "../requests/articleRequests.js";
import { Article } from "../types.js";
import { formatDate, url } from "../utilities.js";

async function loadArticles() {
  let articles: Article[] = await getArticlesRequest();

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
          <p>${formatDate(article.createdAt)}</p>
          <span class="dot_separator"></span>
          <p>14 min read</p>
          <span class="dot_separator"></span>
          <div class="likes_description">
            <img src="../assets/icons/heart.png" alt="" />
            <p>83 likes</p>
          </div>
        </div>
      </div>
      <img class="article_img" src="http://13.60.34.0:3000/photos/${
        article.bannerImageUrl
      }" alt="" />
    </div>`;
  });

  articlesContainer.innerHTML = articlesContent;
}

async function comment(message: object) {
  try {
    const res = await fetch(url + "/messages/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (res.status === 201) {
      let data = await res.text();
      data = JSON.parse(data);
      return true;
    } else {
      false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

let isModalOpen = false;

function openModal(text: string, error: boolean) {
  if (!isModalOpen) {
    const modal = document.querySelector(".modal")!;
    const modalCancelBtn =
      document.querySelector<HTMLDivElement>(".close-modal")!;

    const h2 = document.createElement("h2");
    h2.textContent = text;
    modal.children[0].appendChild(h2);
    modal.classList.add("modal-open");
    modalCancelBtn.style.display = "none";

    if (error) {
      h2.style.color = "#f44336";
    }

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

  messageForm.addEventListener("submit", async (e) => {
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

    let newMessage = {
      ...data,
    };

    const status = await comment(newMessage);

    if (status) {
      openModal("Thanks for you're message.", false);
    } else {
      openModal("Error sending message.", true);
    }

    inputs.forEach((input) => {
      input.value = "";
    });
  });

  loadArticles();
});
