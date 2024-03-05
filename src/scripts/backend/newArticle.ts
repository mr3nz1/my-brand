import { loadPage } from "./script.js";
import { initiateEditor } from "./editor.js";
import { Article } from "../types.js";
import { url } from "../utilities.js";
import { newArticleRequest } from "../requests/articleRequests.js";

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

async function saveContent(article: Article) {
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
  const status = await newArticleRequest(articleDataForm);

  if (status) {
    if (article.isPublished) {
      alert("Article successfully published");
    } else {
      alert("Article successfully saved");
    }
    loadPage({ page: "blog" });
  } else {
    alert("Error creating article");
  }
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
  )!;
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

      if (!imageField) {
        errors.image = "Banner image is required";
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
        if (
          titleField &&
          descriptionField &&
          imageField.files?.[0] &&
          contentField
        ) {
          saveContent({
            title: titleField!.value,
            description: descriptionField!.value,
            content: contentField!.innerHTML,
            bannerImage: imageField.files?.[0],
            isPublished: true,
          });
        }
      }
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      saveContent({
        title: titleField!.value,
        description: descriptionField!.value,
        content: contentField!.innerHTML,
        bannerImage: imageField.files?.[0],
        isPublished: false,
      });
    });
  }
});

export { errors, saveContent, displayErrors };
