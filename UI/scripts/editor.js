const currentPage = localStorage.getItem("currentPage");

// create element
function createElement(type, value) {
  const newElement = document.createElement(type);
  newElement.innerHTML = "New " + type;
  return newElement;
}

// add values to element
function addValueToElement(element, value) {
  return (element.innerHTML = value);
}

// select text
function getText() {
  if (document.getSelection) {
    let text = document.getSelection();
    const children = text.selectAllChildren();
  }
}

// apply styles to selected text
function getSelectedTextRange() {
  const selection = window.getSelection();

  if (selection && !selection.isCollapsed) {
    const range = selection.getRangeAt(0);
    // const span = createElement("span");
    // span.style.textDecoration = "underline";

    // range.surroundContents(span);
    return range;
  }
}

// remove styles
function removeElement() {
  const selection = window.getSelection();

  if (selection && !selection.isCollapsed) {
    const anchorNode = selection.anchorNode;

    if (anchorNode && anchorNode.parentNode) {
      const parentElement = anchorNode.parentNode;

      parentElement.remove();
    }
  }
}

// select information only in the text area
function selectText() {
  return document.getSelection();
}

// clean the text editor for elements without text

window.addEventListener("pageChange", () => {
  if (currentPage === "new_article") {
    // check whether you're only editing the text area content
    const editorTextArea = document.querySelector(
      ".rich_text_editor .outputField"
    );

    const justifyBtns = document.querySelectorAll(
      ".rich_text_editor .header .justifyBtns"
    );
    const caseBtns = document.querySelectorAll(
      ".rich_text_editor .header .caseBtns"
    );
    const otherEditorBtns = document.querySelectorAll(
      ".rich_text_editor .header .otherBtns"
    );
    const textTypeSelectElement = document.querySelector(
      ".rich_text_editor .header .text-type"
    );

    let fontList = [
      "Arial",
      "Verdana",
      "Times New Roman",
      "Garamond",
      "Georgia",
      "Courier New",
      "Cursive",
      "Comfortaa",
    ];

    editorTextArea.addEventListener("cleanElementsWithoutText", () => {
      const children = editorTextArea.children;

      children.forEach((child) => {
        if (child.textContent.trim() === "") {
          editorTextArea.removeChild(child);
        }
      });
    });

    textTypeSelectElement.addEventListener("change", () => {
      if (textTypeSelectElement.value !== " ") {
        let element = createElement(textTypeSelectElement.value);
        editorTextArea.appendChild(element);
      }

      // let range = getSelectedTextRange();
      // const parentElement = range.commonAncestorContainer;

      // if (parentElement.nodeType === 1) {
      //   // It's an elem  ent (HTML element node)
      //   console.log(parentElement)

      //   parentElement.replaceWith(element);
      // } else {
      //   range.surroundContents(element);
      // }
      const event = new Event("cleanElementsWithoutText");
      dispatchEvent(event);
    });

    window.addEventListener("selectedText", () => {
      otherEditorBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const command = btn.getAttribute("btn-command");
          if (command === "bold") {
            console.log("clicked bold");
            getSelectedTextRange();
          } else if (command === "underline") {
            getSelectedTextRange();
          }
        });
      });

      document.addEventListener("click", () => {
        // removeElement
      });

      console.log("event dispatched and listened to");
    });

    editorTextArea.addEventListener("mouseup", () => {
      const selection = selectText();
      const event = new Event("selectedText");
      event.selection = selection;
      window.dispatchEvent(event);
    });
  }
});
