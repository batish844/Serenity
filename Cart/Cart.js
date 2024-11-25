let cartItems = [];
let subtotal = 0;
let promoApplied = false;
let discount = 0;

// Initialize Cart - Load from localStorage or fetch from JSON
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
    fetch("Cart.json")
      .then((response) => response.json())
      .then((products) => {
        cartItems = products.cartItems || [];
        saveCartToLocalStorage();
        calculateSubtotal();
        renderCart();
      })
      .catch((error) => console.error("Error loading products:", error));
  }
}

// Save cart and discount to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("discount", discount);
}

// Render cart items
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

// Update item quantity
function updateQuantity(index, change) {
  const product = cartItems[index];
  product.quantity = Math.max(1, product.quantity + change);
  saveCartToLocalStorage();
  renderCart();
}

// Remove item from the cart
function removeItem(index) {
  cartItems.splice(index, 1);
  saveCartToLocalStorage();
  renderCart();
}

// Calculate subtotal
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

// Toggle promo code input visibility
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
    "Chicho": 0.1,
    "Majd Helo": 0.2,
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

// Add item from any section
function addToCart(productId) {
  fetch("Cart.json")
    .then((response) => response.json())
    .then((data) => {
      const product = data.cartItems.find((item) => item.id === productId);

      if (product) {
        // Check if the product is already in the cart
        const existingProductIndex = cartItems.findIndex((item) => item.id === productId);

        if (existingProductIndex >= 0) {
          cartItems[existingProductIndex].quantity++;
        } else {
          product.quantity = 1;
          cartItems.push(product);
        }

        saveCartToLocalStorage();
        renderCart();
      } else {
        console.error("Product not found");
      }
    })
    .catch((error) => {
      console.error("Error adding product to cart:", error);
    });
}

// Add item from Recently Viewed section
function addRecentlyViewedToCart(productId) {
  fetch("Cart.json")
    .then((response) => response.json())
    .then((data) => {
      const product = data.recentlyViewed.find((item) => item.id === productId);

      if (product) {
        // Check if the product is already in the cart
        const existingProductIndex = cartItems.findIndex((item) => item.id === productId);

        if (existingProductIndex >= 0) {
          cartItems[existingProductIndex].quantity++;
        } else {
          product.quantity = 1;
          cartItems.push(product);
        }

        saveCartToLocalStorage();
        renderCart();
      } else {
        console.error("Product not found in recently viewed");
      }
    })
    .catch((error) => {
      console.error("Error adding product to cart from recently viewed:", error);
    });
}

// Render recently viewed items
function renderRecentlyViewed() {
  const recentlyViewedContainer = document.getElementById("recently-viewed");
  fetch("Cart.json")
    .then((response) => response.json())
    .then((data) => {
      const recentlyViewed = data.recentlyViewed;

      recentlyViewed.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("recent-item");

        const productContent = `
          <div class="Recent-cart" style="background: url(${product.image}) center center / cover;">
            <div class="Recent-Cart-Image">
              <h4>${product.name}</h4>
            </div>
          </div>
          <div class="Recent-Add-to-cart">
            <button class="add-to-cart-btn" onclick="addRecentlyViewedToCart(${product.id})">
              <span class="add-to-cart-text">Add to Cart</span>
              <span class="add-to-cart-price">${product.price}$</span>
            </button>
          </div>
        `;

        productDiv.innerHTML = productContent;
        recentlyViewedContainer.appendChild(productDiv);
      });
    })
    .catch((error) => {
      console.error("Error loading recently viewed items:", error);
    });
}

window.onload = () => {
  initializeCart(); 
  renderRecentlyViewed(); 
};

// Checkout

let checkoutButton = document.querySelector(".checkout-btn");

checkoutButton.addEventListener("click", function () {
  document.getElementById("checkout-modal").style.display = "block";
});

// close the modal
function closeModal() {
  document.getElementById("checkout-modal").style.display = "none";
}
