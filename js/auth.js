// Handle the sign-in form submission
document.getElementById("signinForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    authenticateUser(email, password).then(success => {
        if (success) {
            window.location.href = "index.html"; // Redirect to the landing page if successful
        } else {
            alert("Authentication failed. Please check your credentials.");
        }
    });
});

// Handle the registration form submission
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("regEmail").value;
    var password = document.getElementById("regPassword").value;

    registerUser(email, password).then(success => {
        if (success) {
            alert("Registration successful! You can now sign in.");
            window.location.href = "sign-in.html"; // Redirect to sign-in page
        } else {
            alert("Registration failed. This email is already registered.");
        }
    });
});

// Mock authentication logic
function authenticateUser(email, password) {
    return new Promise((resolve) => {
        var storedUser = localStorage.getItem(email);
        if (storedUser && JSON.parse(storedUser).password === password) {
            localStorage.setItem("isLoggedIn", "true");
            resolve(true);
        } else {
            resolve(false);
        }
    });
}

// Mock registration logic
function registerUser(email, password) {
    return new Promise((resolve) => {
        if (!localStorage.getItem(email)) {
            var userData = {
                email: email,
                password: password
            };
            localStorage.setItem(email, JSON.stringify(userData));
            resolve(true);
        } else {
            resolve(false);
        }
    });
}
