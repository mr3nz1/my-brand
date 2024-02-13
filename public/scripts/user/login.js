"use strict";
// Import customLocalStorage from "../dashboard/CustomLocalStorage.ts";
// Assuming you have CustomLocalStorage defined in a TypeScript file.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const userEmailInput = document.getElementById("user_email_input");
const userPasswordInput = document.getElementById("user_password_input");
const loginForm = document.getElementById("login_form");
const loginFormErrorElement = document.getElementById("form_error_text");
// login
function checkCredentials(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const userJson = localStorage.getItem("user");
        if (userJson) {
            const user = JSON.parse(userJson);
            if (email === user.email && password === user.password) {
                return true;
            }
        }
        else {
            localStorage.setItem("user", JSON.stringify({ email: "murenzi419@gmail.com", password: "123" }));
        }
        return false;
    });
}
loginForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const userEmail = userEmailInput.value;
    const userPassword = userPasswordInput.value;
    const credentialsMatch = yield checkCredentials(userEmail, userPassword);
    if (credentialsMatch) {
        // Assuming customLocalStorage is an instance of CustomLocalStorage
        localStorage.setItem("loggedIn", "true");
        window.location.href = "../dashboardPages";
    }
    else {
        loginFormErrorElement.style.display = "block";
        loginFormErrorElement.innerHTML =
            "Error logging in. Incorrect email or password";
    }
}));
