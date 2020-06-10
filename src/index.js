// write your code here
// {/* <body>
// <!-- logo -->
// <img class="logo" src="assets/flatagram-logo.png" />

// </body> */}


function myFetch(url, options={}){
  return fetch(url, options)
  .then(res => res.json())
}

function myOptions(method, body){
  return {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(body)
  }
}

const imgUrl = 'http://localhost:3000/images/1'

myFetch(imgUrl)
.then(showImg)

// - See the image received from the server, including its 
// title, likes and comments when the page loads

function showImg(imgObj){
  const h2Title = document.querySelector('.title')
  h2Title.textContent = imgObj.title

  const imgImage = document.querySelector('.image')
  imgImage.src = imgObj.image

  const spanLikes = document.querySelector('.likes')
  spanLikes.textContent = imgObj.likes

  const ulComments = document.querySelector('.comments')
  ulComments.textContent = ''
  for(const comment of imgObj.comments){
    createComment (comment)
  }

}

// - Click on the heart icon to increase image likes, 
// and still see them when I reload the page

const btnLike = document.querySelector('.like-button')
btnLike.addEventListener('click', () => {

  let spanLikes = document.querySelector('.likes')
  let likes = ++ spanLikes.textContent

  const options = myOptions('PATCH', {likes: likes})
  myFetch(imgUrl, options)
  .then(imgObj => { spanLikes.textContent = imgObj.likes})
})

// - Add a comment (no persistance needed)

const formImg = document.querySelector('.comment-form')
formImg.addEventListener('submit', e => {
  e.preventDefault()

  const inputComment = document.querySelector('.comment-input').value

  const options = myOptions('POST', {content: inputComment})

  const commentUrl = 'http://localhost:3000/comments'

  myFetch(commentUrl, options)
  .then(commentObj => { 
    formImg.reset()
    createComment (commentObj)
  })

})

function createComment (commentObj) {
  const ulComments = document.querySelector('.comments')
  let liComment = document.createElement('li')
  liComment.textContent = commentObj.content
  ulComments.append(liComment)
}

// <!-- image card -->
// <div class="image-container">
//   <div class="image-card">
//     <h2 class="title">Title of image goes here</h2>
//     <img src="./assets/image-placeholder.jpg" class="image" />
//     <div class="likes-section">
//       <span class="likes">0 likes</span>
//       <button class="like-button">♥</button>
//     </div>
//     <ul class="comments">
//       <li>Get rid of these comments</li>
//       <li>And replace them with the real ones</li>
//       <li>From the server</li>
//     </ul>
//     <form class="comment-form">
//       <input
//         class="comment-input"
//         type="text"
//         name="comment"
//         placeholder="Add a comment..."
//       />
//       <button class="comment-button" type="submit">Post</button>
//     </form>
//   </div>
// </div>
