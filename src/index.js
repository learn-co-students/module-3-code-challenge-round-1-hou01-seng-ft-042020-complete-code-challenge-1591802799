// write your code here

const imgUrl = "http://localhost:3000/images/1"
const cmntUrl=  "http://localhost:3000/comments"

function myFetch(url, options = {}){
    return fetch(url, options)
        .then(res => res.json());
}

myFetch(imgUrl)
        .then(img =>{
            createPage(img);
            likeEvent(img);
        })

function createPage(img){
    console.log(img)

    const title = document.querySelector(".title")
    title.textContent = img.title

    const pageImg = document.querySelector(".image")
    pageImg.src = img.image

    const likes = document.querySelector(".likes")
    likes.innerText = `${img.likes} likes`

    const ul = document.querySelector(".comments")
    ul.innerHTML = ""

    for(comment of img.comments){
        const li = document.createElement('li')

        li.innerText = comment.content 

        ul.append(li)
        
    }
    
}

const btn = document.querySelector(".like-button")


function likeEvent(img){
    btn.addEventListener('click', e =>{

        
        const likes = document.querySelector(".likes")

        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                likes: ++img.likes
            })
        }

        fetch(imgUrl, options)
            .then(likes.innerText = `${img.likes} likes`)

    })
}

const form = document.querySelector(".comment-form")

form.addEventListener('submit', e =>{
    e.preventDefault()

    const ul = document.querySelector(".comments")

    const comment = document.querySelector('.comment-input')
    const li = document.createElement('li')

    li.innerText = comment.value 

    ul.append(li)

    form.reset()
})
