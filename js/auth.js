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
                    if (error.code === 'auth/wrong-password') {
                        alert('Incorrect password. Please try again.');
                    } else if (error.code === 'auth/user-not-found') {
                        alert('No account found with this email. Please register first.');
                    } else if (error.code === 'auth/invalid-email') {
                        alert('The email address is badly formatted.');
                    } else {
                        alert('Error: ' + error.message);
                    }
                });
        });
    }

    // Register user
    // Register user
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.getElementById("regEmail").value;
            const password = document.getElementById("regPassword").value;
    
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Registration successful
                    console.log('User registered:', userCredential.user);
                    // Redirect to a "registration success" page
                    window.location.href = "registration-success.html";
                })
                .catch((error) => {
                    console.error('Registration error:', error);
                    alert('Error: ' + error.message);
                });
        });
    }
});

// Authentication state observer
// Authentication state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User is signed in:', user);
        document.getElementById('signInBtn').style.display = 'none'; // Hide Sign In button
        document.getElementById('signOutBtn').style.display = 'inline-block'; // Show Sign Out button
    } else {
        console.log('No user is signed in.');
        document.getElementById('signInBtn').style.display = 'inline-block'; // Show Sign In button
        document.getElementById('signOutBtn').style.display = 'none'; // Hide Sign Out button
    }
});

// Sign out user
document.getElementById('signOutBtn').addEventListener('click', function() {
    auth.signOut().then(() => {
        console.log('User signed out.');
        window.location.href = "index.html"; // Redirect to the main page after signing out
    }).catch((error) => {
        console.error('Sign out error:', error);
    });
});
// Protect pages that require authentication
// Protect pages that require authentication
function requireAuth() {
    auth.onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = "sign-in.html"; // Redirect to sign-in page if not authenticated
        } else {
            // If authenticated, proceed with the action
            window.location.href = "https://invoiceextraction.streamlit.app/"; // Or any other action you want to trigger
        }
    });
}


