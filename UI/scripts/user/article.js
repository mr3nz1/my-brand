let articles;
let targetArticle;

function formatDate(date) {
  const options = { month: "short", day: "numeric", year: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

function getArticleIdFromURL() {
  const hash = window.location.hash.substring(1); // Get the hash part excluding the '#'
  const params = new URLSearchParams(hash);

  // Assuming 'articleId' is the parameter you want to extract
  const articleId = params.get("articleId");

  return articleId;
}

function loadArticle(articleId) {
  const articleTitleElement = document.getElementById("articleTitle");
  const articleDescriptionElement = document.getElementById(
    "articleDescriptionElement"
  );
  const articleCreatedDateElement = document.getElementById("created_at");
  const articleContentElement = document.getElementById("article_text_content");
  const articleImageContainerElement = document.getElementById(
    "bannerImageContainer"
  );

  articles = JSON.parse(localStorage.getItem("articles"));
  targetArticle = articles.filter((article) => article.id === articleId)[0];

  articleTitleElement.textContent = targetArticle.title;
  articleDescriptionElement.textContent = targetArticle.description;
  articleCreatedDateElement.textContent = targetArticle.created_at;
  articleContentElement.innerHTML = targetArticle.content;

  const image = document.createElement("img");
  image.setAttribute("src", targetArticle.image);

  articleImageContainerElement.appendChild(image);
  loadComments();
}

function loadComments() {
  const comments = JSON.parse(localStorage.getItem("comments"));
  const commentsForThisArticle = comments.filter(
    (comment) => comment.articleId === targetArticle.id
  );


  const listOfComments = document.querySelector(".list_of_comments");
  let commentsHtmlElements = "";

  commentsForThisArticle.forEach((comment) => {
    console.log(comment);
    commentsHtmlElements += `<div class="comment">
    <div class="comment_content_container">
      <div class="message_user_image">
        <img src="../assets/images/sandra.jpg" alt="">
      </div>

      <div class="single_comment_text_container">
        <div class="single_comment_title_and_date">
          <h4>${comment.fullName}</h4>
          <p>${comment.created_at}</p>
        </div>

        <p>
          ${comment.comment}
        </p>

        <div class="single_message_actions">
          <div class="underline_on_hover">
            <img src="../assets/icons/reply.png" alt="">
            <span>Reply</span>
          </div>

          <span class="dot_separator"></span>

          <div class="underline_on_hover">
            <img src="../assets/icons/like.png" alt="">
            <span>40 likes</span>
          </div>

          <span class="dot_separator"></span>

          <div class="underline_on_hover">
            <img src="../assets/icons/dislike.png" alt="">
          </div>
        </div>
      </div>

    </div>

  </div>`;
  });

  listOfComments.innerHTML = commentsHtmlElements;
}

function addComment(comment) {
  console.log(targetArticle.id)
  let comments = JSON.parse(localStorage.getItem("comments"));
  let updatedComments = [
    ...comments,
    {
      ...comment,
      articleId: targetArticle.id,
      created_at: formatDate(new Date()),
    },
  ];
  localStorage.setItem("comments", JSON.stringify(updatedComments));
  loadComments()
}

window.addEventListener("DOMContentLoaded", () => {
  const articleId = getArticleIdFromURL();

  if (!articleId) {
    location.href = "../";
  }

  loadArticle(articleId);
});

const form = document.querySelector(".add-comment-container form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll(".add-comment-container form input");

  let comment = {};

  inputs.forEach((input) => {
    comment[input.name] = input.value;
  });

  addComment(comment);

  inputs.forEach((input) => {
    input.value = "";
  });
});