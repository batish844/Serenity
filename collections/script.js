document.addEventListener("DOMContentLoaded", function() {
  const seasonButtons = document.querySelectorAll('.filter-option'); // Radio buttons for filtering
  const seasonalProducts = document.querySelectorAll('.product.to'); // All seasonal products (those with the .to class)
  const giftProducts = document.querySelectorAll('.product.gift'); // Gift products

  // Initially, hide all seasonal products (those with .to class)
  seasonalProducts.forEach(product => {
    product.style.display = 'none'; // Hide seasonal products by default
  });

  // Always show gift products
  giftProducts.forEach(product => {
    product.style.display = 'block'; // Show gift products by default
  });

  // Show the products based on selected checkpoint (radio button change)
  seasonButtons.forEach(button => {
    button.addEventListener('change', function() {
      const selectedCategory = this.dataset.category; // Get selected category (e.g., valentine, christmas)

      // Hide all seasonal products first
      seasonalProducts.forEach(product => {
        product.style.display = 'none'; // Hide all seasonal products
      });

      // Show products that match the selected category
      seasonalProducts.forEach(product => {
        if (product.classList.contains(selectedCategory)) {
          product.style.display = 'block'; // Show matching seasonal products
        }
      });
    });
  });

  // Show all seasonal products again if no category is selected (optional behavior)
  const defaultOption = document.querySelector('#valentine'); // Default category, e.g., Valentine
  if (defaultOption) {
    defaultOption.checked = true;
    defaultOption.dispatchEvent(new Event('change')); // Trigger the 'change' event to show the default category (Valentine)
  }
});











// Handle size selection and Add to Cart functionality for all products
document.querySelectorAll('.product').forEach(product => {
  const sizeButtons = product.querySelectorAll('.size-btn');
  const addToCartButton = product.querySelector('.add-to-cart');
  const priceElement = product.querySelector('.price');

  let selectedSize = ''; // To track the selected size for each product

  sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Clear selection for all buttons in this product
      sizeButtons.forEach(btn => btn.classList.remove('selected'));

      // Mark the clicked button as selected
      button.classList.add('selected');
      selectedSize = button.dataset.size;

      // Update the price for the current product
      const price = button.getAttribute('data-price');
      priceElement.textContent = `${price}$`;

      // Enable the Add to Cart button
      addToCartButton.disabled = false;
    });
  });

  addToCartButton.addEventListener('click', () => {
    if (selectedSize) {
      alert(`Added ${selectedSize} candle to the cart!`);
    }
  });
});


// Select buttons for toggling between sections
const giftButton = document.querySelector('#gift-btn'); // Gift button
const seasonalButton = document.querySelector('#seasonal-btn'); // Seasonal button
const check = document.querySelector('.checkpoints'); // Checkpoints section

// Select sections
const section1 = document.querySelector('#section1'); // Section 1 (Seasonal)
const section2 = document.querySelector('#section2'); // Section 2 (Gift)

// Initialize the page by showing section1 and hiding section2
document.addEventListener('DOMContentLoaded', () => {
  section1.classList.remove('hidden');  // Ensure section1 is visible on page load
  section2.classList.add('hidden');  // Ensure section2 is hidden on page load
  check.classList.remove('hidden');  // Ensure checkpoints are visible on page load
});

// Toggle between sections when buttons are clicked
giftButton.addEventListener('click', () => {
  // Hide Section 1 and show Section 2
  section1.classList.add('hidden');
  section2.classList.remove('hidden');
  check.classList.add('hidden');  // Hide checkpoints
});

seasonalButton.addEventListener('click', () => {
  // Hide Section 2 and show Section 1
  section2.classList.add('hidden');
  section1.classList.remove('hidden');
  check.classList.remove('hidden');  // Show checkpoints
});



document.addEventListener("DOMContentLoaded", function() {
  // Get all the gift products
  const giftProducts = document.querySelectorAll('.giftss.product');
  
  // Enable the "Add to Cart" button and add event listener for each product
  giftProducts.forEach(product => {
    const addToCartButton = product.querySelector('.add-to-cart');
    
    // Enable the "Add to Cart" button for all gift products
    addToCartButton.disabled = false;

    // Add event listener for adding the product to the cart
    addToCartButton.addEventListener('click', function() {
      const productName = product.querySelector('.styled-img .text-style').textContent; // Get product name
      const productPrice = product.querySelector('.price').textContent; // Get product price

      // Simple cart logic - this can be extended to a real cart system
      alert(`${productName} has been added to your cart! Price: ${productPrice}`);
      
      // Optionally, you can also store the product in localStorage or an array for cart management.
    });
  });
});
