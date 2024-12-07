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
document.addEventListener("DOMContentLoaded", function () {
  const itemsContainer = document.getElementById("items-container");
  const buttons = document.querySelectorAll(".category-btn");

  // Fetch data from JSON file
  async function fetchData() {
    try {
      const response = await fetch("./data.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data.json");
      }
      const data = await response.json();
      return data.categories;
    } catch (error) {
      console.error("Error fetching data:", error);
      return {}; // Return an empty object to prevent crashes
    }
  }

  // Function to render items
  function renderItems(category, categories) {
    const items = categories[category] || []; // Fallback to empty array
    itemsContainer.innerHTML = ""; // Clear previous items
    items.forEach((item) => {
      const itemHTML = `
          <div class="w-full md:w-auto mx-auto">
            <div class="relative w-full h-[455px] rounded-lg overflow-hidden">
              <img src="${item.image}" class="w-full h-full object-cover" alt="${item.name}" />
              <div class="absolute bottom-0 w-full h-[123px] bg-[#e0c1ac] opacity-75 sm:rounded-b-[44px] rounded-lg"></div>
              <div class="absolute bottom-[50px] left-1/2 transform -translate-x-1/2 text-[#fdf8f0] text-[25px] lg:text-[33px] font-bold"
                style="white-space: nowrap; font-family: 'Montserrat'">
                ${item.name}
              </div>
            </div>
            <div class="mb-10 flex justify-center" style="margin-top: 56px;">
              <a href="#" style="width: 199px; height: 42px; position: relative;">
                <div style="width: 199px; height: 42px; position: absolute; left: 0; top: 0; background: #E0C1AC; border-radius: 10px;"></div>
                <div style="position: absolute; left: 17px; top: 11px; color: #FDF8F0; font-size: 17px; font-family: Montserrat; font-weight: 500;">
                  Add to Cart
                </div>
                <div style="position: absolute; left: 150px; top: 11px; color: #FDF8F0; font-size: 17px; font-family: Montserrat; font-weight: 500;">
                  ${item.price}
                </div>
                <div style="position: absolute; left: 132px; top: 0; width: 42px; height: 0; transform: rotate(90deg); transform-origin: top left; border-top: 1px solid #FDF8F0;"></div>
              </a>
            </div>
          </div>
        `;

      itemsContainer.insertAdjacentHTML("beforeend", itemHTML);
    });
  }

  // Initialize application
  async function initialize() {
    const categories = await fetchData();
    if (Object.keys(categories).length === 0) return; // Prevent further execution if data fetch fails

    // Default render (first category)
    renderItems("Soy Wax Melts", categories);

    // Highlight the default button on load
    buttons.forEach((btn) => {
      btn.classList.add("bg-[#e0c1ac]/30", "rounded-[10px]");
    });
    const defaultButton = document.querySelector(
      '[data-category="Soy Wax Melts"]'
    );
    defaultButton.classList.remove("bg-[#e0c1ac]/30");
    defaultButton.classList.add("bg-[#e0c1ac]");

    // Add event listeners to buttons
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");

        // Render items for the selected category
        renderItems(category, categories);

        // Reset styles for all buttons
        buttons.forEach((btn) => {
          btn.classList.remove("bg-[#e0c1ac]");
          btn.classList.add("bg-[#e0c1ac]/30");
        });

        // Highlight the selected button
        button.classList.remove("bg-[#e0c1ac]/30");
        button.classList.add("bg-[#e0c1ac]");
      });
    });
  }

  // Start application
  initialize();
});
