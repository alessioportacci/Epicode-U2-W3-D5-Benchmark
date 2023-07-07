const row = document.getElementById("row")



fetch("https://striveschool-api.herokuapp.com/api/product", 
  {
    headers: 
    {
    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3Yzc0MzEyYjUwYzAwMTQ5ZTRmNDYiLCJpYXQiOjE2ODg3MjA3MjIsImV4cCI6MTY4OTkzMDMyMn0.3ihG5KxYcDMpdVftFuRtRJZ6gHhfMSPZwW3jIGsAl0M",
    },
  }
  )
    .then((res) => 
    {
      if (res.ok) 
        return res.json()
      else 
        throw new Error("Errore nel salvataggio del prodotto")
    })
    .then((data) =>
    {
      data.forEach(element => {
        let col = document.createElement("div")
        col.classList.add("card")
        col.classList.add("m-1")
        col.style.width = "18rem"
        col.innerHTML= `<img src="${element.imageUrl}" 
                         class="card-img-top" 
                         alt="" 
                         height="200" 
                         style="object-fit: contain;">
                        <div class="card-body">
                          <h5 class="card-title">${element.name}</h5>
                          <p class="card-text">${element.description}</p>
                          <p class=""> ${element.price}€ </p>
                          <a href="details.html?id=${element._id}" class="btn btn-danger">Scopri di più</a>
                          <a href="backOffice.html?id=${element._id}" class="btn btn-secondary">Modifica</a>
                        </div>`
        row.append(col)        
      });

      document.getElementById("spinner").classList.toggle("d-none")
      console.log(data)
    }
    )
    .catch((err) => 
    {
      console.log(err)
      let col = document.createElement("div")
      div.classList.add("text-center")
      div.classList.add("text-white")

      col.innerText = `
                      
                      `
      row.appendChild(col)
    })