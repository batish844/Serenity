$(document).ready(function () {
 
  let menuToggle = $('#menu-toggle');
  let menuClose = $('#menu-close');
  let mobileMenu = $('#mobile-menu');
  let mainNav = $('#mainNav');

  menuToggle.on('click', function () {
    mobileMenu.removeClass('hidden').addClass('flex').attr('aria-hidden', 'false');
    mainNav.addClass('hidden');
  });

  menuClose.on('click', function () {
    mobileMenu.removeClass('flex').addClass('hidden').attr('aria-hidden', 'true');
    mainNav.removeClass('hidden');
  });
});


  const fetchProducts = async () => {
    try {
      const response = await fetch("products.json"); // Path to your JSON file
      const products = await response.json();

      const productContainer = document.querySelector(".product-card-list");
      products.forEach((product) => {
        const productCard = `
          <div class="product-card">
            <div class="mask-group">
              <img src="${product.image}" class="product-card-img" alt="${product.alt}">
            </div>
            <div class="aroma-card">
              <div class="fragrance-details-container">
                <p class="unique-scent-description-style">${product.name}</p>
                <p class="gardenia-blackberry-text-style">${product.description}</p>
              </div>
              <div class="product-card-widget">
                <div class="cart-button-container">
                  <p class="cart-button-text-style">Add to Cart</p>
                </div>
                <div class="price-container">
                  <p class="price-tag-text-style">${product.price}</p>
                </div>
              </div>
            </div>
          </div>
        `;
        productContainer.insertAdjacentHTML("beforeend", productCard);
      });
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Call the function to fetch and render products
  fetchProducts();

  // Function to apply styling when the "Add to Cart" button is clicked
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".product-card-list").addEventListener("click", (e) => {
    // Check if the clicked element is the "Add to Cart" button or its text
    if (
      e.target.classList.contains("cart-button-text-style") ||
      e.target.classList.contains("cart-button-container")
    ) {
      // Find the parent container (product-card-widget)
      const productCardWidget = e.target.closest(".product-card-widget");
      const cartButtonContainer = e.target.closest(".cart-button-container");

      if (productCardWidget && cartButtonContainer) {
        // Check if the container is already active
        if (cartButtonContainer.classList.contains("active")) {
          // Remove active styles
          productCardWidget.style.backgroundColor = "#fdf8f0"; // Original background color
          productCardWidget.querySelectorAll("*").forEach((child) => {
            child.style.color = "#6e4835"; // Original text color
          });
          cartButtonContainer.classList.remove("active");
        } else {
          // Apply active styles
          productCardWidget.style.backgroundColor = "#8B623C"; // Brown background
          productCardWidget.querySelectorAll("*").forEach((child) => {
            child.style.color = "#FDF8F0"; // White text
          });
          cartButtonContainer.classList.add("active");
        }
      }
    }
  });
});

