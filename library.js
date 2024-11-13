const libraryUrl = "https://striveschool-api.herokuapp.com/books"

const getLibrary = function () {
    fetch(libraryUrl)
    .then((response) => {
        if (response.ok) {
            return response.json()
        }
        else {
            throw new Error("Server response error")
            
        }
    })
    .then((books) => {
        console.log(books)
        const bookRow = document.getElementById('library-row') 
        books.forEach((book) => {
            const newCol = document.createElement('div')
            newCol.classList.add('col', 'col-12', 'col-md-6', 'col-lg-3')
            newCol.innerHTML = `
            <div class="card h-100">
            <img
            src="${book.img}"
            class="card-img-top"
            alt="book picture"
            />
            <div class="card-body text-center d-flex flex-column justify-content-between">
            <h5 class="card-title">${book.title}</h5>
            <div class='d-flex justify-content-around'>
            <p class="card-text mb-3">
            Price: ${book.price}€
            </p>
            </div>
            <div class="d-flex justify-content-center">
            <a href="#" class="btn btn-success m-2 addToCart-btn">Add to Cart</a>
            <a href="#" class="btn btn-warning m-2 discard-btn">Discard</a>
            </div>
            </div>
            `
            bookRow.appendChild(newCol)

            const purchaseBtn = newCol.querySelector('.addToCart-btn');
                purchaseBtn.addEventListener('click', () => {
                    addToCart(book);
                });

            const discardBtn = newCol.querySelector('.discard-btn')
            discardBtn.addEventListener('click', () => {
                newCol.classList.add('d-none')
            })
        })
    })
    .catch((error) => {
        console.log(error)
    })
}

getLibrary()

// const addToCart = (book) => {
//     const cartItems = document.getElementById('cart-items')
//     const cartItem = document.createElement('li') 
//     cartItem.textContent = `${book.title} - ${book.price}€`
//     cartItems.appendChild(cartItem)
// }

const addToCart = (book) => {
    // Recupera il carrello dal localStorage, se esiste, altrimenti crea un array vuoto
    let cart = JSON.parse(localStorage.getItem('cart')) || []

    // Aggiungi il libro al carrello
    cart.push(book)

    // Salva di nuovo il carrello nel localStorage
    localStorage.setItem('cart', JSON.stringify(cart))

    // Aggiorna l'interfaccia utente
    updateCart()
}

// Funzione per aggiornare l'interfaccia del carrello
const updateCart = () => {
    const cartItems = document.getElementById('cart-items')
    cartItems.innerHTML = '' // Pulisce il carrello esistente

    // Recupera il carrello dal localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || []

    // Aggiungi ogni libro del carrello alla lista
    cart.forEach((book, index) => {
        const cartItem = document.createElement('li')
        cartItem.textContent = `${book.title} - ${book.price}€`

        // Aggiungi un bottone per eliminare il libro
        const removeBtn = document.createElement('button')
        removeBtn.textContent = "Elimina"
        removeBtn.classList.add('btn', 'btn-danger', 'btn-sm')
        
        // Aggiungi l'evento per eliminare il libro
        removeBtn.addEventListener('click', () => {
            removeFromCart(index)
        })

        // Aggiungi il bottone di eliminazione all'elemento del carrello
        cartItem.appendChild(removeBtn)
        
        // Aggiungi l'elemento alla lista
        cartItems.appendChild(cartItem)
    })
}

// Funzione per rimuovere un libro dal carrello
const removeFromCart = (index) => {
    // Recupera il carrello dal localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || []

    // Rimuove l'elemento dal carrello
    cart.splice(index, 1)

    // Salva di nuovo il carrello nel localStorage
    localStorage.setItem('cart', JSON.stringify(cart))

    // Aggiorna l'interfaccia utente
    updateCart()
}

// Aggiorna il carrello all'avvio della pagina
updateCart()