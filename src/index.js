// write your code here
const gramUrl = "http://localhost:3000"
const commentsUl = document.querySelector(".comments")


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

    const likeSpan = document.querySelector(".likes")
    likeSpan.innerText = `${pic.likes} likes`

    const likeBtn = document.querySelector(".like-button")
    likeBtn.dataset.id = pic.id
    likeBtn.addEventListener("click", () => {
        addLike(pic.id, ++pic.likes)
        likeSpan.innerText = `${pic.likes} likes`
    })

    const unLikeBtn = document.createElement("button")
    unLikeBtn.className = "like-button"
    unLikeBtn.innerText = "👎"
    likesSection.append(unLikeBtn)

    unLikeBtn.addEventListener("click", () => {
        unLike(pic.id, --pic.likes)
        likeSpan.innerText = `${pic.likes} likes`
    })

    const form = document.querySelector(".comment-form")
    form.addEventListener("submit", e => {
        e.preventDefault()
        addComment(pic.id, e.target[0].value)
        e.target.reset()
    })

    commentsUl.innerHTML = ""
    pic.comments.forEach(renderComments)
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
        .then()
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
        .then()
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
        .then(renderComments)
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