
document.addEventListener('DOMContentLoaded', function () {

    // Khi bấm chọn đáp án
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function () {
            const question = this.closest('.question');

            // Xóa chọn cũ trong cùng câu
            question.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected', 'correct', 'incorrect');
            });

            // Đánh dấu ô vừa chọn
            this.classList.add('selected');

            // Lưu lựa chọn RIÊNG cho từng câu (rất quan trọng!)
            question.userChoice = this.getAttribute('data-num');
        });
    });

    // Khi bấm SEE ANSWER
    document.querySelectorAll('.see-answer').forEach(button => {
        button.addEventListener('click', function () {
            const question   = this.closest('.question');
            const correctNum = question.getAttribute('data-correct');
            const answerDiv  = question.querySelector('.answer');
            const userChoice = question.userChoice;  // lấy riêng của câu này

            // Reset trước khi hiển thị
            answerDiv.classList.remove('show');
            question.querySelectorAll('.option').forEach(opt => opt.classList.remove('correct', 'incorrect'));

            if (!userChoice) {
                answerDiv.innerHTML = 'Bạn chưa chọn đáp án nào!';
                answerDiv.style.background = '#fff3e0';
                answerDiv.style.borderLeft = '5px solid #ff9800';
                answerDiv.classList.add('show');
                return;
            }

            if (userChoice === correctNum) {
                question.querySelector(`.option[data-num="${userChoice}"]`).classList.add('correct');
                answerDiv.innerHTML = `ĐÚNG RỒI! Đáp án đúng: <strong>${correctNum}</strong>`;
                answerDiv.style.background = '#e8f5e9';
                answerDiv.style.borderLeft = '5px solid #4caf50';
            } else {
                question.querySelector(`.option[data-num="${userChoice}"]`).classList.add('incorrect');
                question.querySelector(`.option[data-num="${correctNum}"]`).classList.add('correct');
                answerDiv.innerHTML = `SAI RỒI! Đáp án đúng: <strong>${correctNum}</strong>`;
                answerDiv.style.background = '#ffebee';
                answerDiv.style.borderLeft = '5px solid #f44336';
            }

            answerDiv.classList.add('show');
        });
    });

    // Tắt quảng cáo
    document.getElementById('no-ad')?.addEventListener('click', () => {
        document.querySelector('.sidebar').style.display = 'none';
        localStorage.setItem('noAd2025', 'true');
    });
    if (localStorage.getItem('noAd2025') === 'true') {
        document.querySelector('.sidebar').style.display = 'none';
    }
});