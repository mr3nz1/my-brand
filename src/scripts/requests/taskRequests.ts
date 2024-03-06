import { url } from "../utilities.js";

async function createTaskRequest(taskData: { title: string; content: string }) {
  const token = localStorage.getItem("userToken");
  const res = await fetch(url + "/tasks/", {
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
}

async function getTasksRequest() {
  const token = localStorage.getItem("userToken");
  const res = await fetch(url + "/tasks/", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (res.status !== 200) {
    return;
  }

  const dataJson = await res.text();
  const data = JSON.parse(dataJson);

  return data.data.tasks;
}

async function deleteTaskRequest(id: string) {
  const token = localStorage.getItem("userToken");
  const res = await fetch(url + "/tasks/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (res.status !== 200) {
    return false;
  }

  return true;
}

export { createTaskRequest, getTasksRequest, deleteTaskRequest };
