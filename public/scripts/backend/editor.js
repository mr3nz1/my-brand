// create element
function createElement(type) {
    const newElement = document.createElement(type);
    newElement.innerHTML = "New " + type;
    return newElement;
}
// add values to element
function addValueToElement(element, value) {
    return (element.innerHTML = value);
}
function selectText() {
    return document.getSelection();
}
function cleanEmptyChildren(children) {
    Array.from(children).forEach((child) => {
        while (child.children.length > 0) {
            cleanEmptyChildren(child.children);
        }
        if (child.textContent && child.textContent.trim() === "") {
            const editorTextArea = document.getElementById("editorTextArea");
            if (editorTextArea && editorTextArea.contains(child)) {
                editorTextArea.removeChild(child);
            }
        }
    });
}
function getSelectedTextRange() {
    let range = null;
    if (window.getSelection) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            // Get the first range (assuming a single selection)
            range = selection.getRangeAt(0);
        }
    }
    else if (document.selection) {
        // For older versions
        range = document.selection.createRange();
    }
    return range;
}
function bolden(selectedText) {
    if (!selectedText)
        return;
    const span = document.createElement("span");
    span.classList.toggle("bold");
    selectedText.surroundContents(span);
}
function underline(selectedText) {
    if (!selectedText)
        return;
    const span = document.createElement("span");
    span.classList.toggle("underline");
    selectedText.surroundContents(span);
}
function italic(selectedText) {
    if (!selectedText)
        return;
    const span = document.createElement("span");
    span.classList.toggle("italic");
    selectedText.surroundContents(span);
}
function initiateEditor() {
    // check whether you're only editing the text area content
    const editorTextArea = document.querySelector(".rich_text_editor .outputField");
    const justifyBtns = document.querySelectorAll(".rich_text_editor .header .justifyBtns");
    const caseBtns = document.querySelectorAll(".rich_text_editor .header .caseBtns");
    const otherEditorBtns = document.querySelectorAll(".rich_text_editor .header .otherBtns");
    const textTypeSelectElement = document.querySelector(".rich_text_editor .header .text-type");
    const options = document.querySelectorAll(".rich_text_editor .header .text-type option");
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
        cleanEmptyChildren(editorTextArea.children);
    });
    textTypeSelectElement.addEventListener("change", () => {
        if (textTypeSelectElement.value !== " ") {
            let element = createElement(textTypeSelectElement.value);
            editorTextArea.appendChild(element);
        }
        const event = new Event("cleanElementsWithoutText");
        window.dispatchEvent(event);
    });
    window.addEventListener("selectedText", () => {
        Array.from(otherEditorBtns).forEach((btn) => {
            btn.addEventListener("click", () => {
                const command = btn.getAttribute("btn-command");
                const selectedText = getSelectedTextRange();
                console.log(selectedText);
                if (command === "bold") {
                    bolden(selectedText);
                }
                else if (command === "underline") {
                    underline(selectedText);
                }
                else if (command === "italic") {
                    italic(selectedText);
                }
            });
        });
    });
    editorTextArea.addEventListener("mouseup", () => {
        const selection = getSelectedTextRange();
        console.log("mouseup");
        if (selection) {
            const event = new CustomEvent("selectedText", { detail: { selection } });
            window.dispatchEvent(event);
        }
    });
}
export { initiateEditor };
