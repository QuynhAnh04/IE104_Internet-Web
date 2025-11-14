document.addEventListener('DOMContentLoaded', function() {
    //Auto-hide navbar
    const header = document.querySelector('header')

    if (header) {
        let prevScrollPos = window.scrollY;
        const headerHeight = header.offsetHeight;

        window.addEventListener('scroll', () => {
            const currScrollPos = window.scrollY;

            if (currScrollPos > prevScrollPos && currScrollPos > headerHeight) {
                header.classList.add('header-hidden');
            }

            else if (currScrollPos < prevScrollPos) {
                header.classList.remove('header-hidden');
            }

            prevScrollPos = currScrollPos;
        });
    }
});
