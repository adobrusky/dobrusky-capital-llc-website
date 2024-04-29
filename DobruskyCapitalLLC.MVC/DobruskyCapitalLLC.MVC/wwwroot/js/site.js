$(document).ready(function () {
    let lastScrollTop = 0;
    isHome = !(typeof(isHome) == 'undefined');

    $('body').css('opacity', 1);

    if (!isHome) {
        $('body').css('padding-top', $('.navbar').outerHeight());
    }

    function isElementInView($elem) {
        let docViewTop = $(window).scrollTop();
        let docViewBottom = docViewTop + $(window).height();
        let elemTop = $elem.offset().top;
        return (elemTop <= docViewBottom);
    }

    function animateElements() {
        $('.indicator-row').each(function (index) {
            let $ind = $(this);

            // Calculate a delay based on the element's index to stagger the animations
            let delay = index * 100;

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
    function animateFormElements() {
        let $emailInput = $('#emailInput');
        if (isElementInView($emailInput) && !$emailInput.hasClass('animated')) {
            $emailInput.css({
                opacity: 1,
                transform: "translateX(0%)"
            }).addClass('animated');
        }

        let $button = $('.styled-btn.slide-in');
        if (isElementInView($button) && !$button.hasClass('animated')) {
            $button.css({
                opacity: 1,
                transform: "translateX(0%)"
            }).addClass('animated');
        }
    }


    function fadeInElements() {
        $('.fade-in').each(function (index) {
            let $ind = $(this);

            // Calculate a delay based on the element's index to stagger the animations
            let delay = index * 100;

            if (isElementInView($ind) && !$ind.hasClass('animated')) {
                setTimeout(function () {
                    $ind.css({
                        opacity: '1'
                    }).addClass('animated');
                }, delay);
            }
        });
    }

    function scrollLogic() {
        if (isHome) {
            animateElements();
            animateFormElements();

            // Landing page parallax
            let st = $(this).scrollTop() + 1;
            if (st > lastScrollTop) {
                $('.landing-section').css('background-position', `center ${st * -0.15}px`);
            } else {
                $('.landing-section').css('background-position', `center ${st * -0.15}px`);
            }
            lastScrollTop = st;

            // Adjust home page navbar background color
            if ($(this).scrollTop() > 0 && !$('#navbar').hasClass('.scrolled-navbar')) {
                $('#navbar').addClass('scrolled-navbar');
            } else {
                $('#navbar').removeClass('scrolled-navbar');
            }
        }
        fadeInElements();
    }
    scrollLogic();
    $(window).scroll(function () {
        scrollLogic();
    });

    $('#landing-page a').click(function (e) {
        let aboutPosition = $('#about').offset().top;
        let navbarHeight = $('.navbar').outerHeight();

        // Scroll to the #about section adjusting for the navbar height
        $('html, body').stop().animate({
            scrollTop: aboutPosition - navbarHeight
        }, 0, 'swing');
    });
});
