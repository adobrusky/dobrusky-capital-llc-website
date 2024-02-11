$(document).ready(function () {
    let lastScrollTop = 0; // Keep track of the last scroll position

    // Fade in body
    $('body').css('opacity', 1);

    // Function to check if an element is in the viewport
    function isElementInView($elem) {
        let docViewTop = $(window).scrollTop();
        let docViewBottom = docViewTop + $(window).height();
        let elemTop = $elem.offset().top;

        return ((elemTop <= docViewBottom));
    }

    // Function to animate elements when they enter the viewport
    function animateElements() {
        $('.indicator-row').each(function (index) {
            let $ind = $(this);

            // Calculate a delay based on the element's index to stagger the animations
            let delay = index * 100; // Adjust the multiplier as needed to change the delay time

            // Check if the element is in the viewport and hasn't been animated yet
            if (isElementInView($ind) && !$ind.hasClass('animated')) {
                setTimeout(function () {
                    $ind.css({
                        opacity: '1',
                        transform: 'translateX(0)'
                    }).addClass('animated'); // Add a class to mark it as animated
                }, delay);
            }
        });
    }

    function scrollLogic() {
        if (isHome) {
            animateElements();

            let st = $(this).scrollTop() + 1;
            if (st > lastScrollTop) {
                // Scrolling Down
                $('.landing-section').css('background-position', `0px ${st * -0.15}px`);
            } else {
                // Scrolling Up
                $('.landing-section').css('background-position', `0px ${st * -0.15}px`);
            }
            lastScrollTop = st;

            // Scrolled navbar logic
            if ($(this).scrollTop() > 0 && !$('#navbar').hasClass('.scrolled-navbar')) {
                $('#navbar').addClass('scrolled-navbar');
            } else {
                $('#navbar').removeClass('scrolled-navbar');
            }
        }
    }
    scrollLogic();
    $(window).scroll(function () {
        scrollLogic();
    });

    // When the link with href="#about" is clicked
    $('#landing-page a').click(function (e) {
        // Calculate the position of the start of the #about section
        let aboutPosition = $('#about').offset().top;

        // Get the height of the navbar
        let navbarHeight = $('.navbar').outerHeight();

        // Scroll to the #about section, adjusting for the navbar height
        $('html, body').stop().animate({
            scrollTop: aboutPosition - navbarHeight
        }, 0, 'swing');
    });
});
