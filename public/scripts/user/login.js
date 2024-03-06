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
import { url } from "../utilities.js";
const userEmailInput = document.getElementById("user_email_input");
const userPasswordInput = document.getElementById("user_password_input");
const loginForm = document.getElementById("login_form");
const loginFormErrorElement = document.getElementById("form_error_text");
function login(credentials) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(url + "/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
            let dataString = yield res.text();
            let data = JSON.parse(dataString);
            if (res.status === 200) {
                localStorage.setItem("userToken", (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.token);
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
loginForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const userEmail = userEmailInput.value;
    const userPassword = userPasswordInput.value;
    const status = yield login({ email: userEmail, password: userPassword });
    if (status) {
        window.location.href = "../dashboardPages";
    }
    else {
        loginFormErrorElement.style.display = "block";
        loginFormErrorElement.innerHTML =
            "Error logging in. Incorrect email or password";
    }
}));
