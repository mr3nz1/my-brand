import { loadPage } from "../dashboard/script.js";
import { initiateEditor } from "./editor.js";
import { displayErrors, errors, saveContent } from "./newArticle.js";

const currentPage = localStorage.getItem("currentPage");

window.addEventListener("update_articleLoaded", (e) => {
  // set up the editor
  initiateEditor();

  const articleId = e.articleId;
  const saveBtn = document.querySelector(".save_content_btn");
  const publishBtn = document.querySelector(".publish_article_btn");
  const titleField = document.querySelector(".title_input_field");
  const descriptionField = document.querySelector(".description_input_field");
  const imageField = document.querySelector(".banner_image_input_field");
  const contentField = document.querySelector(".outputField");

  if (!articleId) {
    return loadPage({ page: "blog" });
  }

  const articles = JSON.parse(localStorage.getItem("articles"));

  let articleToUpdate = articles.filter(
    (article) => article.id === articleId
  )[0];

  titleField.value = articleToUpdate.title;
  descriptionField.value = articleToUpdate.description;
  imageField.value = articleToUpdate.image;
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
      saveContent({
        title: titleField.value,
        description: descriptionField.value,
        content: contentField.innerHTML,
        image: imageField.value,
        published: true,
        id: articleId,
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
      id: articleId,
    });
  });
});