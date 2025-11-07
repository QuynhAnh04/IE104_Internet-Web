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
    
    //Nhấp để hiện box
    const userIcon = document.getElementById('userIcon');
    const userMenu = document.getElementById('userMenu');

    if (userIcon && userMenu) {
        userIcon.addEventListener('click', function(event) {
            // Tránh bị ẩn ngay lập tức
            event.stopPropagation(); 
            
            // Nếu menu đang hiển thị thì chuyển sang ẩn và ngược lại
            if (userMenu.style.display === 'block') {
                userMenu.style.display = 'none';
            } else {
                userMenu.style.display = 'block';
            }

        });

        // Ẩn menu khi người dùng bấm ra ngoài 
        document.addEventListener('click', function(event) {
            if (!userMenu.contains(event.target) && userMenu.style.display === 'block') {
                userMenu.style.display = 'none';
            }
        });
    }

    //Rating
    const ratingElements = document.querySelectorAll('.course-card-rating');

    ratingElements.forEach(ratingEl => {
        const rating = parseFloat(ratingEl.dataset.rating);
        if (!isNaN(rating)) {
            const widthPercentage = (rating / 5) * 100;
            
            ratingEl.style.setProperty('--rating-width', `${widthPercentage}%`);
        }
    });

    //Slider
    const coursesGrid = document.getElementById('coursesGrid');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (coursesGrid && prevBtn && nextBtn) {
        const scrollAmount = 270; 

        nextBtn.addEventListener('click', () => {
            coursesGrid.scrollLeft += scrollAmount;
        });

        prevBtn.addEventListener('click', () => {
            coursesGrid.scrollLeft -= scrollAmount;
        });
        
        const updateNavArrows = () => {
            prevBtn.style.display = coursesGrid.scrollLeft > 5 ? 'block' : 'none'; 
            const maxScroll = coursesGrid.scrollWidth - coursesGrid.clientWidth;
            
            if (maxScroll - coursesGrid.scrollLeft < 5) { 
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'block';
            }
        };
        
        coursesGrid.addEventListener('scroll', updateNavArrows);
        
        updateNavArrows();
    }

    //ScrollToTop
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
