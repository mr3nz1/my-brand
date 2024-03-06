import { url } from "../utilities.js";

async function createMessageRequest(message: object) {
  try {
    const res = await fetch(url + "/messages/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (res.status === 201) {
      let data = await res.text();
      data = JSON.parse(data);
      return true;
    } else {
      false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getMessagesRequest() {
  const token = localStorage.getItem("userToken");

  const res = await fetch(url + "/messages", {
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

  return data.data.messages;
}

async function deleteMessageRequest(messageId: string) {
  const token = localStorage.getItem("userToken");
  const res = await fetch(url + "/messages/" + messageId, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (res.status === 200) {
    return false;
  }

  const dataJson = await res.text();
  const data = JSON.parse(dataJson);

  return true;
}

export { getMessagesRequest, deleteMessageRequest, createMessageRequest };
