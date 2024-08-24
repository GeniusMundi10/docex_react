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
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const email = document.getElementById("regEmail").value;
            const password = document.getElementById("regPassword").value;
            console.log(`Attempting to register user with email: ${email}`);
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Registration successful
                    console.log('User registered:', userCredential.user);
                    console.log(`Newly registered user UID: ${userCredential.user.uid}`);
                    // Sign out the user immediately after registration
                    auth.signOut().then(() => {
                        console.log('User signed out after registration.');
                        // Redirect to the registration success page
                        window.location.href = "registration-success.html";
                    }).catch((error) => {
                        console.error('Sign out error after registration:', error);
                    });
                })
                .catch((error) => {
                    console.error('Registration error:', error);
                    alert('Error: ' + error.message);
                });
        });
    }

    // Check if a user is signed in and update UI elements
    auth.onAuthStateChanged((user) => {
        const signInBtn = document.getElementById('signInBtn');
        const signOutBtn = document.getElementById('signOutBtn');
        const getDemoBtn = document.getElementById('try-docex-btn');
        
        if (user) {
            console.log('User is signed in:', user);
            signInBtn.style.display = 'none'; // Hide Sign In button
            signOutBtn.style.display = 'inline-block'; // Show Sign Out button
            getDemoBtn.href = "https://invoiceextraction.streamlit.app/"; // Change Get Demo link to the tool page
        } else {
            console.log('No user is signed in.');
            signInBtn.style.display = 'inline-block'; // Show Sign In button
            signOutBtn.style.display = 'none'; // Hide Sign Out button
            getDemoBtn.href = "register.html"; // Change Get Demo link to the registration page
        }
    });

    // Sign out user
    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', function() {
            auth.signOut().then(() => {
                console.log('User signed out.');
                window.location.href = "index.html"; // Redirect to the main page after signing out
            }).catch((error) => {
                console.error('Sign out error:', error);
            });
        });
    }

    // Optional: Require authentication for certain actions/pages
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

    // Attach requireAuth to specific actions, e.g., a button click
    const tryDocExBtn = document.getElementById('try-docex-btn');
    if (tryDocExBtn) {
        tryDocExBtn.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default action (following the link)
            requireAuth();
        });
    }
});
