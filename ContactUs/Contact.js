
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

// Show answers

document.querySelectorAll('.Quick-help-button').forEach(button => {
    button.addEventListener('click', () => {
        const answerContainer = button.closest('.Quick-help-Question').querySelector('.Quick-help-Answer');
        
        if (answerContainer.style.maxHeight && answerContainer.style.maxHeight !== '0px') {
            answerContainer.style.maxHeight = '0';
            button.innerHTML = '<i class="fas fa-angle-down"></i>'; // Down arrow 
        } else {
            answerContainer.style.maxHeight = answerContainer.scrollHeight + 'px'; //auto width
            button.innerHTML = '<i class="fas fa-angle-up"></i>'; // Up arrow 
        }
    });
});


// Form
const form = document.querySelector("#contactForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const name = form.querySelector('input[placeholder="Name"]').value;
  const email = form.querySelector('input[placeholder="Email"]').value;
  const subject = form.querySelector('input[placeholder="Subject"]').value;
  const message = form.querySelector('textarea').value;

  const feedback = {
    name,
    email,
    subject,
    message,
    date: new Date().toLocaleString(), 
  };

  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  
  feedbacks.push(feedback);
  
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  successMessage.classList.remove("hidden");
  
  form.reset();

  setTimeout(() => {
    successMessage.classList.add("hidden");
  }, 3000);
});
