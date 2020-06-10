// write your code here


const url = 'http://localhost:3000/images/1'
const commentUrl = 'http://localhost:3000/comments'




fetch(url)
    .then(res => res.json())
    .then(showImage)

function showImage(image) {
    const h2 = document.querySelector('.title')
    const img = document.querySelector('.image')
    const likes = document.querySelector('.likes')
    const comments = document.querySelector('.comments')

    h2.textContent = image.title
    img.src = image.image
    likes.textContent = image.likes

    comments.textContent = ''
    fetch(commentUrl)
    .then(res => res.json())
    .then(comments => {

        for(comment of comments) {
            const li = document.createElement('li')
            li.textContent = comment.content
            const allComment = document.querySelector('.comments')
            allComment.append(li)
        }
    })

}

// LIKING THE IMAGE

const likeBtn = document.querySelector('.like-button')

likeBtn.addEventListener('click', () => {
    const likes = document.querySelector('.likes')
    let addLikes = parseInt(likes.innerHTML, 10)

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            likes: ++addLikes
        })
    }

    fetch(url, options)
        .then(res => res.json())
        .then(image => {
            likes.textContent = image.likes
        })

})


// ADDING COMMENT WITH NO PERSISTENCE

const form = document.querySelector('.comment-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const newComment = document.querySelector('.comment-input').value
    const newLi = document.createElement('li')
    newLi.innerText = newComment
    const comments = document.querySelector('.comments')
    comments.append(newLi)
    form.reset()


})




// PERSISTING A COMMENT
function addComment(comment) {
    const form = document.querySelector('.comment-form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const newComment = document.querySelector('.comment-input').value
    options = {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            comment: newComment
        })
    }

    fetch(commentUrl, options)
        .then(res => res.json())
        .then(comments => {
            comment.textContent = newComment
        })
})

}






// UNLIKING THE IMAGE (EVENT SET ON THE NUMBER OF LIKES)

const likes = document.querySelector('.likes')

likes.addEventListener('click', () => {
    const likes = document.querySelector('.likes')
    let removeLikes = parseInt(likes.innerHTML, 10)

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            likes: --removeLikes
        })
    }

    fetch(url, options)
        .then(res => res.json())
        .then(image => {
            likes.textContent = image.likes
        })

})



// DELETING A COMMENT


const comm = document.querySelector('.comments')

comm.addEventListener('click', () => {

    fetch(`${commentUrl}/${id}`, {
        method: 'DELETE'
    })

    comm.remove()


})