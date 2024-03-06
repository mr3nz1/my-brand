import { url } from "../utilities.js";

async function createCommentRequest(commentData: object) {
  const res = await fetch(url + "/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  if (res.status !== 201) {
    return true;
  }

  const dataJson = await res.text();
  const data = JSON.parse(dataJson);

  return true;
}

async function getCommentRequest(articleId: string) {
  const res = await fetch(url + "/comments/" + articleId, {
    method: "GET",
  });

  if (res.status !== 200) {
    return;
  }

  const dataJson = await res.text();
  const data = JSON.parse(dataJson);

  return data.data.comments;
}

export { createCommentRequest, getCommentRequest };
