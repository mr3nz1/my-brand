// Import customLocalStorage from "../scripts/dashboard/CustomLocalStorage.ts";
// Assuming you have CustomLocalStorage defined in a TypeScript file.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import customLocalStorage from "./CustomLocalStorage";
// animating the mouse
window.addEventListener("mousemove", (e) => {
    const animated_cursor = document.querySelector(".animated_cursor");
    animated_cursor.style.left = e.pageX + "px";
    animated_cursor.style.top = e.pageY + "px";
});
function isLoggedIn() {
    const loggedIn = customLocalStorage.getItem("loggedIn");
    if (loggedIn !== "true") {
        location.href = "../pages/login.html";
        return false;
    }
    return true;
}
isLoggedIn();
function logout() {
    const removed = localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentPage");
    location.href = "../pages/login.html";
}
function loadPage({ page, articleId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (page === "logout") {
            const wantToLogout = confirm("Are you sure you want to log out?");
            if (wantToLogout) {
                return logout();
            }
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
            const res = yield fetch("./pages/" + pages[page]);
            const htmlContent = yield res.text();
            mainContentContainerElement.innerHTML = htmlContent;
            customLocalStorage.setItem("currentPage", page);
            location.hash = page;
            let event = new Event(page + "Loaded");
            event.page = page;
            if (page === "update_article" && articleId) {
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
    const page = localStorage.getItem("currentPage");
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
        const pageName = link.getAttribute("link-to-page");
        if (pageName) {
            return loadPage({ page: pageName });
        }
    });
});
export { loadPage };
