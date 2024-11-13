const libraryUrl = "https://striveschool-api.herokuapp.com/books"

const getLibrary = function () {
    fetch(libraryUrl)
    .then((response) => {
        if (response.ok) {
            return response.json()
            console.log(response)
        }
        else {
            throw new Error("Server response error")
            
        }
    })
    .then((books) => {
        const bookRow = document.getElementById('library-row') 
      books.forEach((book) => {
        console.log(books)
        const newCol = document.createElement('div')
        newCol.classList.add('col', 'col-12', 'col-md-6', 'col-lg-3')
        newCol.innerHTML = `
            <div class="card h-100">
              <img
                src="${book.img}"
                class="card-img-top"
                alt="book picture"
              />
              <div class="card-body text-center">
                <h5 class="card-title">${book.title}</h5>
                <div class='d-flex justify-content-around'>
                <p class="card-text">
                  Category: ${book.category}
                </p>
                <p class="card-text">
                  Price: ${book.price}€
                </p>
                </div>
                <a href="#" class="btn btn-primary">Purchase</a>
                <a href="#" class="btn btn-danger">Discard</a>
              </div>
        `
        bookRow.appendChild(newCol)
      })
    })
    .catch((error) => {
      // siete nel finale "cattive" (Promise rejected)
      // alert('ERRORE NELLA CHIAMATA')
      console.log(error)
    })
}

getLibrary()