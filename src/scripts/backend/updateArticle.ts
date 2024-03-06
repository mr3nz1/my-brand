import { loadPage } from "./script.js";
import { initiateEditor } from "./editor.js";
import { displayErrors, errors, saveContent } from "./newArticle.js";
import { Article } from "../types.js";
import { url } from "../utilities.js";
import {
  getArticleRequest,
  updateArticleRequest,
} from "../requests/articleRequests.js";

interface CustomEvent extends Event {
  articleId: string;
}
let articleId: string;

async function alert(content: string) {
  const modal: HTMLElement | null = document.querySelector(".modal");
  const message: HTMLParagraphElement = document.createElement("p");
  const closeModalBtn: HTMLElement | null =
    document.querySelector(".close-modal");

  if (modal) {
    message.textContent = content;
    modal.children[0].appendChild(message);
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
}

async function updateContent(article: Article) {
  let articleDataForm = new FormData();

  Object.keys(article).forEach(async (key) => {
    let value = article[key];

    if (value instanceof File) {
      articleDataForm.append(key, value);
    } else {
      articleDataForm.set(key, value);
    }
  });

  for (let pair of articleDataForm.entries()) {
    console.log(pair[0] + " " + pair[1]);
  }
  const status = await updateArticleRequest(articleId, articleDataForm);

  if (status) {
    if (article.isPublished) {
      alert("Update article published");
    } else {
      alert("Updated article successfully saved");
    }
    loadPage({ page: "blog" });
  } else {
    alert("Error creating article");
  }
}

window.addEventListener(
  "update_articleLoaded" as any,
  async (e: CustomEvent) => {
    // set up the editor
    initiateEditor();

    articleId = e.articleId;
    const saveBtn = document.querySelector(
      ".save_content_btn"
    ) as HTMLInputElement;
    const publishBtn = document.querySelector(
      ".publish_article_btn"
    ) as HTMLButtonElement;
    const titleField = document.querySelector(
      ".title_input_field"
    ) as HTMLInputElement;
    const descriptionField = document.querySelector(
      ".description_input_field"
    ) as HTMLInputElement;
    const imageField = document.querySelector(
      ".banner_image_input_field"
    ) as HTMLInputElement;
    const contentField = document.querySelector(
      ".outputField"
    ) as HTMLDivElement;

    if (!articleId) {
      return loadPage({ page: "blog" });
    }

    const articleToUpdate = await getArticleRequest(articleId);

    if (articleToUpdate) {
      titleField.value = articleToUpdate.title;
      descriptionField.value = articleToUpdate.description;
      contentField.innerHTML = articleToUpdate.content;

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
          updateContent({
            title: titleField!.value,
            description: descriptionField!.value,
            content: contentField!.innerHTML,
            bannerImage: imageField.files?.[0],
            isPublished: true,
          });
        }
      });

      saveBtn.addEventListener("click", () => {
        updateContent({
          title: titleField!.value,
          description: descriptionField!.value,
          content: contentField!.innerHTML,
          bannerImage: imageField.files?.[0],
          isPublished: false,
        });
      });
    }
  }
);
