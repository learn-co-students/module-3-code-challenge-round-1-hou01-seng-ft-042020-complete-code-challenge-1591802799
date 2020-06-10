// write your code here
/* <div class="image-container">
    <div class="image-card">
        <h2 class="title">Title of image goes here</h2>
        <img src="./assets/image-placeholder.jpg" class="image" />
        <div class="likes-section">
            <span class="likes">0 likes</span>
            <button class="like-button">♥</button>
        </div>
        <ul class="comments">
            
        </ul>
        <form class="comment-form">
            <input
                class="comment-input"
                type="text"
                name="comment"
                placeholder="Add a comment..."
            />
            <button class="comment-button" type="submit">Post</button>
        </form> */
// See the image received from the server, including its title, likes and comments when the page loads
const url = 'http://localhost:3000/images/1';
function myFetch(url, options = {}) {
    return fetch(url, options)
        .then(res => res.json());
}

myFetch(url)
.then(showProfile);

function showProfile(profile){
const title = document.querySelector('.image-card h2');
title.textContent = profile.title;

const likes = document.querySelector('.likes-section span');
likes.textContent = profile.likes;

const img = document.querySelector('.image');
img.src = profile.image;

const commendUl = document.querySelector('.image-card ul');
for (const comment of profile.comments){
    const li = document.createElement('li');
    li.innerText = comment.content;
    commendUl.append(li);
}


}

const likeBtn = document.querySelector('.likes-section button');
likeBtn.addEventListener('click', () => {
    const likeCount = document.querySelector('.likes-section span');
    let likes = parseInt(likeCount.textContent, 10);

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            likes: ++likes
        })
    };
myFetch(url, options)
    .then(profile => {
            likeCount.textContent = profile.likes;
        })
    
});

const form = document.querySelector('.image-card form');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    const input = document.querySelector('.comment-form input');
    

    const li = document.createElement('li');
    li.innerText = input.value;
    const commendUl = document.querySelector('.image-card ul');
    commendUl.append(li);
    form.reset();
})