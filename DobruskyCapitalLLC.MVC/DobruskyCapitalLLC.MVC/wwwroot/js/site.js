$(document).ready(function () {
    let lastScrollTop = 0; // Keep track of the last scroll position

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

    // Animate elements that are already in view on load
    animateElements();
    let st = $(this).scrollTop();
    if (st > lastScrollTop) {
        // Scrolling Down
        $('.landing-section').css('background-position', `0px ${st * -0.05}px`);
    } else {
        // Scrolling Up
        $('.landing-section').css('background-position', `0px ${st * -0.05}px`);
    }
    // Listen for scroll events on the window object
    $(window).scroll(function () {
        animateElements();

        let st = $(this).scrollTop() + 1;
        if (st > lastScrollTop){
            // Scrolling Down
            $('.landing-section').css('background-position', `0px ${st * -0.05}px`);
        } else {
            // Scrolling Up
            $('.landing-section').css('background-position', `0px ${st * -0.05}px`);
        }
        lastScrollTop = st;

        // Scrolled navbar logic
        if ($(this).scrollTop() > 0) {
            $('#navbar').addClass('scrolled-navbar');
        } else {
            $('#navbar').removeClass('scrolled-navbar');
        }
    });
});
