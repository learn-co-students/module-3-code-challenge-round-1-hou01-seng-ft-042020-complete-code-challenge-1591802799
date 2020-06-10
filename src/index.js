// write your code here
const url = 'http://localhost:3000/images/1'
const urlComments = 'http://localhost:3000/comments'

//See the image received from the server, including its title, 
//likes and comments when the page loads

fetch(url)
.then(res => res.json())
.then(dogObj => {
  addToDOM(dogObj)
  addLike(dogObj)
  addDislikeBtn(dogObj)
});

function addToDOM(dogObj) {
  const h2 = document.querySelector('.title')
  h2.innerText = dogObj.title

  const img = document.querySelector('.image')
  img.src = dogObj.image

  const likes = document.querySelector('.likes')
  likes.innerHTML = `${dogObj.likes} likes`

};

//Click on the heart icon to increase image likes, 
//and still see them when I reload the page
function addLike(dogObj) {
  const likeBtn = document.querySelector('.like-button')
  likeBtn.addEventListener('click', ()=> {
  const likes = document.querySelector('.likes')

    options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: ++dogObj.likes
      })
    }
    fetch(url, options)
    .then(res => res.json())
    .then(likes.innerHTML = `${dogObj.likes} likes`)
  })
}

//Add a comment (no persistance needed)

const form = document.querySelector('.comment-form')
const ul = document.querySelector('.comments')
ul.innerHTML = ''
form.addEventListener('submit', e => {
  e.preventDefault();

  const commentInput = document.querySelector('.comment-input').value

  const li = document.createElement('li')
  const deleteBtn = document.createElement('button')
  deleteBtn.innerText = 'Delete post'
  li.innerText = commentInput
  ul.append(li, deleteBtn)

  deleteBtn.addEventListener('click', ()=> {
    li.remove();
    deleteBtn.remove();
  })
  form.reset()
})

function addDislikeBtn(dogObj){
  const disLikeBtn = document.createElement('button')
  disLikeBtn.innerText = 'Dislike'

  const likesSection = document.querySelector('.likes-section')
  likesSection.append(disLikeBtn)

  disLikeBtn.addEventListener('click', () => {
    const likes = document.querySelector('.likes')

    options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: --dogObj.likes
      })
    }
    fetch(url, options)
    .then(res => res.json())
    .then(likes.innerHTML = `${dogObj.likes} likes`)
  })
}



