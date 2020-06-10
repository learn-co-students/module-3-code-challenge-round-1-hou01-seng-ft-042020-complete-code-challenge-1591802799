// write your code here

const likes = document.querySelector(".likes")
const urlDog = "http://localhost:3000/images/1"
const urlCom = "http://localhost:3000/comments/1"

function getThis(url,options = {}){
return fetch(url,options)
.then(res => res.json())
}

getThis(urlDog)
.then (pup => {
    showPup(pup)
})

getThis(urlCom)
.then (comment => {
    addComment(comment.content)
})

function showPup(obj){
const title = document.querySelector(".title")
const image = document.querySelector(".image")
const comments = document.querySelector(".comments")
const likebttn = document.querySelector(".like-button")
const form = document.querySelector(".comment-form")
const commentinput = document.querySelector(".comment-input")
title.innerText = obj.title
image.src = obj.image
likes.innerText = `${obj.likes} Likes` 
comments.innerText = ''

likebttn.addEventListener("click", () => like(obj))

form.addEventListener("submit", e => {
    e.preventDefault()
    addComment(commentinput.value)
    form.reset()
})    
}

function addComment(obj){
const addli = document.createElement("li")
const comments = document.querySelector(".comments")
addli.innerText = obj
comments.append(addli)

}

function like(obj){
    const options = {
        method: "PATCH",
        headers:{
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            likes: ++obj.likes
    
        })
        
    }
    getThis(urlDog,options)
    .then(pup => {
        likes.innerText = `${pup.likes} Likes`
    })
    
}