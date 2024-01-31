const currentPage = localStorage.getItem("currentPage");

function bold() {
  let value = e.value
  
}


window.addEventListener("localStorageChange", () => {
  if (currentPage === "new_article") {
    const editorTextArea = document.querySelector(
      ".rich_text_editor .outputField"
    );
    const editorBtns = document.querySelectorAll(
      ".rich_text_editor .header button"
    );

    editorBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const btnCommand = btn.getAttribute("btn-command");

        // if () {
          
        // }
      });
    });
  }
});
