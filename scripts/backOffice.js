//Mi prendo i tag input
const names = document.getElementById('name')
const description = document.getElementById('description')
const brand = document.getElementById('brand')
const image = document.getElementById('image')
const price = document.getElementById('price')
//Mi prendo l'url e l'id dall'address bar
const URL = 'https://striveschool-api.herokuapp.com/api/product'
const addressBarContent = new URLSearchParams(location.search)
const productId = addressBarContent.get('id')

//Viene chiamato dall'if a riga 61 (per rendere il codice più chiaro)
const alterHTML = function()
{
  //Modifico l'html a schermo
  document.getElementById('submit').innerText = 'Modifica prodotto'
  document.getElementById('title').innerText = 'Modifica prodotto'

  //Aggiungo il pulsante per cancellare
  const submitSection = document.getElementById("cancella")
  submitSection.classList.toggle("d-none")
  const deleteButton = document.createElement("button")
  deleteButton.innerHTML = "Cancella"
  deleteButton.classList.add("btn")
  deleteButton.classList.add("btn-danger")
  deleteButton.id = "button-delete"
  submitSection.appendChild(deleteButton)
}

//Viene chiamato dall'if a riga 61 (per rendere il codice più chiaro)
const fillForm = function()
{
  //Riempio i campi del form
  fetch(URL + "/" + productId, {
    headers: 
    {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3Yzc0MzEyYjUwYzAwMTQ5ZTRmNDYiLCJpYXQiOjE2ODg3MjA3MjIsImV4cCI6MTY4OTkzMDMyMn0.3ihG5KxYcDMpdVftFuRtRJZ6gHhfMSPZwW3jIGsAl0M",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json() // ho bisogno dei dettagli dell'evento!
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'evento")
      }
    })
    .then((detail) => {
      console.log('DETAIL', detail)
      //Inserisco i miei valori
      names.value = detail.name
      description.value = detail.description
      brand.value = detail.brand
      image.value = detail.imageUrl
      price.value = detail.price
    })
    .catch((err) => console.log(err))
}

//Se è presente un event ID, significa che stiamo modificando la pagina e dobbiamo cambiare cosa appare a schermo
if (productId) 
{
    alterHTML()
    fillForm()
}

// Mi prendo il form e ci aggiungo l'evento
document.getElementById('form').addEventListener('submit', function (e) 
{
  e.preventDefault()

  // Mi creo delle variabili su cui mi segno l'url ed il method, se c'è un id nell'url, sarà un PUT, altrimenti un POST
  const URL = 'https://striveschool-api.herokuapp.com/api/product'

  let url = "", method = ""
  if (productId)
  {
    url = URL + "/" + productId
    method = 'PUT'
  } 
  else
  {
    url = URL
    method = 'POST'
  } 

  //Mi carico i valori del prodotto in un oggetto
  const Product = 
  {
    name: names.value,
    description: description.value,
    brand: brand.value,
    imageUrl: image.value,
    price: price.value,
  }

  console.log('Prodotto ', Product)
  console.log(method)

  fetch(url, 
  {
    method: method,                // dichiaro che la mia operazione è di CREAZIONE, quindi uso il method 'POST'
    body: JSON.stringify(Product), // il body accetta solamente una stringa su HTTP
    headers: 
    {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3Yzc0MzEyYjUwYzAwMTQ5ZTRmNDYiLCJpYXQiOjE2ODg3MjA3MjIsImV4cCI6MTY4OTkzMDMyMn0.3ihG5KxYcDMpdVftFuRtRJZ6gHhfMSPZwW3jIGsAl0M",
        'Content-Type': 'application/json',
    },
    })

    .then((res) => 
    {
      if (res.ok) 
      {
        alert("Prodotto aggiunto!")
        //Svuoto gli input del form
        names.value = ''
        description.value = ''
        brand.value = ''
        image.value = ''
        price.value = ''
      } 
      else 
        throw new Error("Errore nel salvataggio del prodotto")
    })
    .catch((err) => 
    {
      console.log(err)
    })
})

//Mi prendo il reset e cancello i dati del form
document.getElementById("reset").addEventListener("click", function(e){
    e.preventDefault()
    if(confirm("Sicuro di voler resettare?") == true)
    {
      names.value = ""
      description.value  = ""
      brand.value = "" 
      image.value = ""
      price.value = ""      
    }

})

//Mi prendo il tasto cancella e ci aggiungo l'evento
document.getElementById("button-delete").addEventListener("click", function(e){
    e.preventDefault()

    if(confirm("Sicuro di voler eliminare il prodotto?") == true)
    {
      fetch(URL + "/" + productId, 
      {
        method: "DELETE",                
        body: JSON.stringify({__id: productId}), // il body accetta solamente una stringa su HTTP
        headers: 
        {
            'Content-type': "application/json",
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3Yzc0MzEyYjUwYzAwMTQ5ZTRmNDYiLCJpYXQiOjE2ODg3MjA3MjIsImV4cCI6MTY4OTkzMDMyMn0.3ihG5KxYcDMpdVftFuRtRJZ6gHhfMSPZwW3jIGsAl0M",
        },
      })
      .then((res) => 
      {
          if(res.ok) return res.json() 
      })
      .then((data) => 
      {
          alert("Prodotto cancellato")
          console.log(data)
      })
    }
})
