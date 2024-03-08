var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { url } from "../utilities.js";
import customLocalStorage from "./CustomLocalStorage.js";
// animating the mouse
window.addEventListener("mousemove", (e) => {
    const animated_cursor = document.querySelector(".animated_cursor");
    animated_cursor.style.left = e.pageX + "px";
    animated_cursor.style.top = e.pageY + "px";
});
function getUserInfo(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(url + "/users/getUserInfo", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            if (res.status !== 200) {
                return false;
            }
            const dataString = yield res.text();
            const data = JSON.parse(dataString);
            localStorage.setItem("adminInfo", JSON.stringify(data === null || data === void 0 ? void 0 : data.data));
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    });
}
function isLoggedIn() {
    return __awaiter(this, void 0, void 0, function* () {
        const userToken = customLocalStorage.getItem("userToken");
        if (!userToken) {
            return (location.href = "../userPages/login.html");
        }
        const status = yield getUserInfo(userToken);
        if (!status) {
            return (location.href = "../userPages/login.html");
        }
    });
}
isLoggedIn();
let isModalOpen = false;
function logout() {
    if (!isModalOpen) {
        console.log("Twice");
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
            localStorage.removeItem("userToken");
            localStorage.removeItem("adminInfo");
            localStorage.removeItem("currentPage");
            location.href = "../userPages/login.html";
        });
        const cancelBtn = document.querySelector(".close-modal");
        cancelBtn.addEventListener("click", () => {
            isModalOpen = false;
            modal.children[0].removeChild(logoutBtn);
            modal.children[0].removeChild(message);
            modal.children[0].removeChild(title);
            modal.classList.remove("modal-open");
        });
    }
}
function loadPage({ page, articleId, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (page === "logout") {
            if (!isModalOpen) {
                return logout();
            }
            else {
                return;
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
// const currentPage = window.location.hash.split("#")[1];
// loadPage({ page: currentPage });
const linksToPages = document.querySelectorAll(".sidebar > ul li");
linksToPages.forEach((link) => {
    // console.log()
    link.addEventListener("click", (e) => {
        const pageName = link.getAttribute("link-to-page");
        return loadPage({ page: pageName });
    });
});
export { loadPage };
