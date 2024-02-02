import customLocalStorage from "./CustomLocalStorage.js";
import { loadPage } from "../../dashboard/script.js";
import { initiateEditor } from "./editor.js";

const currentPage = localStorage.getItem("currentPage");
let errors = {
  title: "",
  description: "",
  image: "",
  content: "",
};

function displayErrors() {
  const errorElements = document.querySelectorAll(
    ".default_input_container .error"
  );

  errorElements.forEach((errorElement) => {
    const type = errorElement.getAttribute("errorType");
    errorElement.textContent = errors[type];
  });
}

function generateUniqueId() {
  const timestamp = new Date().getTime();
  const randomPart = Math.floor(Math.random() * 1000); // Example: generate a random number between 0 and 999
  const uniqueId = `id_${timestamp}_${randomPart}`;

  return uniqueId;
}

function formatDate(date) {
  const options = { month: "short", day: "numeric", year: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function saveContent(article) {
  let existingArticles = JSON.parse(localStorage.getItem("articles"));
  if (article.published) {
    article = {
      ...article,
      created_at: formatDate(new Date()),
    };
  }
  let articles;
  if (article.id) {
    existingArticles = existingArticles.filter((item) => {
      console.log(item.id !== article.id);
      return item.id !== article.id;
    });
    console.log(existingArticles.length);
  }

  articles = [
    ...existingArticles,
    { ...article, id: article?.id ? article.id : generateUniqueId() },
  ];

  localStorage.setItem("articles", JSON.stringify(articles));

  if (article.published) {
    alert("Successfully Published");
  } else {
    alert("Successfully Saved");
  }
  loadPage({ page: "blog" });
}

window.addEventListener("new_articleLoaded", (e) => {
  // setup the rich text editor
  initiateEditor();

  const saveBtn = document.querySelector(".save_content_btn");
  const publishBtn = document.querySelector(".publish_article_btn");
  const titleField = document.querySelector(".title_input_field");
  const descriptionField = document.querySelector(".description_input_field");
  const imageField = document.querySelector(".banner_image_input_field");
  const contentField = document.querySelector(".outputField");

  publishBtn.addEventListener("click", () => {
    if (titleField.value === "") {
      errors.title = "Title is required";
    } else {
      errors.title = "";
    }

    if (descriptionField.value === "") {
      errors.description = "Description is required";
    } else {
      errors.description = "";
    }

    if (imageField.value === "") {
      errors.image = "Banner image is required";
    } else {
      errors.image = "";
    }

    if (contentField.children.length === 0) {
      errors.content = "Content is not supposed to be empty";
    } else {
      errors.content = "";
    }

    if (
      errors.title !== "" ||
      errors.description !== "" ||
      errors.content !== "" ||
      errors.image !== ""
    ) {
      displayErrors();
    } else {
      saveContent({
        title: titleField.value,
        description: descriptionField.value,
        content: contentField.innerHTML,
        image: imageField.value,
        published: true,
      });
    }
  });

  saveBtn.addEventListener("click", () => {
    saveContent({
      title: titleField.value,
      description: descriptionField.value,
      content: contentField.innerHTML,
      image: imageField.value,
      published: false,
    });
  });
});

export { errors, generateUniqueId, formatDate, saveContent, displayErrors };
