// animating the mouse
window.addEventListener("mousemove", (e) => {
  const animated_cursor: HTMLDivElement =
    document.querySelector(".animated_cursor")!;
  animated_cursor.style.left = e.pageX + "px";
  animated_cursor.style.top = e.pageY + "px";
});

// mobile navigation
const openMobileNavBtn: HTMLImageElement =
  document.querySelector(".menu_icon")!;
const navElement: HTMLElement = document.querySelector("nav")!;
const navUlElement: HTMLElement | null = document.querySelector("nav ul");

openMobileNavBtn.addEventListener("click", () => {
  navElement.classList.add("navOpen");
  openMobileNavBtn.style.display = "none";
});

if (navUlElement) {
  navElement.addEventListener("click", (e) => {
    if (e.target === navElement) {
      navElement.classList.remove("navOpen");
      openMobileNavBtn.style.display = "flex";
    }
  });
}
