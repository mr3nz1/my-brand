// animating the mouse
window.addEventListener("mousemove", (e) => {
  const animated_cursor = document.querySelector(".animated_cursor");
  animated_cursor.style.left = e.pageX + "px";
  animated_cursor.style.top = e.pageY + "px";
});

// mobile navigation
const openMobileNavBtn = document.querySelector(".menu_icon");
const navElement = document.querySelector("nav");
const navUlElement = document.querySelector("nav ul");

openMobileNavBtn.addEventListener("click", () => {
  navElement.classList.add("navOpen");
  openMobileNavBtn.style.display = "none";
});

navElement.addEventListener("click", (e) => {
  if (e.target === navElement) {
    navElement.classList.remove("navOpen");
    openMobileNavBtn.style.display = "flex";
  }
});
