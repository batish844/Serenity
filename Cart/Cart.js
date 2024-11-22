let cartItems = []; 

function initializeCart() {
  const storedCart = localStorage.getItem("cartItems");

  if (storedCart) {
    cartItems = JSON.parse(storedCart);
    renderCart();
  } else {
    fetch('Cart.json')
      .then(response => response.json())
      .then(products => {
        cartItems = products; 
        saveCartToLocalStorage(); 
        renderCart();
      })
      .catch(error => console.error("Error loading products:", error));
  }
}

function saveCartToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
// Rendering the cart
function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; 

  cartItems.forEach((product, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-details">
        <h4>${product.name}</h4>
        <p>${product.price}$</p>
      </div>
      <div class="actions">
        <div class="quantity-controls">
          <button onclick="updateQuantity(${index}, -1)">-</button>
          <input type="text" value="${product.quantity}" readonly>
          <button onclick="updateQuantity(${index}, 1)">+</button>
        </div>
        <button class="delete-btn" onclick="removeItem(${index})">
          <img src="Cart-images/Trash.png" alt="Trash Icon">
        </button>
      </div>
      <div class="price">${(product.price * product.quantity).toFixed(2)}$</div>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });
}
// Storage
function updateQuantity(index, change) {
  const product = cartItems[index];
  product.quantity = Math.max(1, product.quantity + change);
  saveCartToLocalStorage(); 
  renderCart(); 
}

function removeItem(index) {
  cartItems.splice(index, 1);
  saveCartToLocalStorage(); 
  renderCart(); 
}

initializeCart();
