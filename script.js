// animating the mouse
window.addEventListener("mousemove", (e) => {
  const animated_cursor = document.querySelector(".animated_cursor");
  animated_cursor.style.left = e.pageX + "px";
  animated_cursor.style.top = e.pageY + "px";
});
