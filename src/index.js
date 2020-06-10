// write your code here

const url = "http://localhost:3000/images/1";

function showImage(image){
    const h2 = document.querySelector('.title');
    h2.innerText = image.title;

    const img = document.querySelector('.image');
    img.src = image.image;

    const likes = document.querySelector('.likes');
    likes.textContent = image.likes;

    const commentsUl = document.querySelector('ul.comments');
    commentsUl.innerText = "";

    for (const comment of image.comments){
        const li = document.createElement('li');

        li.innerText = comment.content;
        commentsUl.append(li);
    }

}

fetch(url)
    .then(res => res.json())
    .then(showImage);


const likeBtn = document.querySelector('.like-button');

likeBtn.addEventListener('click', () => {
    const likesSpan = document.querySelector('.likes');
    let likes = parseInt(likesSpan.innerHTML, 10)   

    const options = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            likes: ++likes
        })
    };

    fetch(url, options)
        .then(res => res.json())
        .then(image => {
            likesSpan.textContent = image.likes;
        });
});


function addComment(comment){
    const li = document.createElement('li');
    li.innerText = comment;

    const ul = document.querySelector('ul.comments');
    ul.append(li);
}

const form = document.querySelector('.comment-form');
form.addEventListener('submit', e => {
    e.preventDefault(); 

    const input = document.querySelector('.comment-input');
    addComment(input.value);
    form.reset(); 
});





{/* <form class="comment-form">
<input
  class="comment-input"
  type="text"
  name="comment"
  placeholder="Add a comment..."
/>
<button class="comment-button" type="submit">Post</button>
</form> */}


// {
//     "id": 1,
//     "title": "Woofing those bugs away",
//     "likes": 0,
//     "image": "./assets/coder-dog.png"
//   }

{/* <div class="image-container">
<div class="image-card">
  <h2 class="title">Title of image goes here</h2>
  <img src="./assets/image-placeholder.jpg" class="image" />
  <div class="likes-section">
    <span class="likes">0 likes</span>
    <button class="like-button">♥</button>
  </div>
  <ul class="comments">
    <li>Get rid of these comments</li>
    <li>And replace them with the real ones</li>
    <li>From the server</li>
  </ul> */}