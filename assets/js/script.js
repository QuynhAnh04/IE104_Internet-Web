// Chỉ thêm hiệu ứng, không thay đổi cấu trúc HTML
document.addEventListener('DOMContentLoaded', () => {
  // Hover cho nav-item
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.opacity = '0.7';
    });
    item.addEventListener('mouseleave', () => {
      item.style.opacity = '1';
    });
  });

  // Hover cho "Xem thêm"
  document.querySelectorAll('.view-more').forEach(viewMore => {
    viewMore.addEventListener('mouseenter', () => {
      viewMore.style.opacity = '0.7';
    });
    viewMore.addEventListener('mouseleave', () => {
      viewMore.style.opacity = '1';
    });
  });

  // Hover cho card (nâng lên)
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
});