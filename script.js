const animated_cursor = document.querySelector(".animated_cursor");

window.addEventListener("mousemove", (e) => {
  animated_cursor.style.left = e.pageX + "px";
  animated_cursor.style.top = e.pageY + "px";
});
