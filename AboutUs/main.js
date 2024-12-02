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
  });