function handleLogin() {
    // Get input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Validate inputs
    if (username.trim() === "" || password.trim() === "") {
        alert("Please fill in both fields.");
        return;
    }

    // Simulate login action
    alert(`Welcome, ${username}! You are now logged in.`);
    // You can redirect to another page using:
    // window.location.href = "dashboard.html";
}