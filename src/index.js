document.addEventListener('DOMContentLoaded', function() {

//--> grabbing json data from database
URL = 'http://localhost:3000/toys'
fetch(URL)
.then(resp => resp.json())
.then(json => renderToys(json))

//--> parent function that gets called using json data
function renderToys(json) {

  //--> displays all toys
  const collection = document.querySelector('#toy-collection')
  json.forEach(toy => {
    collection.innerHTML += `
    <div class="card">
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes} Likes <p>
    <button class="like-btn" id="${toy.id}">Like <3</button>
    </div>
    `
  })

  //--> creates a new toy
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false
  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'

      const addToyForm = document.querySelector('.add-toy-form')
      addToyForm.addEventListener('submit', function(event) {
          event.preventDefault()

          const data = {
            name: event.target.name.value,
            image: event.target.image.value,
            likes: 0
          }
          console.log(data)

          // 3. Make POST request
          fetch(URL, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          }) // 4. render Jessie to the page immediately after post request
          .then(function() {
            fetch(URL)
            .then(resp => resp.json())
            .then(toys => {
              collection.innerHTML = ""
              toys.forEach(toy => {
                  collection.innerHTML += `
                  <div class="card">
                  <h2>${toy.name}</h2>
                  <img src="${toy.image}" class="toy-avatar">
                  <p>${toy.likes} Likes <p>
                  <button class="like-btn" id="${toy.id}">Like <3</button>
                  </div>
                  `
              })
            })
          })
      })

    } else {
      toyForm.style.display = 'none'
    }
  })

} // end of renderToys function


//---> event delegation
document.addEventListener('click', function(event) {
  
  if (event.target.className === 'like-btn') {

    // 1. Grab like count element
    const likeCountDiv = event.target.parentNode.parentNode.children[2]

    // 2. Get number from element
    const likeCount = parseInt(likeCountDiv.innerText)
    const newLikeCount = likeCount + 1

    // 3. increment like count
    likeCountDiv.innerText = `${newLikeCount} likes`

    // 4. Make PATCH request
    fetch(`${URL}/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({likes: newLikeCount})
    })
  }
})

}) // end of DOMContentLoaded function
