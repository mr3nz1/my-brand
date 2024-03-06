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
function createCommentRequest(commentData) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(url + "/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentData),
        });
        if (res.status !== 201) {
            return true;
        }
        const dataJson = yield res.text();
        const data = JSON.parse(dataJson);
        return true;
    });
}
function getCommentRequest(articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(url + "/comments/" + articleId, {
            method: "GET",
        });
        if (res.status !== 200) {
            return;
        }
        const dataJson = yield res.text();
        const data = JSON.parse(dataJson);
        return data.data.comments;
    });
}
export { createCommentRequest, getCommentRequest };
