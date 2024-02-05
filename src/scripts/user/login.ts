// Import customLocalStorage from "../dashboard/CustomLocalStorage.ts";
// Assuming you have CustomLocalStorage defined in a TypeScript file.

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

// login
async function checkCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const userJson = localStorage.getItem("user");

  if (userJson) {
    const user = JSON.parse(userJson);
    if (email === user.email && password === user.password) {
      return true;
    }
  } else {
    localStorage.setItem(
      "user",
      JSON.stringify({ email: "murenzi419@gmail.com", password: "123" })
    );
  }

  return false;
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userEmail = userEmailInput.value;
  const userPassword = userPasswordInput.value;

  const credentialsMatch = await checkCredentials(userEmail, userPassword);

  if (credentialsMatch) {
    // Assuming customLocalStorage is an instance of CustomLocalStorage
    localStorage.setItem("loggedIn", "true");
    window.location.href = "../dashboardPages";
  } else {
    loginFormErrorElement.style.display = "block";
    loginFormErrorElement.innerHTML =
      "Error logging in. Incorrect email or password";
  }
});
