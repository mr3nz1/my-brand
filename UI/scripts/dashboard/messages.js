function deleteMessage(messageId) {
  if (
    confirm("Are you sure you want to delete the message with id: " + messageId)
  ) {
    const messages = JSON.parse(localStorage.getItem("messages"));
    let updatedMessages = messages.filter(
      (message) => message.id !== messageId
    );
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
    const event = new Event("deletedMessage");
    dispatchEvent(event);
  }
}

function loadMessages() {
  const tableBodyForLargerScreens = document.querySelector(
    ".messages_table tbody"
  );
  const mobileMessagesContainerForSmallerScreens = document.querySelector(
    ".mobile_messages_container"
  );
  const messages = JSON.parse(localStorage.getItem("messages"));

  let rowsContentForLargerScreens = "";
  let cardsContentForSmallerScreens = "";

  messages.forEach((message) => {
    rowsContentForLargerScreens += `
    <tr>
    <td>${message.created_at}</td>
    <td>${message.fullName}</td>
    <td>${message.email}</td>
    <td>${message.content}</td>
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
        <span class="mobile_message_header_date">${message.created_at}</span>

        <span email="${message.email}" id="${message.id}" class="blue_btn underline_on_hover replyMessageBtns">Reply</span>
        <span id="${message.id}" class="red_btn underline_on_hover deleteMessageBtns">Delete</spab>
    </div>

    <div class="mobile_message_info">
        <p><span class="bold">Name: </span> <span>${message.fullName}</span></p>
        <p><span class="bold">Email: </span> <span class="email">${message.email}</span></p>
    </div>
    <div class="mobile_message">
        <p>${message.content}</p>
    </div>
</div>
`;
  });

  // Inject the content into the page
  tableBodyForLargerScreens.innerHTML = rowsContentForLargerScreens;
  mobileMessagesContainerForSmallerScreens.innerHTML =
    cardsContentForSmallerScreens;
}

function replyToMessage(recipientEmail, subject) {
  let mailtoLink =
    "mailto:" + recipientEmail + "?subject=" + encodeURIComponent(subject);
  window.location.href = mailtoLink;
}

function configureReplyBtns() {
  const replyBtns = document.querySelectorAll(".replyMessageBtns");

  replyBtns.forEach((replyBtn) => {
    replyBtn.addEventListener("click", () => {
      const email = replyBtn.getAttribute("email");
      return replyToMessage(email, "Reply to you're message on My Portfolio");
    });
  });
}

function configureDeleteBtns() {
  const deleteBtns = document.querySelectorAll(".deleteMessageBtns");

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      const messageId = deleteBtn.getAttribute("id");
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
