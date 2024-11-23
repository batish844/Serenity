let cartItems = [];
let subtotal = 0;
let promoApplied = false; 
let discount = 0; 

function initializeCart() {
  const storedCart = localStorage.getItem("cartItems");
  const storedDiscount = localStorage.getItem("discount");

  if (storedCart) {
    cartItems = JSON.parse(storedCart);
    if (storedDiscount) {
      discount = parseFloat(storedDiscount);
      promoApplied = true; 
      calculateSubtotal();
    }
    renderCart();
  } else {
    fetch('Cart.json')
      .then(response => response.json())
      .then(products => {
        cartItems = products;
        saveCartToLocalStorage();
        calculateSubtotal();
        renderCart();
      })
      .catch(error => console.error("Error loading products:", error));
  }
}

function saveCartToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("discount", discount); 
}

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

  calculateSubtotal();
}

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

function calculateSubtotal() {
  subtotal = cartItems.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  if (promoApplied) {
    const discountAmount = subtotal * discount;
    subtotal -= discountAmount;
  }

  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
}

function togglePromoCode() {
  const promoInput = document.getElementById("promo-code-input");
  const toggleIcon = document.querySelector(".promo-toggle-btn i");
  const applyButton = document.querySelector("#promo-code-input button");
  promoInput.classList.toggle("show");

  if (promoInput.classList.contains("show")) {
    toggleIcon.classList.remove("fa-angle-down");
    toggleIcon.classList.add("fa-angle-right");
    applyButton.style.display = "block";
  } else {
    toggleIcon.classList.remove("fa-angle-right");
    toggleIcon.classList.add("fa-angle-down");
    applyButton.style.display = "none";
  }
}

// Apply the promo code
function applyPromoCode() {
  const promoCode = document.getElementById("promo-code").value.trim(); 
  const feedback = document.getElementById("promo-feedback"); 

  const validPromoCodes = {
    "Chicho ": 0.1, 
    "Majd rwwe2a": 0.2, 
  };

  if (promoApplied) {
    feedback.textContent = "Promo code already applied.";
    feedback.style.color = "red";
    return;
  }

  if (validPromoCodes[promoCode]) {
    discount = validPromoCodes[promoCode]; 
    const discountAmount = subtotal * discount; 
    subtotal -= discountAmount; 


    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;


    feedback.textContent = `Promo code applied! You saved $${discountAmount.toFixed(2)}.`;
    feedback.style.color = "green"; 
    promoApplied = true;

    // Save 
    saveCartToLocalStorage();
  } else {
    feedback.textContent = "Invalid promo code.";
    feedback.style.color = "red"; 
  }
}

initializeCart();
