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
function createTaskRequest(taskData) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = localStorage.getItem("userToken");
        const res = yield fetch(url + "/tasks/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(taskData),
        });
        if (res.status !== 201) {
            return false;
        }
        return true;
    });
}
function getTasksRequest() {
    return __awaiter(this, void 0, void 0, function* () {
        const token = localStorage.getItem("userToken");
        const res = yield fetch(url + "/tasks/", {
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
        return data.data.tasks;
    });
}
function deleteTaskRequest(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = localStorage.getItem("userToken");
        const res = yield fetch(url + "/tasks/" + id, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        if (res.status !== 200) {
            return false;
        }
        return true;
    });
}
export { createTaskRequest, getTasksRequest, deleteTaskRequest };
