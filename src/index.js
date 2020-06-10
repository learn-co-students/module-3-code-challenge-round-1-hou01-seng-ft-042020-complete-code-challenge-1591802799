// write your code here
const url = 'http://localhost:3000/images/1'
fetch(url)
  .then(res => res.json())
  .then(instaObj => {
    displayImage(instaObj);
    handleLikes(instaObj.likes);
    handleComments(instaObj.comments);
  })

const displayImage = (instaObj) => {
  console.log(instaObj)

  const title = document.querySelector('.title');
  const image = document.querySelector('.image');
  
  image.src = instaObj.image
  title.textContent = instaObj.title;
  
  displayComments(instaObj.comments)
}

const handleLikes = (likes) => {
  const likeBtn = document.querySelector('.like-button');
  const likeSpan = document.querySelector('.likes');
  likeSpan.textContent = `${likes} likes`

  likeBtn.addEventListener('click', () => {
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: likes += 1
      })
    })
    .then(res => res.json())
    .then((instaObj) => {
      console.log(instaObj)
      likeSpan.textContent = `${instaObj.likes} likes`
    })
  })
}

const handleComments = (comments) => {
  const form = document.querySelector('.comment-form');
  const input = document.querySelector('.comment-form .comment-input');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    comments.push({
      content: input.value
    });
    displayComments(comments)    
    form.reset();
  });
}

const displayComments = (comments) => {
  const commentsUl = document.querySelector('.comments');
  commentsUl.textContent = '';

  for (const commentObj of comments) {
    const li = document.createElement('li');
    li.textContent = commentObj.content;
    commentsUl.append(li);
  } 
}