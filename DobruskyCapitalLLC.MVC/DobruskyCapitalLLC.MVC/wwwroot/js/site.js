$(document).ready(function () {
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

    // Bind scroll event to wi

    // Listen for scroll events on the window object
    $(window).scroll(function () {
        animateElements();
        // Check if the page is scrolled down more than 0 pixels
        if ($(this).scrollTop() > 0) {
            // If scrolled down, add the .scrolled-navbar class to the navbar
            $('#navbar').addClass('scrolled-navbar');
        } else {
            // If scrolled to the top, remove the .scrolled-navbar class from the navbar
            $('#navbar').removeClass('scrolled-navbar');
        }
    });
});
