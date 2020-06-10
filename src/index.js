// write your code here
const url= 'http://localhost:3000/images/1'

function fetching(){
    return fetch(url, options={})
    .then(resp => resp.json())
}

// fetch (url)
// .then(resp=>resp.json())
fetching()
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
        showComments(comment)
    })
}

function showComments(comment){
    const commentsUl=document.querySelector(".comments")
        const li=document.createElement("li")
        li.textContent=comment.content 
        li.dataset.dataId=comment.id
        
        commentsUl.append(li)
        li.addEventListener("click", (e)=>{
            const liId=e.target.dataset.dataId 
            const options={
                method:"DELETE"
            };
            fetch( `http://localhost:3000/comments/${liId}`, options)
            .then(resp=>resp.json)
            .then(comment=>{
                li.remove()
            })
        })
}
// Click on the heart icon to 
// increase image likes, and still see them when I reload the page

const likeBtn=document.querySelector(".like-button")
likeBtn.addEventListener("click", ()=>{
    const likesSpan= document.querySelector(".likes")
    let likes=parseInt(likesSpan.innerHTML, 10)
    const options={
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

commentForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const commentInput=document.querySelector(".comment-input").value 
    const commentUl=document.querySelector(".comments")
    const commentLi=document.createElement("li")
    
    
    const options={
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
    commentForm.reset();
})

const downVoteBtn=document.createElement("button")
downVoteBtn.textContent="Unlike Dog"

const likesSection=document.querySelector(".likes-section")
likesSection.append(downVoteBtn)

downVoteBtn.addEventListener("click", ()=>{
    const likesSpan= document.querySelector(".likes")
    let likes=parseInt(likesSpan.innerHTML, 10)
    const options={
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, 
        body: JSON.stringify({
            "likes": --likes 
        })
    }

    fetch(url, options)
    .then(resp => resp.json())
    .then(dog =>{
        likesSpan.textContent=likes 
    })
})

