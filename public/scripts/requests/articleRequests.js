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
function newArticleRequest(articleContent) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem("userToken");
            const res = yield fetch(url + "/articles/", {
                method: "POST",
                headers: {
                    // "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + token,
                },
                body: articleContent,
            });
            const dataJson = yield res.text();
            const data = JSON.parse(dataJson);
            console.log(data);
            if (res.status !== 201) {
                return false;
            }
            if (data.status === "success") {
                return true;
            }
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    });
}
function deleteArticleRequest(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = localStorage.getItem("userToken");
        const res = yield fetch(url + "/articles/" + id, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        const dataJson = yield res.text();
        const data = JSON.parse(dataJson);
        console.log(data);
        if (res.status !== 200) {
            return false;
        }
        return true;
    });
}
function getArticleRequest(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(url + "/articles/" + id, {
            method: "GET",
        });
        if (res.status !== 200) {
            return false;
        }
        const dataJson = yield res.text();
        const data = JSON.parse(dataJson);
        return data.data.article;
    });
}
function getArticlesRequest() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(url + "/articles/", {
            method: "GET",
        });
        const dataJson = yield res.text();
        const data = JSON.parse(dataJson);
        if (res.status !== 200) {
            return false;
        }
        return data.data.articles;
    });
}
function updateArticleRequest(articleId, articleContent) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem("userToken");
            console.log(articleContent);
            const res = yield fetch(url + "/articles/" + articleId, {
                method: "PATCH",
                headers: {
                    // "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + token,
                },
                body: articleContent,
            });
            const dataJson = yield res.text();
            const data = JSON.parse(dataJson);
            console.log(data);
            if (res.status !== 200) {
                return false;
            }
            if (data.status === "success") {
                return true;
            }
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    });
}
export { newArticleRequest, deleteArticleRequest, getArticleRequest, updateArticleRequest, getArticlesRequest, };
