document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const menuClose = document.getElementById("menu-close");
    const mobileMenu = document.getElementById("mobile-menu");
  
    // Open mobile menu
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", () => {
        mobileMenu.style.display = "flex";
        setTimeout(() => {
          mobileMenu.style.transform = "translateX(0)";
          mobileMenu.style.opacity = "1";
        }, 10);
      });
    }
  
    // Close mobile menu
    if (menuClose && mobileMenu) {
      menuClose.addEventListener("click", () => {
        mobileMenu.style.transform = "translateX(-100%)";
        mobileMenu.style.opacity = "0";
        setTimeout(() => {
          mobileMenu.style.display = "none";
        }, 300);
      });
    }
  
    // Mobile Search
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
  
    // Desktop Search
    const desktopSearchIcon = document.getElementById("search-icon");
    const desktopSearchInput = document.getElementById("search-input1");
    const rightDiv = document.querySelector(".right");
  
    if (desktopSearchIcon && desktopSearchInput && rightDiv) {
      desktopSearchIcon.addEventListener("click", () => {
        rightDiv.classList.toggle("active");
        desktopSearchInput.style.display = rightDiv.classList.contains("active") ? "inline" : "none";
        if (rightDiv.classList.contains("active")) {
          desktopSearchInput.focus();
        }
      });
    }
  
    // Login Functionality
    const loginButton = document.querySelector(".Login");
    const usernameInput = document.querySelector(".Username");
    const passwordInput = document.querySelector(".password");
    const rememberMeCheckbox = document.getElementById("remember");
  
    if (loginButton && usernameInput && passwordInput && rememberMeCheckbox) {
      const savedUsername = localStorage.getItem("rememberedUsername");
      if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberMeCheckbox.checked = true;
      }
  
      loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
  
        if (!username || !password) {
          alert("Please enter both username/email and password.");
        } else {
          if (rememberMeCheckbox.checked) {
            localStorage.setItem("rememberedUsername", username);
          } else {
            localStorage.removeItem("rememberedUsername");
          }
          alert(`Welcome, ${username}!`);
        }
      });
    }
  
    // Change Profile Picture
    const profilePicture = document.getElementById("profile-picture");
    const photoUpload = document.getElementById("photo-upload");
  
    if (profilePicture && photoUpload) {
      const savedImage = localStorage.getItem("profilePicture");
      if (savedImage) {
        profilePicture.src = savedImage;
        profilePicture.classList.add("profile-image");
      }
  
      photoUpload.addEventListener("change", () => {
        const file = photoUpload.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            profilePicture.src = reader.result;
            profilePicture.classList.add("profile-image");
            localStorage.setItem("profilePicture", reader.result);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  
    // Edit Account Info
    const editButton = document.querySelector(".edit-info");
    const editBtns = document.querySelector(".edit-btns");
  
    if (editButton && editBtns) {
      editButton.addEventListener("click", () => {
        usernameInput.disabled = false;
        passwordInput.disabled = false;
  
        editButton.style.display = "none";
        loginButton.style.display = "none";
  
        const saveButton = document.createElement("button");
        saveButton.textContent = "Save Changes";
        saveButton.classList.add("save-btn");
        editBtns.appendChild(saveButton);
  
        const cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.classList.add("cancel-btn");
        editBtns.appendChild(cancelButton);
  
        const originalUsername = usernameInput.value;
        const originalPassword = passwordInput.value;
  
        saveButton.addEventListener("click", () => {
          const newUsername = usernameInput.value.trim();
          const newPassword = passwordInput.value.trim();
  
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          if (!emailRegex.test(newUsername)) {
            alert("Please enter a valid email address.");
            return;
          }
  
          const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if (!passwordRegex.test(newPassword)) {
            alert("Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.");
            return;
          }
  
          localStorage.setItem("savedUsername", newUsername);
          localStorage.setItem("savedPassword", newPassword);
  
          usernameInput.disabled = true;
          passwordInput.disabled = true;
  
          saveButton.remove();
          cancelButton.remove();
          editButton.style.display = "inline-block";
          loginButton.style.display = "inline-block";
  
          alert("Changes saved successfully!");
        });
  
        cancelButton.addEventListener("click", () => {
          usernameInput.value = originalUsername;
          passwordInput.value = originalPassword;
  
          usernameInput.disabled = true;
          passwordInput.disabled = true;
  
          saveButton.remove();
          cancelButton.remove();
          editButton.style.display = "inline-block";
          loginButton.style.display = "inline-block";
        });
      });
    }
  });
