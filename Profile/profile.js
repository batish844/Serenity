document.addEventListener("DOMContentLoaded", () => {
    const profileContainer = document.querySelector(".profile-container");
    const showProfileButton = document.getElementById("show-profile");
    const editButton = document.querySelector(".edit-info");
    const loginButton = document.querySelector(".Login");
    const usernameInput = document.querySelector(".Username");
    const passwordInput = document.querySelector(".password");
    const rememberMeCheckbox = document.getElementById("remember");
    const editBtns = document.querySelector(".edit-btns");

    if (localStorage.getItem("rememberedUsername")) {
        usernameInput.value = localStorage.getItem("rememberedUsername");
        rememberMeCheckbox.checked = true;
    }

    // Popup 
    showProfileButton.addEventListener("click", () => {
        if (profileContainer.classList.contains("active")) {
            profileContainer.classList.remove("active");
            setTimeout(() => {
                profileContainer.style.display = "none";
            }, 300);
        } else {
            profileContainer.style.display = "flex";
            setTimeout(() => profileContainer.classList.add("active"), 10);
        }
    });

    // Login  
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

    // Change photo 
    const profilePicture = document.getElementById("profile-picture");
    const photoUpload = document.getElementById("photo-upload");

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

// Edit Info
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

    // Store  values
    const originalUsername = usernameInput.value;
    const originalPassword = passwordInput.value;


    // Save  
    saveButton.addEventListener("click", () => {
        const newUsername = usernameInput.value.trim();
        const newPassword = passwordInput.value.trim();

        // Email valid
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(newUsername)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Password valid
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

    // Cancel 
    cancelButton.addEventListener("click", () => {

        // Reset the inputs 
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
});
