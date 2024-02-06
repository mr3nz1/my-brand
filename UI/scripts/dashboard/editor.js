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
// function getSelectedTextRange() {
//   const selection = window.getSelection();

//   if (selection && !selection.isCollapsed) {
//     const range = selection.getRangeAt(0);
//     // const span = createElement("span");
//     // span.style.textDecoration = "underline";

//     // range.surroundContents(span);
//     return range;
//   }
// }

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

function initiateEditor() {
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
  const options = document.querySelectorAll(".rich_text_editor .header .text-type option")

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

  function cleanEmptyChildren(children) {
    children.forEach((child) => {
      while (child.children) {
        cleanEmptyChildren(child.children);
      }
      if (child.textContent.trim() === "") {
        editorTextArea.removeChild(child);
      }
    });
  }

  function getSelectedTextRange() {
    let range;

    if (window.getSelection) {
      const selection = window.getSelection();

      if (selection.rangeCount > 0) {
        // Get the first range (assuming a single selection)
        range = selection.getRangeAt(0);
      }
    } else if (document.selection) {
      // For older versions
      range = document.selection.createRange();
    }

    return range;
  }

  function bolden(selectedText) {
    const span = document.createElement("span");
    span.classList.toggle ("bold");
    selectedText.surroundContents(span);
  }

  function underline(selectedText) {
    const span = document.createElement("span");
    span.classList.toggle ("underline");
    selectedText.surroundContents(span);
  }

  editorTextArea.addEventListener("cleanElementsWithoutText", () => {
    cleanEmptyChildren(editorTextArea.children);
  });

  textTypeSelectElement.addEventListener("change", () => {
    if (textTypeSelectElement.value !== " ") {
      let element = createElement(textTypeSelectElement.value);
      editorTextArea.appendChild(element);
    }
    const event = new Event("cleanElementsWithoutText");
    dispatchEvent(event);
  });

  window.addEventListener("selectedText", () => {
    otherEditorBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const command = btn.getAttribute("btn-command");
        const selectedText = getSelectedTextRange();

        if (command === "bold") {
          bolden(selectedText);
        } else if (command === "underline") {
          underline(selectedText)        }
      });
    });
  });

  editorTextArea.addEventListener("mouseup", () => {
    const selection = selectText();
    const event = new Event("selectedText");
    event.selection = selection;
    window.dispatchEvent(event);
  });
}

export { initiateEditor };
