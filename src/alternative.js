//--> displays existing toys
const collection = document.querySelector('#toy-collection')
json.forEach(toy => {

  let div = document.createElement('div')
  div.setAttribute('class', 'card')

  let h2 = document.createElement('h2')
  h2.innerHTML = toy.name

  let profile = document.createElement('img')
  profile.setAttribute('src', toy.image)
  profile.setAttribute('class', 'toy-avatar')

  let likes = document.createElement('p')
  likes.innerHTML = `${toy.likes} likes`

  let button = document.createElement('button')
  button.setAttribute('class', 'like-btn')
  button.innerHTML = 'Like'

  div.appendChild(likes)
  div.appendChild(profile)
  div.appendChild(h2)
  div.appendChild(button)
  collection.appendChild(div)
})
