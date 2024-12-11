$(document).ready(function () {
  function setupFragranceSelection(fragranceName) {
    let selectedButton = null;
    $("h2").each(function () {
      if ($(this).text().trim() === fragranceName) {
        $(this)
          .next()
          .find("button")
          .each(function () {
            $(this).on("click", function () {
              if (selectedButton) {
                $(selectedButton).css({
                  color: "",
                  backgroundColor: "",
                });
              }
              $(this).css({
                color: "white",
                backgroundColor: "#8B623C",
              });
              selectedButton = this;
            });
          });
      }
    });
  }

  setupFragranceSelection("Fragrance One");
  setupFragranceSelection("Fragrance Two");

  let quantity = 1;
  let quantityDisplay = $('#quantity-display');
  let decrementButton = $('#decrement-button');
  let incrementButton = $('#increment-button');

  decrementButton.on('click', function () {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.text(quantity);
    }
  });

  incrementButton.on('click', function () {
    quantity++;
    quantityDisplay.text(quantity);
  });

  let menuToggle = $('#menu-toggle');
  let menuClose = $('#menu-close');
  let mobileMenu = $('#mobile-menu');

  // Show mobile menu
  menuToggle.on('click', function () {
    mobileMenu.removeClass('hidden').addClass('flex').attr('aria-hidden', 'false');
  });

  // Hide mobile menu
  menuClose.on('click', function () {
    mobileMenu.removeClass('flex').addClass('hidden').attr('aria-hidden', 'true');
  });
});
