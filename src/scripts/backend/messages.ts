import {
  deleteMessageRequest,
  getMessagesRequest,
} from "../requests/messageRequests.js";
import { Message } from "../types";

let isModalOpen: boolean = false;

function deleteMessage(messageId: string) {
  const closeModal: HTMLElement = document.querySelector(".close-modal")!;
  const modal: HTMLElement = document.querySelector(".modal")!;
  const title: HTMLHeadingElement = document.createElement("h2");
  const messageElement: HTMLParagraphElement = document.createElement("p");
  const deleteBtn: HTMLButtonElement = document.createElement("button");

  title.textContent = "Delete";
  messageElement.textContent = "Want to delete messaage with id: " + messageId;
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("button");

  modal.children[0].appendChild(title);
  modal.children[0].appendChild(messageElement);
  modal.children[0].appendChild(deleteBtn);
  modal.classList.add("modal-open");
  isModalOpen = true;

  deleteBtn.addEventListener("click", async () => {
    const messagesString: string = localStorage.getItem("messages")!;
    const messages: Message[] = JSON.parse(messagesString);

    const status = await deleteMessageRequest(messageId);
    const event = new Event("deletedMessage");
    dispatchEvent(event);
    modal.children[0].removeChild(title);
    modal.children[0].removeChild(messageElement);
    modal.children[0].removeChild(deleteBtn);
    modal.classList.remove("modal-open");
    isModalOpen = false;
  });

  closeModal?.addEventListener("click", () => {
    if (modal) {
      modal.children[0].removeChild(title);
      modal.children[0].removeChild(messageElement);
      modal.children[0].removeChild(deleteBtn);
      modal.classList.remove("modal-open");
      isModalOpen = false;
    }
  });
}

async function loadMessages() {
  const tableBodyForLargerScreens = document.querySelector(
    ".messages_table tbody"
  )!;
  const mobileMessagesContainerForSmallerScreens = document.querySelector(
    ".mobile_messages_container"
  ) as HTMLDivElement;
  const messages: Message[] = await getMessagesRequest();

  let rowsContentForLargerScreens = "";
  let cardsContentForSmallerScreens = "";

  if (messages) {
    messages.forEach((message) => {
      rowsContentForLargerScreens += `
        <tr>
        <td>${message.createdAt}</td>
        <td>${message.name}</td>
        <td>${message.email}</td>
        <td>${message.message}</td>
        <td>
            <div class="options">
                <span email="${message.email}" id="${message.id}" class="underline_on_hover blue_btn replyMessageBtns">Reply</span>
                <span id="${message.id}" class="underline_on_hover red_btn deleteMessageBtns">Delete</span>
            </div>
        </td>
    </tr>`;

      cardsContentForSmallerScreens += `
          <div class="mobile_message_container">
        <div class="mobile_message_header">
            <span class="mobile_message_header_date">${message.createdAt}</span>
    
            <span email="${message.email}" id="${message.id}" class="blue_btn underline_on_hover replyMessageBtns">Reply</span>
            <span id="${message.id}" class="red_btn underline_on_hover deleteMessageBtns">Delete</spab>
        </div>
    
        <div class="mobile_message_info">
            <p><span class="bold">Name: </span> <span>${message.name}</span></p>
            <p><span class="bold">Email: </span> <span class="email">${message.email}</span></p>
        </div>
        <div class="mobile_message">
            <p>${message.message}</p>
        </div>
    </div>
    `;
    });

    // Inject the content into the page
    tableBodyForLargerScreens.innerHTML = rowsContentForLargerScreens;
    mobileMessagesContainerForSmallerScreens.innerHTML =
      cardsContentForSmallerScreens;

    const event = new Event("messagesLoaded");
    dispatchEvent(event);
  }
}

function replyToMessage(recipientEmail: string, subject: string) {
  let mailtoLink =
    "mailto:" + recipientEmail + "?subject=" + encodeURIComponent(subject);
  window.location.href = mailtoLink;
}

function configureReplyBtns() {
  const replyBtns = document.querySelectorAll(".replyMessageBtns");

  replyBtns.forEach((replyBtn) => {
    replyBtn.addEventListener("click", () => {
      const email: string = replyBtn.getAttribute("email")!;
      return replyToMessage(email, "Reply to you're message on My Portfolio");
    });
  });
}

function configureDeleteBtns() {
  const deleteBtns = document.querySelectorAll(".deleteMessageBtns");

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      const messageId: string = deleteBtn.getAttribute("id")!;
      return deleteMessage(messageId);
    });
  });
}

window.addEventListener("deletedMessage", () => {
  loadMessages();
  configureDeleteBtns();
  configureReplyBtns();
});

window.addEventListener("messagesLoaded", () => {
  loadMessages();
  configureDeleteBtns();
  configureReplyBtns();
});
