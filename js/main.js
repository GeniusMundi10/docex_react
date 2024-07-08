#### 4. JavaScript (js/main.js)
Adding interactivity and smooth scrolling:

```javascript
// main.js

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 50,  // Adjust for fixed header
                behavior: 'smooth'
            });
        });
    });

    // Add any additional JavaScript here
});
