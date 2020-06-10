const url = "http://localhost:3000/images/1?_embed=comments";
const imgUrl = "http://localhost:3000/images/1";

function myFetch(url, options = {}) {
  return fetch(url).then((res) => res.json());
}

myFetch(url).then((image) => {
  showImage(image);
});

function showImage(image) {
  const title = document.querySelector(".title");
  title.textContent = image.title;

  const img = document.querySelector(".image");
  img.src = image.image;

  const likes = document.querySelector(".likes");
  likes.textContent = `${image.likes} likes`;

  const btn = document.querySelector(".like-button");

  btn.addEventListener("click", (e) => {
    const patchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: ++image.likes,
      }),
    };

    fetch(imgUrl, patchOptions)
      .then((res) => res.json())
      .then((image) => {
        likes.textContent = `${image.likes} likes`;
      });
  });

  const ul = document.querySelector(".comments");
  ul.innerHTML = "";

  const comments = image.comments;

  for (const comment of comments) {
    const li = document.createElement("li");
    li.textContent = comment.content;
    ul.append(li);
  }
}

const form = document.querySelector(".comment-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newComment = form[0].value;
  const ul = document.querySelector(".comments");

  //core deliverable

  // const li = document.createElement("li");
  // li.textContent = newComment;
  // ul.append(li);
  // form.reset();

  //advanced

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      imageId: 1,
      content: newComment,
    }),
  };

  fetch("http://localhost:3000/comments/?imageId=1", postOptions)
    .then((res) => res.json())
    .then(() => {
      const li = document.createElement("li");
      li.textContent = newComment;
      ul.append(li);
      form.reset();
    });
});
