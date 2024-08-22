document.getElementById("signinForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Mock authentication logic
    authenticateUser(email, password).then(success => {
        if (success) {
            // Redirect to the landing page if authentication is successful
            window.location.href = "index.html";
        } else {
            alert("Authentication failed. Please check your credentials.");
        }
    });
});

function authenticateUser(email, password) {
    // Simulate an authentication function
    return new Promise((resolve) => {
        if (email === "user@example.com" && password === "password123") {
            localStorage.setItem("isLoggedIn", "true");
            resolve(true);
        } else {
            resolve(false);
        }
    });
}
