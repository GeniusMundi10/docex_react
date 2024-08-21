$(document).ready(function(){
    $('.feature-slider, .steps-slider, .testimonial-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    });

    // Modal functionality
    var modal = document.getElementById("demoModal");
    modal.style.display = "none"; 
    var btn = document.getElementById("open-modal");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "flex";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const faqItem = item.parentElement;
        faqItem.classList.toggle('active');
    });
});

function openForm(evt, formName) {
    // Hide all tabcontent elements
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Remove the active class from all tablinks
    var tablinks = document.getElementsByClassName("tablink");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the selected tabcontent and add an "active" class to the clicked tab
    document.getElementById(formName).style.display = "block";
    document.getElementById(formName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Set the default tab to display on page load
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("Book").style.display = "block";
    document.getElementById("Book").classList.add("active");
});
