const url = 'http://localhost:3000/images/1'

fetch(url)
    .then(res => res.json())
    .then(json =>{
    showPicInfo(json)

    clearComments()
    });


function showPicInfo(data){
    const title = document.querySelector('.title')
    title.textContent = data.title

    const likes = document.querySelector('.likes')
    likes.textContent = data.likes
    
    const image = document.querySelector('.image')
    image.src = data.image
};

function clearComments(){
    const clearCom = document.querySelectorAll('.comments li')
    clearCom[0].textContent = ''
    clearCom[1].textContent = ''
    clearCom[2].textContent = ''  
}
const formSel= document.querySelector('.comment-form')
formSel.addEventListener('submit', e =>{
    e.preventDefault();
    const input = document.querySelector('.comment-input')
    addComment(input.value)
    formSel.reset()
});


function addComment(comment){
    const createCom = document.createElement('li')
    createCom.textContent = comment
    const grabSec = document.querySelector('.comments')
    grabSec.append(createCom)
}


const likeBtn = document.querySelector('.like-button')
likeBtn.addEventListener('click', () => {
    let likes = document.querySelector('.likes').textContent
    likes.textContent = ++likes
})
// const options = {
//     method 
// }
// fetch(url, options)