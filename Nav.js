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

  