// write your code here

let url = 'http://localhost:3000/images/1';
//let urlComment = 'http://localhost:3000/comments';

fetch(url)
    .then(res => res.json())
    .then(puppyJson => {showPuppy(puppyJson)}
       );

// fetch(urlComment)
//     .then(res => res.json())
//     .then( commentJson => {showComment(commentJson)});

// function showComment (commentObj){
//     let puppyComment = document.querySelector('.comments');
//     puppyComment.textContent = '';

//     for (const comment of commentObj.content){
//         let li = document.createElement('li');
//         li.textContent = comment;
//         puppyComment.append(li)
//     }

// }

function showPuppy (puppyObj){

    let puppyContainer = document.querySelector('.image-card');

    let puppyImage = document.querySelector('.image');
    puppyImage.src = puppyObj.image;

    let puppyTitle = document.querySelector('.title');
    puppyTitle.textContent = puppyObj.title;

    let puppyLikes = document.querySelector('.likes-section');
    puppyLikes.textContent = `${puppyObj.likes} likes`;

    puppyContainer.append(puppyTitle, puppyImage, puppyLikes);

    let likeBtn = document.getElementsByClassName('like-button');
    
    likeBtn.addEventListener('click', e => {
       let options = {
           method: 'PATCH',
           headers: {
               "content-type": "application/json",
               "Accept": "application/json"
           },
           body: JSON.stringify({
               likes: ++ puppyObj.likes
           })
       }
       fetch(`${url}/1`)
        .then(res => res.json())
        .then( puppy => {puppyLikes.textContent = `${puppyObj.likes} likes`})
    });
    
    //puppyContainer.append(puppyTitle, puppyImage, puppyLikes);
}



// [
//     {
//       "id": 1,
//       "title": "Woofing those bugs away",
//       "likes": 0,
//       "image": "./assets/coder-dog.png"
//     }
//   ]

// {
//     "id": 1,
//     "imageId": 1,
//     "content": "What a cute dog!"
//   },