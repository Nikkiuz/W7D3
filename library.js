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
            <div class="card-body text-center">
            <h5 class="card-title">${book.title}</h5>
            <div class='d-flex justify-content-around'>
            <p class="card-text mb-3">
            Price: ${book.price}€
            </p>
            </div>
            <div class="d-flex justify-content-center">
            <a href="#" class="btn btn-success m-2 purchase-btn">Add to Cart</a>
            <a href="#" class="btn btn-warning m-2 discard-btn">Discard</a>
            </div>
            </div>
            `
            bookRow.appendChild(newCol)

            const purchaseBtn = newCol.querySelector('.purchase-btn');
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

const addToCart = (book) => {
    const cartItems = document.getElementById('cart-items')
    const cartItem = document.createElement('li') 
    cartItem.textContent = `${book.title} - ${book.price}€`
    cartItems.appendChild(cartItem)
}