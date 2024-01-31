document.addEventListener("DOMContentLoaded", function () {
    const indicators = document.querySelectorAll('.indicator-row');
    indicators.forEach(ind => {
        setTimeout(() => {
            ind.style.opacity = '1';
            ind.style.transform = 'translateX(0)';
        }, 200);
    });
});