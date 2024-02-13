import customLocalStorage from "../scripts/dashboard/CustomLocalStorage.js";

// animating the mouse
window.addEventListener("mousemove", (e) => {
  const animated_cursor = document.querySelector(".animated_cursor");
  animated_cursor.style.left = e.pageX + "px";
  animated_cursor.style.top = e.pageY + "px";
});

function isLoggedIn() {
  const loggedIn = customLocalStorage.getItem("loggedIn");

  if (loggedIn !== "true") {
    return (location.href = "../pages/login.html");
  }

  return true;
}

isLoggedIn();

let modalIsOpen = false;

function logout() {
  // localStorage.removeItem("loggedIn");
  // localStorage.removeItem("currentPage");
  // location.href = "../pages/login.html";

  const modal = document.querySelector(".modal");
  const title = document.createElement("h2");
  const message = document.createElement("p");

  title.textContent = "Logout";
  message.textContent = "Are you sure you want to log out?";
  modal.children[0].appendChild(title);
  modal.children[0].appendChild(message);
  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Confirm";
  logoutBtn.classList.add("button");
  modal.children[0].appendChild(logoutBtn);
  modal.classList.add("modal-open");
  modalIsOpen = true;

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentPage");
    location.href = "../pages/login.html";
  });

  const cancelBtn = document.querySelector(".close-modal");

  cancelBtn.addEventListener("click", () => {
    modalIsOpen = false
    modal.children[0].removeChild(logoutBtn)
    modal.children[0].removeChild(message)
    modal.classList.remove("modal-open");
  });
}

async function loadPage({ page, articleId }) {
  if (page === "logout") {
    // const wantToLogout = confirm("Are you sure you want to log out?", "");
    // if (wantToLogout) {
    //   return logout();
    // } else {
    //   return;
    // }
    if (modalIsOpen) {
      return;
    }
    return logout();
  }

  const mainContentContainerElement = document.getElementById(
    "main_content_container"
  );

  if (!page) {
    page = "home";
  }

  const pages = {
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
    event.page = page;

    if (page === "update_article") {
      event.articleId = articleId;
    }

    dispatchEvent(event);
  } catch (err) {
    console.log(err);
  }
}

// check the current page if the content happens to load
window.addEventListener("DOMContentLoaded", () => {
  let page = localStorage.getItem("currentPage");
  loadPage({ page });
});

// load currentPage if the user just uses the hash
const currentPage = window.location.hash.split("#")[1];
loadPage({ page: currentPage });

const linksToPages = document.querySelectorAll(".sidebar > ul li");

linksToPages.forEach((link) => {
  link.addEventListener("click", (e) => {
    const pageName = link.getAttribute("link-to-page");
    return loadPage({ page: pageName });
  });
});

export { loadPage };