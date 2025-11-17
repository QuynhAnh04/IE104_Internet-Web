document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('[data-action="toggle-popup"]');

    toggleButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); 
            
            const targetSelector = button.getAttribute('data-target');
            const targetElement = document.querySelector(targetSelector);

            if (targetElement) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    if (menu !== targetElement) {
                        menu.classList.remove('show');
                    }
                });
                targetElement.classList.toggle('show');
            }
        });
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
    });
});
