const URL = 'https://striveschool-api.herokuapp.com/api/product'
const addressBarContent = new URLSearchParams(location.search)
const productId = addressBarContent.get('id')
//Prendo tutti gli span che mi servono

const brand = document.getElementById("brand")
const names = document.getElementById("name")
const description = document.getElementById("description")
const price = document.getElementById("price")
const createdAt = document.getElementById("createdAt")
const updatedAt = document.getElementById("updatedAt")
const userId = document.getElementById("userId")
const id = document.getElementById("_id")

const loadPage = function()
{
  //Riempio i campi del form
  fetch(URL + "/" + productId, {
    headers: 
    {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3Yzc0MzEyYjUwYzAwMTQ5ZTRmNDYiLCJpYXQiOjE2ODg3MjA3MjIsImV4cCI6MTY4OTkzMDMyMn0.3ihG5KxYcDMpdVftFuRtRJZ6gHhfMSPZwW3jIGsAl0M",
    },
  })
    .then((res) => {
      if (res.ok) 
        return res.json()
      else 
        throw new Error("Errore nel recupero dei dettagli dell'evento")
    })
    .then((detail) => {
      //Carico l'immagine
      document.getElementById("img").setAttribute("src", detail.imageUrl)

      //Inserisco i miei valori
      brand.innerHTML = detail.brand
      names.innerHTML = detail.name
      description.innerHTML = detail.description
      price.innerHTML = detail.price
      createdAt.innerHTML = detail.createdAt
      updatedAt.innerHTML = detail.updatedAt
      userId.innerHTML = detail.userId
      id.innerHTML = detail._id
    })
    .catch((err) => console.log(err))
}

loadPage()