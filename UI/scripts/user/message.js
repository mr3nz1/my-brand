function generateUniqueId() {
  const timestamp = new Date().getTime();
  const randomPart = Math.floor(Math.random() * 1000); // Example: generate a random number between 0 and 999
  const uniqueId = `id_${timestamp}_${randomPart}`;

  return uniqueId;
}

function formatDate(date) {
  const options = { month: "short", day: "numeric", year: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

window.addEventListener("DOMContentLoaded", () => {
  const messageForm = document.getElementById("message_form");

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(".default_input_field");
    const data = {};
    inputs.forEach((input) => {
      const name = input.getAttribute("name");
      const value = input.value;
      data[name] = value;
    });

    let messages = JSON.parse(localStorage.getItem("messages"));
    let newMessages = [
      ...messages,
      {
        ...data,
        id: generateUniqueId(),
        created_at: formatDate(new Date()),
      },
    ];
    localStorage.setItem("messages", JSON.stringify(newMessages));

    alert("Thank you for your message");

    inputs.forEach(input => {
        input.value = ""
    });
  });
});
