const url = 'http://localhost:3000/images/1'

function myFetch(url, options={}){
    return fetch(url, options)
    .then(res => res.json())
}

myFetch(url)
.then(showImage)

function showImage(post){
    const imageTitle = document.querySelector('.title')
    imageTitle.innerHTML = post.title

    const imageLikesSpan = document.querySelector('.likes')
    imageLikesSpan.innerHTML = `${post.likes} likes`

    const imageComments = document.querySelector('.comments')
    imageComments.innerHTML = ''
    for (const pojo of post.comments){
        const commentLi = document.createElement('li')
        commentLi.innerHTML = pojo.content
        imageComments.append(commentLi)
    }
}

const commentsUrl = 'http://localhost:3000/comments'
function addComment(comment){
    const commentOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imageId: 1,
            content: comment
        })
    }

    myFetch(commentsUrl, commentOptions)
    .then(post => {
        const commentLi = document.createElement('li')
        commentLi.innerHTML = comment
        const commentsUL = document.querySelector('.comments')
        commentsUL.append(commentLi)
    })
}

const form = document.querySelector('.comment-form')
form.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.querySelector('.comment-input')
    addComment(input.value)
    form.reset()
})

const downVote = document.createElement('button')
downVote.className= 'dislike-button'
downVote.innerHTML = '💔'
downVote.addEventListener('click', () => {
    myFetch(url)
    .then(post => {
            let newLikeCount = --post.likes
            if (newLikeCount < 0){
                newLikeCount = 0
            }
            
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                likes: newLikeCount
            })
        }

        myFetch(url, options)
        .then(post => {
            const imageLikesSpan = document.querySelector('.likes')
            imageLikesSpan.innerHTML = `${post.likes} likes`
        })
    })
})


const likesSection = document.querySelector('.likes-section')
likesSection.append(downVote)

const likeBtn = document.querySelector('.like-button')
likeBtn.addEventListener('click', () => {
    myFetch(url)
    .then(post => {
        let newLikeCount = ++post.likes
        if (newLikeCount < 0){
            newLikeCount = 0
        }
            
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                likes: newLikeCount
            })
        }

        myFetch(url, options)
        .then(post => {
            const imageLikesSpan = document.querySelector('.likes')
            imageLikesSpan.innerHTML = `${post.likes} likes`
        })
    })
})


// Delete a comment
// To persist this, you will have to make a DELETE request to the /comments/:id endpoint.
// dataset