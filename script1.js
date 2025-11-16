document.addEventListener('DOMContentLoaded', function () {
    // Xử lý chọn đáp án
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function () {
            // Xóa chọn cũ trong cùng câu hỏi
            this.parentElement.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });

    // Hiện đáp án từng câu
    document.querySelectorAll('.see-answer').forEach(button => {
        button.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            if (answer && answer.classList.contains('answer')) {
                answer.style.display = 'block';
            }
        });
    });

    // Hiện tất cả đáp án (問題2)
    document.querySelectorAll('.see-answer-all').forEach(button => {
        button.addEventListener('click', function () {
            this.closest('.question-section').querySelectorAll('.answer-inline').forEach(ans => {
                ans.style.display = 'inline';
            });
        });
    });

    // Tắt quảng cáo (sidebar)
    document.getElementById('no-ad-btn').addEventListener('click', function () {
        document.querySelector('.sidebar').style.display = 'none';
        alert('Đã tắt quảng cáo! Cảm ơn bạn đã ủng hộ jlpt247 ❤️');
    });
});