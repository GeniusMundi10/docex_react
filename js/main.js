$(document).ready(function(){
    // Initialize Slick sliders
    $('.feature-slider, .steps-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });

    // Handling the modal opening
    $('#open-modal').click(function(e) {
        e.preventDefault();
        $('.modal-backdrop').show();
    });

    // Handling the modal closing
    $('.close').click(function() {
        $('.modal-backdrop').hide();
    });
});
