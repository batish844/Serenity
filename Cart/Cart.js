// menu mobile
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const mobileMenu = document.getElementById("mobile-menu");

  //open 
  menuToggle.addEventListener("click", () => {
    mobileMenu.style.display = "flex";
    setTimeout(() => {
      mobileMenu.style.transform = "translateX(0)"; 
      mobileMenu.style.opacity = "1"; 
    }, 10); 
  });

  //close 
  menuClose.addEventListener("click", () => {
    mobileMenu.style.transform = "translateX(-100%)"; 
    mobileMenu.style.opacity = "0"; 
    setTimeout(() => {
      mobileMenu.style.display = "none";
    }, 300); 
  });
});

// search mobile 
document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("search-icon");
  const searchInput = document.getElementById("search-input2");
  const searchAndProfile = document.querySelector(".search-and-profile");

  if (searchIcon && searchInput && searchAndProfile) {
    searchIcon.addEventListener("click", () => {
      searchAndProfile.classList.toggle("active");

      if (searchAndProfile.classList.contains("active")) {
        searchInput.focus();
      }
    });
  }
});

// search normal page 

document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("search-icon");
  const searchInput = document.getElementById("search-input1");
  const rightDiv = document.querySelector(".right");

  if (searchIcon && searchInput && rightDiv) {
    searchIcon.addEventListener("click", () => {
      rightDiv.classList.toggle("active");
      searchInput.style.display="inline ";
      if (rightDiv.classList.contains("active")) {
        searchInput.focus();
        searchInput.style.display="none";
      }
    });
  }
});

// Pop Up 

// document.addEventListener("DOMContentLoaded", () => {
//   const profileIcon = document.getElementById("profile-icon");
//   const profileContainer = document.querySelector(".profile-container");
//   const overlay = document.querySelector(".overlay");

//   profileIcon.addEventListener("click", () => {
//       if (profileContainer.classList.contains("active")) {
//           profileContainer.classList.remove("active");
//           overlay.style.display = "none";
//           setTimeout(() => {
//               profileContainer.style.display = "none";
//           }, 300);
//       } else {
//           profileContainer.style.display = "flex";
//           overlay.style.display = "block";
//           setTimeout(() => profileContainer.classList.add("active"), 10);
//       }
//   });

//   // Close popup when clicking outside
//   overlay.addEventListener("click", () => {
//       profileContainer.classList.remove("active");
//       overlay.style.display = "none";
//       setTimeout(() => {
//           profileContainer.style.display = "none";
//       }, 300);
//   });
// });

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
        <p>${product.description}</p>
      </div>
      <div class="actions">
        <div class="quantity-controls">
          <button onclick="updateQuantity(${index}, -1)">-</button>
          <input type="text" class="Quant-nb" value="${product.quantity}" readonly>
          <button onclick="updateQuantity(${index}, 1)">+</button>
        </div>
        <div class="TrashPrice">
          <div class="price">${(product.price * product.quantity).toFixed(2)}$</div>
          <button class="delete-btn" onclick="removeItem(${index})">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);
    // Check if it's the last item
    if (index !== cartItems.length - 1) {
// create the border element
      const borderDiv = document.createElement("div");
      borderDiv.classList.add("border-bottom");
      cartItemsContainer.appendChild(borderDiv);
    }
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
    "Majd-10-Off":0.1
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
      console.log(product)
      if (product) {
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

function closeModal() {
  document.getElementById("checkout-modal").style.display = "none";
}

// Checkout validation and data storage
function validateAndCheckout() {
  const cardHolder = document.getElementById("card-holder").value.trim();
  const cardNumber = document.getElementById("card-number").value.trim();
  const expiryMonth = document.getElementById("expiry-month").value.trim();
  const expiryYear = document.getElementById("expiry-year").value.trim();

  if (!cardHolder || !expiryMonth || !expiryYear || !cardNumber) {
    alert("Please fill out all the required fields.");
    return;
  }

  if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
    alert("Please enter a valid 16-digit card number.");
    return;
  }

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  saveCheckoutData(cardHolder, expiryMonth, expiryYear, cardNumber);

  alert("Checkout successful!");
}

function saveCheckoutData(cardHolder, expiryMonth, expiryYear, cardNumber) {
  const cvcCode = "****"; 
  const checkoutData = {
    cardHolder,
    expiryMonth,
    expiryYear,
    cardNumber: cardNumber.replace(/\d(?=\d{4})/g, "*"), 
    cvcCode,
    subtotal: subtotal,  // store the final subtotal
    date: new Date().toLocaleString(),
  };

  localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

  cartItems = []; // Clear cart
  saveCartToLocalStorage();
  document.getElementById("subtotal").textContent = "$0.00"; // Reset subtotal

  alert("Payment information saved. Proceeding to payment...");
  closeModal();
  renderCart();
}

document.querySelector(".pop-up-form button[type='submit']").addEventListener("click", function (e) {
  e.preventDefault();
  validateAndCheckout();
});
