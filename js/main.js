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
   $('#open-modal').click(function() {
        $('.modal-backdrop').fadeIn();
    });

    // Trigger to close modal
    $('.close').click(function() {
        $('.modal-backdrop').fadeOut();
    });
});
});
