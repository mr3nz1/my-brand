import customLocalStorage from "./CustomLocalStorage.js";

const userEmailInput = document.getElementById("user_email_input");
const userPasswordInput = document.getElementById("user_password_input");
const loginForm = document.getElementById("login_form");
const loginFormErrorElement = document.getElementById("form_error_text")

// login
async function checkCredentials(email, password) {
  const user = await JSON.parse(localStorage.getItem("user"));

  if (email === user.email && password === user.password) {
    return true
  }

  return false
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userEmail = userEmailInput.value
  const userPassword = userPasswordInput.value

  const credentialsMatch = await checkCredentials(userEmail, userPassword)

  if (credentialsMatch) {
    customLocalStorage.setItem("loggedIn", "true")
    window.location.href = "/UI/dashboard"
  } else {
    loginFormErrorElement.style.display = "block"
    loginFormErrorElement.innerHTML = "Error logging in. Incorrect email or password"
  }  
});
