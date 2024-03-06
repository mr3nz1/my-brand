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
function createMessageRequest(message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(url + "/messages/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(message),
            });
            if (res.status === 201) {
                let data = yield res.text();
                data = JSON.parse(data);
                return true;
            }
            else {
                false;
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    });
}
function getMessagesRequest() {
    return __awaiter(this, void 0, void 0, function* () {
        const token = localStorage.getItem("userToken");
        const res = yield fetch(url + "/messages", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        if (res.status !== 200) {
            return;
        }
        const dataJson = yield res.text();
        const data = JSON.parse(dataJson);
        return data.data.messages;
    });
}
function deleteMessageRequest(messageId) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = localStorage.getItem("userToken");
        const res = yield fetch(url + "/messages/" + messageId, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        if (res.status === 200) {
            return false;
        }
        const dataJson = yield res.text();
        const data = JSON.parse(dataJson);
        return true;
    });
}
export { getMessagesRequest, deleteMessageRequest, createMessageRequest };
