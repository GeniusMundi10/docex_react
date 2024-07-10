document.addEventListener('DOMContentLoaded', () => {
    // Initialize Slick Carousel
    $('.feature-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        variableWidth: true
    });
})
