import { loadPage } from "./script.js";
import { initiateEditor } from "./editor.js";
import { Article } from "../types.js";

const currentPage: string | null = localStorage.getItem("currentPage");
let errors: { [key: string]: string } = {
  title: "",
  description: "",
  image: "",
  content: "",
};

function displayErrors(): void {
  const errorElements: NodeListOf<Element> = document.querySelectorAll(
    ".default_input_container .error"
  );

  errorElements.forEach((errorElement: Element) => {
    const type: string | null = errorElement.getAttribute("errorType");
    if (type) {
      errorElement.textContent = errors[type];
    }
  });
}

function generateUniqueId(): string {
  const timestamp: number = new Date().getTime();
  const randomPart: number = Math.floor(Math.random() * 1000);
  const uniqueId: string = `id_${timestamp}_${randomPart}`;
  return uniqueId;
}

function formatDate(date: string | number | Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
}

function saveContent(article: Article): void {
  let existingArticles: Article[] = JSON.parse(
    localStorage.getItem("articles") || "[]"
  );
  if (article.published) {
    article = {
      ...article,
      created_at: formatDate(new Date()),
    };
  }
  let articles: Article[];

  if (article.id) {
    existingArticles = existingArticles.filter((item) => {
      return item.id !== article.id;
    });
  }

  articles = [
    ...existingArticles,
    { ...article, id: article.id ? article.id : generateUniqueId() },
  ];

  localStorage.setItem("articles", JSON.stringify(articles));

  const modal: HTMLElement | null = document.querySelector(".modal");
  const message: HTMLParagraphElement = document.createElement("p");
  const closeModalBtn: HTMLElement | null =
    document.querySelector(".close-modal");

  if (modal) {
    if (article.published) {
      message.textContent = "Successfully Published";
      modal.children[0].appendChild(message);
    } else {
      message.textContent = "Successfully Saved";
      modal.children[0].appendChild(message);
    }

    modal.classList.add("modal-open");
  }

  if (closeModalBtn) {
    closeModalBtn.style.display = "none";
  }

  setTimeout(() => {
    if (modal) {
      modal.children[0].removeChild(message);
      modal.classList.remove("modal-open");
    }
    if (closeModalBtn) {
      closeModalBtn.style.display = "flex";
    }
  }, 5000);
  loadPage({ page: "blog" });
}
window.addEventListener("new_articleLoaded", (e: Event) => {
  initiateEditor();

  const saveBtn: HTMLElement | null =
    document.querySelector(".save_content_btn");
  const publishBtn: HTMLElement | null = document.querySelector(
    ".publish_article_btn"
  );
  const titleField: HTMLInputElement | null =
    document.querySelector(".title_input_field");
  const descriptionField: HTMLInputElement | null = document.querySelector(
    ".description_input_field"
  );
  const imageField: HTMLInputElement | null = document.querySelector(
    ".banner_image_input_field"
  );
  const contentField: HTMLElement | null =
    document.querySelector(".outputField");

  if (publishBtn) {
    publishBtn.addEventListener("click", () => {
      if (titleField && titleField.value === "") {
        errors.title = "Title is required";
      } else {
        errors.title = "";
      }

      if (descriptionField && descriptionField.value === "") {
        errors.description = "Description is required";
      } else {
        errors.description = "";
      }

      if (imageField && imageField.value === "") {
        errors.image = "Banner image is required";
      } else {
        errors.image = "";
      }

      if (contentField && contentField.children.length === 0) {
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
          title: titleField!.value,
          description: descriptionField!.value,
          content: contentField!.innerHTML,
          image: imageField!.value,
          published: true,
          id: "",
        });
      }
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      if (titleField && descriptionField && imageField && contentField) {
        saveContent({
          title: titleField.value,
          description: descriptionField.value,
          content: contentField.innerHTML,
          image: imageField.value,
          published: false,
          id: "",
        });
      }
    });
  }
});

export { errors, generateUniqueId, formatDate, saveContent, displayErrors };
