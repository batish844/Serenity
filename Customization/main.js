$(document).ready(function () {
  let menu = document.getElementById("mobile-menu");
  let toggleButton = document.getElementById("menu-toggle");
  let closeButton = document.getElementById("menu-close");

  toggleButton.addEventListener("click", () => {
    menu.classList.remove("hidden");
  });

  closeButton.addEventListener("click", () => {
    menu.classList.add("hidden");
  });

  menu.addEventListener("click", (e) => {
    if (e.target === menu) {
      menu.classList.add("hidden");
    }
  });

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
                color: "#white",
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

  let quantityDisplay = $("span.font-medium");
  let quantity = parseInt(quantityDisplay.text());

  let decrementButton, incrementButton;

  $("button").each(function () {
    let text = $(this).text().trim();
    if (text === "-") {
      decrementButton = $(this);
    } else if (text === "+") {
      incrementButton = $(this);
    }
  });

  decrementButton.on("click", function () {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.text(quantity);
    }
  });

  incrementButton.on("click", function () {
    quantity++;
    quantityDisplay.text(quantity);
  });
});
