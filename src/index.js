// write your code here
const gramUrl = "http://localhost:3000"
const commentsUl = document.querySelector(".comments")
const likeSpan = document.querySelector(".likes")
const form = document.querySelector(".comment-form")

// const imgContainer = document.querySelector(".image-container")

// {
//     "id": 1,
//     "title": "Woofing those bugs away",
//     "likes": 0,
//     "image": "./assets/coder-dog.png",
//     "comments": [
//     {
//     "id": 1,
//     "imageId": 1,
//     "content": "What a cute dog!"
//     },
//     {
//     "id": 2,
//     "imageId": 1,
//     "content": "He's got a nose for bugs!"
//     },
//     {
//     "id": 3,
//     "imageId": 1,
//     "content": "Woof!"
//     }
//     ]
//     }

// Dynamically fetches single image from server
function getSingleImage(id) {
    fetch(gramUrl + `/images/${id}`)
        .then(res => res.json())
        .then(renderImage)
}   

// renders image on page
function renderImage(pic) {
    const likesSection = document.querySelector(".likes-section")

    const title = document.querySelector(".title")
    console.log(title)
    title.innerText = pic.title

    const img = document.querySelector(".image")
    img.src = pic.image

    likeSpan.innerText = `${pic.likes} likes`

    const likeBtn = document.querySelector(".like-button")
    likeBtn.dataset.id = pic.id
    likeBtn.addEventListener("click", () => {
        addLike(pic.id, ++pic.likes)
    })

    const unLikeBtn = document.createElement("button")
    unLikeBtn.className = "like-button"
    unLikeBtn.innerText = ":("
    likesSection.append(unLikeBtn)

    unLikeBtn.addEventListener("click", () => {
        unLike(pic.id, --pic.likes)
    })


    form.addEventListener("submit", e => {
        e.preventDefault()
        addComment(pic.id, e.target[0].value)
    })

    // commentsUl.dataset.id = pic.id
    commentsUl.innerHTML = ""
    pic.comments.forEach(comment => renderComments(comment))
}

// renders comments on page
function renderComments(comment) {
    const li = document.createElement("li")
    li.innerText = comment.content
    li.dataset.id = comment.id
    commentsUl.append(li)
    li.addEventListener("click", e => {
        deleteComment(e.target.dataset.id)
        e.target.remove()
    })
}

// add likes to the server
function addLike(imageId, num) {
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            likes: num
        })
    };
    fetch(gramUrl + `/images/${imageId}`, options)
        .then(res => res.json())
        .then(likeSpan.innerText = `${num} likes`)
}

// removes likes from server
function unLike(imageId, num) {
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            likes: num
        })
    };
    fetch(gramUrl + `/images/${imageId}`, options)
        .then(res => res.json())
        .then(likeSpan.innerText = `${num} likes`)
}

// add comment to server
function addComment(picId, comment) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            imageId: picId,
            content: comment
        })
    };
    fetch(gramUrl + `/comments`, options)
        .then(res => res.json())
        .then(comment => {
            renderComments(comment)
            form.reset()
        })
}

// delete comment from server
function deleteComment(id) {
    const options = {
        method: "DELETE"
    };
    fetch(gramUrl + `/comments/${id}`, options)
        .then(res => res.json())
        .then()
}


getSingleImage(1)