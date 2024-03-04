$(document).ready(function () {
    let lastScrollTop = 0;

    $('body').css('opacity', 1);

    // Check if an element is in the viewport
    function isElementInView($elem) {
        let docViewTop = $(window).scrollTop();
        let docViewBottom = docViewTop + $(window).height();
        let elemTop = $elem.offset().top;
        return (elemTop <= docViewBottom);
    }

    // Animate indicator elements when they come into viewport
    function animateElements() {
        $('.indicator-row').each(function (index) {
            let $ind = $(this);

            // Calculate a delay based on the element's index to stagger the animations
            let delay = index * 100;

            // Check if the element is in the viewport and hasn't been animated yet
            if (isElementInView($ind) && !$ind.hasClass('animated')) {
                setTimeout(function () {
                    $ind.css({
                        opacity: '1',
                        transform: 'translateX(0)'
                    }).addClass('animated');
                }, delay);
            }
        });
    }

    function scrollLogic() {
        if (isHome) {
            animateElements();

            let st = $(this).scrollTop() + 1;
            if (st > lastScrollTop) {
                $('.landing-section').css('background-position', `0px ${st * -0.15}px`);
            } else {
                $('.landing-section').css('background-position', `0px ${st * -0.15}px`);
            }
            lastScrollTop = st;

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

    $('#landing-page a').click(function (e) {
        let aboutPosition = $('#about').offset().top;
        let navbarHeight = $('.navbar').outerHeight();

        // Scroll to the #about section, adjusting for the navbar height
        $('html, body').stop().animate({
            scrollTop: aboutPosition - navbarHeight
        }, 0, 'swing');
    });
});
