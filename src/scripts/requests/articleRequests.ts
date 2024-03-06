import { url } from "../utilities.js";

async function newArticleRequest(articleContent: FormData) {
  try {
    const token = localStorage.getItem("userToken")!;

    const res = await fetch(url + "/articles/", {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
      body: articleContent,
    });

    const dataJson = await res.text();
    const data = JSON.parse(dataJson);

    console.log(data);

    if (res.status !== 201) {
      return false;
    }

    if (data.status === "success") {
      return true;
    }

    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

async function deleteArticleRequest(id: string) {
  const token = localStorage.getItem("userToken");
  const res = await fetch(url + "/articles/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const dataJson = await res.text();
  const data = JSON.parse(dataJson);

  console.log(data);

  if (res.status !== 200) {
    return false;
  }

  return true;
}

async function getArticleRequest(id: string) {
  const res = await fetch(url + "/articles/" + id, {
    method: "GET",
  });

  if (res.status !== 200) {
    return false;
  }

  const dataJson = await res.text();
  const data = JSON.parse(dataJson);

  return data.data.article;
}

async function getArticlesRequest() {
  const res = await fetch(url + "/articles/", {
    method: "GET",
  });

  const dataJson = await res.text();
  const data = JSON.parse(dataJson);

  if (res.status !== 200) {
    return false;
  }


  return data.data.articles;
}

async function updateArticleRequest(
  articleId: string,
  articleContent: FormData
) {
  try {
    const token = localStorage.getItem("userToken")!;

    console.log(articleContent);

    const res = await fetch(url + "/articles/" + articleId, {
      method: "PATCH",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
      body: articleContent,
    });

    const dataJson = await res.text();
    const data = JSON.parse(dataJson);

    console.log(data);

    if (res.status !== 200) {
      return false;
    }

    if (data.status === "success") {
      return true;
    }

    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

export {
  newArticleRequest,
  deleteArticleRequest,
  getArticleRequest,
  updateArticleRequest,
  getArticlesRequest,
};
