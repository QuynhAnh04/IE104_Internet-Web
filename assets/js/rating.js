document.addEventListener('DOMContentLoaded', function() {
    const ratingElements = document.querySelectorAll('.course-card-rating');

    ratingElements.forEach(ratingEl => {
        const rating = parseFloat(ratingEl.dataset.rating);
        if (!isNaN(rating)) {
            const widthPercentage = (rating / 5) * 100;

            ratingEl.style.setProperty('--rating-width', `${widthPercentage}%`);
        }
    });
});
