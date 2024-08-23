// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlnN9dS1OXmc25BAdguCcu-6Xpn_su9k0",
    authDomain: "docex-58657.firebaseapp.com",
    projectId: "docex-58657",
    storageBucket: "docex-58657.appspot.com",
    messagingSenderId: "509515699254",
    appId: "1:509515699254:web:5876dbbb5052b5d4ca3497",
    measurementId: "G-H1MJWEL47F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to the auth service
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', function () {
    // Sign-in user
    const signinForm = document.getElementById("signinForm");
    if (signinForm) {
        signinForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in successfully
                    console.log('User signed in:', userCredential.user);
                    window.location.href = "index.html"; // Redirect to the main page
                })
                .catch((error) => {
                    console.error('Login error:', error);
                    alert('Error: ' + error.message);
                });
        });
    }

    // Register user
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.getElementById("regEmail").value; 
            const password = document.getElementById("regPassword").value;

            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Registered successfully
                    console.log('User registered:', userCredential.user);
                    window.location.href = "index.html"; // Redirect to the main page
                })
                .catch((error) => {
                    console.error('Registration error:', error);
                    alert('Error: ' + error.message);
                });
        });
    }
});

// Authentication state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User is signed in:', user);
        // User is signed in, you can add code here to display user info or manage sessions
    } else {
        console.log('No user is signed in.');
        // No user is signed in, redirect to sign-in page or display a message
    }
});

// Sign out function (optional)
function signOutUser() {
    auth.signOut().then(() => {
        console.log('User signed out.');
        window.location.href = "sign-in.html"; // Redirect to sign-in page after signing out
    }).catch((error) => {
        console.error('Sign out error:', error);
    });
}

// Protect pages that require authentication
function requireAuth() {
    auth.onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = "sign-in.html"; // Redirect to sign-in page if not authenticated
        }
    });
}

// Call requireAuth() on protected pages (e.g., index.html, docex.html)
requireAuth();
