document.addEventListener('DOMContentLoaded', function() {
    function initSlider(slider) {
        const coursesGrid = slider.querySelector('.knowledge-grid, .skill-grid, .courses-grid');
        const prevBtn = slider.querySelector('.prev-arrow');
        const nextBtn = slider.querySelector('.next-arrow');

        if (coursesGrid && prevBtn && nextBtn) {
            const scrollAmount = 270;

            nextBtn.addEventListener('click', () => {
                coursesGrid.scrollLeft += scrollAmount;
            });

            prevBtn.addEventListener('click', () => {
                coursesGrid.scrollLeft -= scrollAmount;
            });

            const updateNavArrows = () => {
                const maxScroll = coursesGrid.scrollWidth - coursesGrid.clientWidth;

                if (maxScroll <= 5) {
                    prevBtn.style.display = 'none';
                    nextBtn.style.display = 'none';
                    return;
                }
                prevBtn.style.display = coursesGrid.scrollLeft > 5 ? 'block' : 'none';

                if (maxScroll - coursesGrid.scrollLeft < 5) {
                    nextBtn.style.display = 'none';
                } else {
                    nextBtn.style.display = 'block';
                }
            };

            coursesGrid.addEventListener('scroll', updateNavArrows);
            window.addEventListener('resize', updateNavArrows);

            updateNavArrows();
        }
    }
    const allSlider = document.querySelectorAll('.slider');
    allSlider.forEach(initSlider);
});
