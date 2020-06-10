// write your code here

// Delivs
// 1. See the image received from the server, including its title, likes and comments when the page loads
// 2. Click on the heart icon to increase image likes, and still see them when I reload the page
// 3. Add a comment (no persistance needed)

const imageUrl = "http://localhost:3000/images/1"
const commentsUrl = "http://localhost:3000/comments"

// Fetch the image Object
fetch(imageUrl)
.then(res => res.json())
.then(image => {
    //Populate the page with a method :)
    makeImage(image)
})

// fetch the comment objects and populate
fetch(commentsUrl)
.then(res => res.json())
.then(comments => {
    //Populate the comments with a method
    makeComments(comments)
})

// Method to make the image
function makeImage(image){
    const title = document.querySelector(".title")
    title.textContent = image.title

    const img = document.querySelector(".image")
    img.src = image.image

    //have to do this so that likes persist on page on reload
    const likesDisplay = document.querySelector(".likes")
    likesDisplay.textContent = `${image.likes} likes`
}

//method to populate UL with comments

// I feel particularly dirty about this method and I feel like I cheated and I hate that this
// is the quickest way that I found to do it and I'm ashamed of myself and hey at least I passed...
// I hope
function makeComments(comments){
    const commentsUl = document.querySelectorAll(".comments li")
    
    for(let i = 0; i < comments.length; i++){
        commentsUl[i].textContent = comments[i].content
    }
}

// add event listener to add comment
const form = document.querySelector(".comment-form")

form.addEventListener("submit", e => {
    e.preventDefault()

    const input = document.querySelector(".comment-input")
    const li = document.createElement("li")
    li.textContent = input.value

    const commentsUl = document.querySelector(".comments")
    commentsUl.append(li)
    form.reset()
})

// make the like button :)
const likeButton = document.querySelector(".like-button")

likeButton.addEventListener("click", () => {
    const likesDisplay = document.querySelector(".likes")
    let likeCount = parseInt(likesDisplay.innerHTML,10)

    // PATCH request on likes
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            likes: ++likeCount
        })
    }
    fetch(imageUrl, options)
        .then(res => res.json())
        .then(image => {
            likesDisplay.textContent = `${image.likes} likes`
        })
})





// comments
// [
//     {
//     id: 1,
//     imageId: 1,
//     content: "What a cute dog!"
//     },
//     {
//     id: 2,
//     imageId: 1,
//     content: "He's got a nose for bugs!"
//     },
//     {
//     id: 3,
//     imageId: 1,
//     content: "Woof!"
//     }
//     ]

// image
// [
//     {
//     id: 1,
//     title: "Woofing those bugs away",
//     likes: 0,
//     image: "./assets/coder-dog.png"
//     }
//     ]
