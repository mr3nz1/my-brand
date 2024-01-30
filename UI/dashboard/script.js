// animating the mouse
window.addEventListener("mousemove", (e) => {
  const animated_cursor = document.querySelector(".animated_cursor");
  animated_cursor.style.left = e.pageX + "px";
  animated_cursor.style.top = e.pageY + "px";
});

function isLoggedIn() {
  const loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn !== "true") {
    return (location.href = "../pages/login.html");
  }

  return true;
}

isLoggedIn();

function logout() {
  const removed = localStorage.removeItem("loggedIn");
  location.href = "../pages/login.html"
}

async function loadPage(page) {
  if (page === "logout") {
    return logout();
  }

  const mainContentContainerElement = document.getElementById(
    "main_content_container"
  );

  if (!page) {
    page = "home"
  }

  const pages = {
    home: "home.html",
    blog: "blog.html",
    article: "articles.html",
    tasks: "tasks.html",
    messages: "messages.html",
    new_article: "new_article.html",
  };

  try {
    const res = await fetch("./pages/" + pages[page]);
    const htmlContent = await res.text();
    mainContentContainerElement.innerHTML = htmlContent;
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("hashchange", () => {
  const page = location.hash.split("#")[1];

  loadPage(page);
});

// load currentPage if the user just uses the hash
const currentPage = window.location.hash.split("#")[1];
loadPage(currentPage);
