// write your code here
const url= 'http://localhost:3000/images/1'

fetch (url)
.then(resp=>resp.json())
.then(dog => { 
    showDog(dog)
})

function showDog(dog){
    const title=document.querySelector(".title")
    const img=document.querySelector(".image")
    const likes=document.querySelector(".likes")
    const commentsUl=document.querySelector(".comments")
    commentsUl.textContent=""

    title.textContent=dog.title 
    img.src=dog.image 
    likes.textContent=dog.likes 

    dog.comments.forEach(comment=>{
        const li=document.createElement("li")
        li.textContent=comment.content 
        commentsUl.append(li)
    })
}

// Click on the heart icon to 
// increase image likes, and still see them when I reload the page

const likeBtn=document.querySelector(".like-button")
likeBtn.addEventListener("click", ()=>{
    const likesSpan= document.querySelector(".likes")
    let likes=parseInt(likesSpan.innerHTML, 10)
    options={
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, 
        body: JSON.stringify({
            "likes": ++likes 
        })
    }

    fetch(url, options)
    .then(resp => resp.json())
    .then(dog =>{
        likesSpan.textContent=likes 
    })
})

// Add a comment (no persistance needed)


const commentForm=document.querySelector(".comment-form")

commentForm.addEventListener("submit", ()=>{
    const commentInput=document.querySelector(".comment-input").value 
    const commentUl=document.querySelector(".comments")
    const commentLi=document.createElement("li")
    
    
    options={
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, 
        body: JSON.stringify({
            "content": commentInput,
            "imageId": 1
        })
    }

    fetch('http://localhost:3000/comments', options)
    .then(resp=>resp.json())
    .then(dog => {
        commentLi.textContent=commentInput 
        commentUl.append(commentLi)
    })
})