// Import customLocalStorage from "../scripts/dashboard/CustomLocalStorage.ts";
// Assuming you have CustomLocalStorage defined in a TypeScript file.

import customLocalStorage from "./CustomLocalStorage";

// animating the mouse
window.addEventListener("mousemove", (e) => {
  const animated_cursor = document.querySelector(
    ".animated_cursor"
  ) as HTMLElement;
  animated_cursor.style.left = e.pageX + "px";
  animated_cursor.style.top = e.pageY + "px";
});

function isLoggedIn(): boolean {
  const loggedIn = customLocalStorage.getItem("loggedIn");

  if (loggedIn !== "true") {
    location.href = "../pages/login.html";
    return false;
  }

  return true;
}

isLoggedIn();

function logout(): void {
  const removed = localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentPage");
  location.href = "../pages/login.html";
}

async function loadPage({
  page,
  articleId,
}: {
  page: string;
  articleId?: string;
}): Promise<void> {
  if (page === "logout") {
    const wantToLogout = confirm("Are you sure you want to log out?");
    if (wantToLogout) {
      return logout();
    }
  }

  const mainContentContainerElement = document.getElementById(
    "main_content_container"
  ) as HTMLElement;

  if (!page) {
    page = "home";
  }

  const pages: { [key: string]: string } = {
    home: "home.html",
    blog: "blog.html",
    article: "articles.html",
    tasks: "tasks.html",
    messages: "messages.html",
    new_article: "new_article.html",
    update_article: "update_article.html",
  };

  try {
    const res = await fetch("./pages/" + pages[page]);
    const htmlContent = await res.text();
    mainContentContainerElement.innerHTML = htmlContent;
    customLocalStorage.setItem("currentPage", page);
    location.hash = page;
    let event = new Event(page + "Loaded");
    (event as any).page = page;

    if (page === "update_article" && articleId) {
      (event as any).articleId = articleId;
    }

    dispatchEvent(event);
  } catch (err) {
    console.log(err);
  }
}

// check the current page if the content happens to load
window.addEventListener("DOMContentLoaded", () => {
  const page: string | null = localStorage.getItem("currentPage");
  if (page) {
    loadPage({ page });
  }
});

// load currentPage if the user just uses the hash
const currentPage = window.location.hash.split("#")[1];
loadPage({ page: currentPage });

const linksToPages = document.querySelectorAll(".sidebar > ul li");

linksToPages.forEach((link) => {
  link.addEventListener("click", (e) => {
    const pageName: string | null = link.getAttribute("link-to-page");

    if (pageName) {
      return loadPage({ page: pageName });
    }
  });
});

export { loadPage };
