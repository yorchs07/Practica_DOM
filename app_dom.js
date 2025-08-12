const products = [
  {
    name: 'Grand Theft Auto V',
    price: 25.0,
    stars: 5,
    reviews: 12420,
    seller: 'Rockstar Games',
    genre: 'Accion',
    image: 'https://m.media-amazon.com/images/I/717n2jHZ7pL.jpg'
  },
  {
    name: 'Ghost of Tsushima: Director´s cut',
    price: 35.0,
    stars: 5,
    reviews: 1980,
    seller: 'Sucker Punch',
    genre: 'Aventura',
    image: 'https://m.media-amazon.com/images/I/716o8AMc+sS.jpg'
  },
  {
    name: 'Spider-Man 2',
    price: 69.99,
    stars: 5,
    reviews: 9670,
    seller: 'PlayStation Store',
    genre: 'Aventura',
    image:
      'https://xenogamesec.com/wp-content/uploads/2023/11/Marvels-Spider-Man-2-PS5.webp'
  },
  {
    name: 'EA sports FC 26',
    price: 79.99,
    stars: 5,
    reviews: 0,
    seller: 'EA sports',
    genre: 'Deportes',
    image:
      'https://web-game.net/wp-content/uploads/2025/07/EA-SPORTS-FC-26-PS5-scaled.jpg'
  },
  {
    name: 'God of War Ragnarok',
    price: 69.99,
    stars: 5,
    reviews: 6860,
    seller: 'PlayStation Store',
    genre: 'Aventura',
    image:
      'https://acdn-us.mitiendanube.com/stores/427/682/products/god-of-war-ragnarok-ps41-d6467c9a27c5c5ad1116580010499605-1024-1024.png'
  },
  {
    name: 'Star Wars: Jedi Survivor',
    price: 49.99,
    stars: 5,
    reviews: 8500,
    seller: 'Electronic Arts',
    genre: 'Aventura',
    image:
      'https://m.media-amazon.com/images/I/71zi+tZvEtL._UF894,1000_QL80_.jpg'
  },
  {
    name: 'Hogwarts Legacy',
    price: 59.99,
    stars: 4,
    reviews: 5750,
    seller: 'Warner Bros Games',
    genre: 'Aventura',
    image:
      'https://playdigitalstore.com/wp-content/uploads/2023/06/hogwarts-legacy-ps5.jpg'
  },
  {
    name: 'Cyberpunk 2077',
    price: 29.99,
    stars: 3,
    reviews: 3000,
    seller: 'CD Projekt',
    genre: 'Acción',
    image:
      'https://dw0jruhdg6fis.cloudfront.net/producao/29164958/G/cyberopunkps5.jpg'
  },
  {
    name: 'Mario Kart 8 Deluxe',
    price: 49.99,
    stars: 5,
    reviews: 5400,
    seller: 'Nintendo Store',
    genre: 'Carreras',
    image:
      'https://m.media-amazon.com/images/I/71jZAGKRAQL._UF894,1000_QL80_.jpg'
  },
  {
    name: 'Resident Evil 4 Remake',
    price: 59.99,
    stars: 5,
    reviews: 2910,
    seller: 'Capcom',
    genre: 'Suspense',
    image:
      'https://playdigitalstore.com/wp-content/uploads/2023/03/Resident-Evil-4-Remake-PS5.jpg'
  },
  {
    name: 'Call of Duty Black Ops 6',
    price: 79.99,
    stars: 4,
    reviews: 3580,
    seller: 'Activision',
    genre: 'Acción',
    image: 'https://m.media-amazon.com/images/I/81cTJfYdiVL.jpg'
  },
  {
    name: 'The Legend of Zelda: Tears of the Kingdom',
    price: 59.99,
    stars: 5,
    reviews: 1200,
    seller: 'Nintendo Store',
    genre: 'Aventura',
    image: 'https://glitchgames.com.mx/cdn/shop/files/zelda.jpg?v=1752782145'
  }
]

const productsContainer = document.getElementById('products')
const sellerFilter = document.getElementById('seller-filter')
const genreFilter = document.getElementById('genre-filter')
const priceRange = document.getElementById('price-range')
const priceValue = document.getElementById('price-value')
const cartBtn = document.getElementById('cart-btn')
const cartDropdown = document.getElementById('cart-dropdown')
const cartItemsContainer = document.getElementById('cart-items')
const cartTotalPrice = document.getElementById('cart-total-price')
const cartCount = document.getElementById('cart-count')

priceRange.addEventListener('input', () => {
  priceValue.textContent = priceRange.value
})

// Rellenar vendedores
const sellers = [...new Set(products.map((p) => p.seller))]
sellerFilter.innerHTML = '<option value="">Todos</option>'
sellers.forEach((seller) => {
  sellerFilter.innerHTML += `<option value="${seller}">${seller}</option>`
})

// Renderizar productos
function renderProducts(items) {
  productsContainer.innerHTML = ''
  items.forEach((product) => {
    const card = document.createElement('div')
    card.classList.add('product-card')
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>€${product.price.toFixed(2)}</p>
      <button class="buy-btn" data-name="${
        product.name
      }">Añadir al carrito</button>
    `
    productsContainer.appendChild(card)
  })

  document.querySelectorAll('.buy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.name)
      cartDropdown.classList.remove('hidden')
    })
  })
}

// Añadir producto al carrito (con cantidad)
function addToCart(productName) {
  let cart = JSON.parse(localStorage.getItem('cart')) || []
  const product = products.find((p) => p.name === productName)

  const existing = cart.find((item) => item.name === productName)
  if (existing) {
    existing.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  localStorage.setItem('cart', JSON.stringify(cart))
  updateCartUI()
}

// Cambiar cantidad
function changeQuantity(index, delta) {
  let cart = JSON.parse(localStorage.getItem('cart')) || []
  cart[index].quantity += delta

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1)
  }

  localStorage.setItem('cart', JSON.stringify(cart))
  updateCartUI()
  cartItemsContainer.innerHTML += `
  <div class="cart-total">
    <strong>Total:</strong> €${total.toFixed(2)}
  </div>
`
}

// Actualizar interfaz del carrito
function updateCartUI() {
  let cart = JSON.parse(localStorage.getItem('cart')) || []
  cartItemsContainer.innerHTML = ''
  let total = 0

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity
    total += subtotal
    const div = document.createElement('div')
    div.classList.add('cart-item')
    div.innerHTML = `
      <div class="cart-item-info">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-text">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">Precio: €${item.price.toFixed(2)}</p>
          <p>Cantidad: ${item.quantity}</p>
        </div>
      </div>
      <div class="cart-item-controls">
        <button onclick="changeQuantity(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${index}, 1)">+</button>
      </div>
    `
    cartItemsContainer.appendChild(div)
  })

  cartTotalPrice.textContent = `€${total.toFixed(2)}`
  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0)
}

// Filtros
document.getElementById('apply-filters').addEventListener('click', () => {
  const search = document.getElementById('search').value.toLowerCase()
  const seller = sellerFilter.value
  const maxPrice = parseFloat(priceRange.value)
  const genre = genreFilter.value.toLowerCase()
  const minStars = parseInt(document.getElementById('stars-filter').value, 10)

  const filtered = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(search) &&
      (seller === '' || p.seller === seller) &&
      p.price <= maxPrice &&
      (genre === '' || p.genre.toLowerCase().includes(genre)) &&
      p.stars >= minStars
    )
  })

  renderProducts(filtered)
})

function renderProducts(items) {
  productsContainer.innerHTML = ''
  items.forEach((product) => {
    const card = document.createElement('div')
    card.classList.add('product-card')
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>€${product.price.toFixed(2)}</p>
      <button class="buy-btn" data-name="${
        product.name
      }">Añadir al carrito</button>
    `
    productsContainer.appendChild(card)
  })

  document.querySelectorAll('.buy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.name)
      cartDropdown.classList.remove('hidden')
    })
  })
}

// Toggle carrito al pulsar icono
cartBtn.addEventListener('click', () => {
  cartDropdown.classList.toggle('hidden')
})

// Inicial
renderProducts(products)
updateCartUI()
