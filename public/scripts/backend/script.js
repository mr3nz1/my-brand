var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import customLocalStorage from "./CustomLocalStorage.js";
// animating the mouse
window.addEventListener("mousemove", (e) => {
    const animated_cursor = document.querySelector(".animated_cursor");
    animated_cursor.style.left = e.pageX + "px";
    animated_cursor.style.top = e.pageY + "px";
});
function isLoggedIn() {
    const loggedIn = customLocalStorage.getItem("loggedIn");
    if (loggedIn !== "true") {
        return (location.href = "../userPages/login.html");
    }
    return true;
}
isLoggedIn();
let isModalOpen = false;
function logout() {
    const modal = document.querySelector(".modal");
    const title = document.createElement("h2");
    const message = document.createElement("p");
    const logoutBtn = document.createElement("button");
    title.textContent = "Logout";
    message.textContent = "Are you sure you want to log out?";
    logoutBtn.textContent = "Confirm";
    logoutBtn.classList.add("button");
    modal.children[0].appendChild(title);
    modal.children[0].appendChild(message);
    modal.children[0].appendChild(logoutBtn);
    modal.classList.add("modal-open");
    isModalOpen = true;
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentPage");
        location.href = "../pages/login.html";
    });
    const cancelBtn = document.querySelector(".close-modal");
    cancelBtn.addEventListener("click", () => {
        isModalOpen = false;
        modal.children[0].removeChild(logoutBtn);
        modal.children[0].removeChild(message);
        modal.classList.remove("modal-open");
    });
}
function loadPage({ page, articleId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("called again");
        if (page === "logout") {
            if (isModalOpen) {
                return;
            }
            // console.log("called logout");
            isModalOpen = true;
            return logout();
        }
        const mainContentContainerElement = document.getElementById("main_content_container");
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
            const res = yield fetch("./" + pages[page]);
            const htmlContent = yield res.text();
            mainContentContainerElement.innerHTML = htmlContent;
            customLocalStorage.setItem("currentPage", page);
            location.hash = page;
            let event = new Event(page + "Loaded");
            event.page = page;
            if (page === "update_article") {
                event.articleId = articleId;
            }
            dispatchEvent(event);
        }
        catch (err) {
            console.log(err);
        }
    });
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
    // console.log()
    link.addEventListener("click", (e) => {
        console.log(link);
        const pageName = link.getAttribute("link-to-page");
        return loadPage({ page: pageName });
    });
});
export { loadPage };
