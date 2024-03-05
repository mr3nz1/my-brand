// Import customLocalStorage from "../dashboard/CustomLocalStorage.ts";
// Assuming you have CustomLocalStorage defined in a TypeScript file.

import { url } from "../utilities.js";

const userEmailInput = document.getElementById(
  "user_email_input"
) as HTMLInputElement;
const userPasswordInput = document.getElementById(
  "user_password_input"
) as HTMLInputElement;
const loginForm: HTMLFormElement = document.getElementById(
  "login_form"
) as HTMLFormElement;
const loginFormErrorElement = document.getElementById(
  "form_error_text"
) as HTMLDivElement;

async function login(credentials: object) {
  try {
    const res = await fetch(url + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    let dataString = await res.text();
    let data: {
      status: string;
      data: {
        token: string;
      };
    } = JSON.parse(dataString);

    if (res.status === 200) {
      localStorage.setItem("userToken", data?.data?.token);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userEmail = userEmailInput.value;
  const userPassword = userPasswordInput.value;

  const status = await login({ email: userEmail, password: userPassword });

  if (status) {
    window.location.href = "../dashboardPages";
  } else {
    loginFormErrorElement.style.display = "block";
    loginFormErrorElement.innerHTML =
      "Error logging in. Incorrect email or password";
  }
});
