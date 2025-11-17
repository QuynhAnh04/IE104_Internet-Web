/* ============================
    DỮ LIỆU EXAM
============================ */
const examData = [
    /* N5 */
    {
        id: 1,
        level: "N5",
        skill: "kanji",
        name: "Kanji cơ bản N5",
        questions: 25,
        time: 20,
        tries: 1203,
        rating: 4.8,

        description: "Bài luyện tập nhận diện và đọc Kanji cơ bản dành cho trình độ JLPT N5.",
        content: [
            "Nhận diện hình dạng Kanji",
            "Chọn âm đọc On/Kun",
            "Chọn nghĩa tiếng Việt",
            "Ghép Kanji thành từ",
            "Dùng Kanji vào câu ví dụ"
        ]
    },
    {
        id: 2,
        level: "N5",
        skill: "vocab",
        name: "Từ vựng N5 - Chủ đề con người",
        questions: 30,
        time: 20,
        tries: 950,
        rating: 4.7,

        description: "Ôn tập từ vựng chủ đề con người thường xuất hiện trong JLPT N5.",
        content: [
            "Từ vựng mô tả người và hành động",
            "Chọn nghĩa phù hợp",
            "Điền từ vào câu",
            "Chọn từ khóa đúng với ngữ cảnh"
        ]
    },
    {
        id: 3,
        level: "N5",
        skill: "grammar",
        name: "Ngữ pháp N5 - Phần 1",
        questions: 20,
        time: 15,
        tries: 1500,
        rating: 4.9,

        description: "Các cấu trúc ngữ pháp cơ bản N5 giúp xây dựng câu đơn giản.",
        content: [
            "Mẫu câu cơ bản",
            "Chọn trợ từ thích hợp",
            "Sắp xếp câu",
            "Hoàn thành câu theo ngữ pháp"
        ]
    },
    {
        id: 4,
        level: "N5",
        skill: "reading",
        name: "Đọc hiểu N5 - Bài đọc ngắn",
        questions: 10,
        time: 15,
        tries: 840,
        rating: 4.6,

        description: "Đọc hiểu các đoạn văn ngắn với cấu trúc đơn giản.",
        content: [
            "Đọc đoạn văn ngắn",
            "Tìm thông tin chính",
            "Trả lời câu hỏi cơ bản",
            "Xác định các từ khóa quan trọng"
        ]
    },
    {
        id: 5,
        level: "N5",
        skill: "listening",
        name: "Nghe hiểu N5 - Hội thoại cơ bản",
        questions: 15,
        time: 20,
        tries: 720,
        rating: 4.5,

        description: "Nghe hội thoại ngắn, tốc độ chậm, chủ đề quen thuộc.",
        content: [
            "Nghe đoạn hội thoại 1 câu",
            "Nghe câu hỏi - chọn đáp án đúng",
            "Nhận diện từ khóa khi nghe",
            "Tình huống đời sống cơ bản"
        ]
    },
    {
        id: 6,
        level: "N5",
        skill: "combined",
        name: "Đề tổng hợp N5 - Luyện thi JLPT",
        questions: 45,
        time: 40,
        tries: 1500,
        rating: 4.9,

        description: "Đề thi tổng hợp mô phỏng đúng cấu trúc bài thi JLPT N5.",
        content: [
            "Kanji cơ bản",
            "Từ vựng theo chủ đề",
            "Ngữ pháp chủ đạo",
            "Đọc hiểu đoạn ngắn",
            "Nghe hiểu hội thoại"
        ]
    },


    /* N4 */
    { id: 8, level: "N4", skill: "kanji", name: "Kanji N4 - Phần 1", questions: 30, time: 25, tries: 900, rating: 4.5 },
    { id: 9, level: "N4", skill: "vocab", name: "Từ vựng N4 - Phần 1", questions: 35, time: 25, tries: 880, rating: 4.6 },
    { id: 10, level: "N4", skill: "grammar", name: "Ngữ pháp N4 - Mẫu câu quan trọng", questions: 25, time: 20, tries: 1100, rating: 4.8 },
    { id: 11, level: "N4", skill: "reading", name: "Đọc hiểu N4 - Đoạn văn vừa", questions: 12, time: 20, tries: 760, rating: 4.4 },
    { id: 12, level: "N4", skill: "listening", name: "Nghe hiểu N4 - Hội thoại hàng ngày", questions: 20, time: 25, tries: 680, rating: 4.5 },
    { id: 13, level: "N4", skill: "combined", name: "Đề tổng hợp N4 - Luyện thi JLPT", questions: 55, time: 45, tries: 1200, rating: 4.8 },

    /* N3 */
    { id: 14, level: "N3", skill: "kanji", name: "Kanji N3 - Bộ thủ & Từ ghép", questions: 35, time: 30, tries: 830, rating: 4.5 },
    { id: 15, level: "N3", skill: "vocab", name: "Từ vựng N3 - Chủ đề công việc", questions: 40, time: 30, tries: 760, rating: 4.4 },
    { id: 16, level: "N3", skill: "grammar", name: "Ngữ pháp N3 - Mẫu nâng cao", questions: 30, time: 25, tries: 1050, rating: 4.7 },
    { id: 17, level: "N3", skill: "reading", name: "Đọc hiểu N3 - Bài dài", questions: 15, time: 25, tries: 900, rating: 4.5 },
    { id: 18, level: "N3", skill: "listening", name: "Nghe hiểu N3 - Tốc độ tự nhiên", questions: 25, time: 30, tries: 700, rating: 4.3 },
    { id: 19, level: "N3", skill: "combined", name: "Đề tổng hợp N3 - Luyện thi", questions: 60, time: 50, tries: 1300, rating: 4.7 },

    /* N2 */
    { id: 20, level: "N2", skill: "kanji", name: "Kanji N2 - Từ ghép thường gặp", questions: 40, time: 35, tries: 690, rating: 4.4 },
    { id: 21, level: "N2", skill: "vocab", name: "Từ vựng N2 - Chủ đề xã hội", questions: 45, time: 35, tries: 720, rating: 4.5 },
    { id: 22, level: "N2", skill: "grammar", name: "Ngữ pháp N2 - Mức trung cấp cao", questions: 35, time: 30, tries: 950, rating: 4.6 },
    { id: 23, level: "N2", skill: "reading", name: "Đọc hiểu N2 - Bài phân tích", questions: 20, time: 30, tries: 860, rating: 4.5 },
    { id: 24, level: "N2", skill: "listening", name: "Nghe hiểu N2 - Bản tin nhanh", questions: 30, time: 35, tries: 630, rating: 4.2 },
    { id: 25, level: "N2", skill: "combined", name: "Đề tổng hợp N2 - Chuẩn JLPT", questions: 70, time: 55, tries: 1150, rating: 4.6 },

    /* N1 */
    { id: 26, level: "N1", skill: "kanji", name: "Kanji N1 - Từ nâng cao", questions: 45, time: 40, tries: 500, rating: 4.3 },
    { id: 27, level: "N1", skill: "vocab", name: "Từ vựng N1 - Từ khó", questions: 50, time: 40, tries: 480, rating: 4.2 },
    { id: 28, level: "N1", skill: "grammar", name: "Ngữ pháp N1 - Cấu trúc học thuật", questions: 40, time: 35, tries: 650, rating: 4.4 },
    { id: 29, level: "N1", skill: "reading", name: "Đọc hiểu N1 - Bài dài & khó", questions: 25, time: 40, tries: 540, rating: 4.3 },
    { id: 30, level: "N1", skill: "listening", name: "Nghe hiểu N1 - Tốc độ tự nhiên", questions: 35, time: 40, tries: 460, rating: 4.1 },
    { id: 31, level: "N1", skill: "combined", name: "Đề tổng hợp N1 - JLPT khó nhất", questions: 80, time: 60, tries: 780, rating: 4.5 },
];

/* ============================
    TRẠNG THÁI MỞ / THU GỌN
============================ */
let levelState = { N5: false, N4: false, N3: false, N2: false, N1: false };

/* ============================
    STICKY TOPBAR SYNC
============================ */
const header = document.querySelector("header");
const examTopbar = document.querySelector(".exam-topbar");

window.addEventListener("scroll", () => {
    examTopbar.style.top = header.classList.contains("header-hidden")
        ? "0px"
        : "58px";
});

/* ============================
    SELECTORS
============================ */
const examContainer = document.querySelector(".exam-sections");
const searchInput = document.querySelector(".exam-search-bar input");
const filterSelect = document.querySelector(".exam-filter");
const levelButtons = document.querySelectorAll(".level");

let currentLevel = "ALL";
let searchKeyword = "";
let currentFilter = "";

/* ============================
    CARD HTML
============================ */
function renderExamCard(exam) {
    return `
    <div class="exam-card">
        <div class="exam-header">
            <span class="level-badge">${exam.level}</span>
            <h4 class="exam-name">${exam.name}</h4>
        </div>
        <div class="exam-info">
            <p><i class="fa-solid fa-layer-group"></i> ${exam.questions} câu</p>
            <p><i class="fa-solid fa-clock"></i> ${exam.time} phút</p>
            <p><i class="fa-solid fa-user-group"></i> ${exam.tries} lượt làm</p>
        </div>
        <div class="exam-footer">
            <span class="rating">
                <i class="fa-solid fa-star"></i> ${exam.rating}
            </span>
            <button class="start-btn">Bắt đầu</button>
        </div>
    </div>`;
}

/* ============================
    RENDER TỪNG CẤP
============================ */
function renderLevelSection(level) {
    let filtered = examData.filter(exam => exam.level === level);

    filtered = filtered.filter(exam =>
        exam.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    if (currentFilter !== "") {
        filtered = filtered.filter(exam => exam.skill === currentFilter);
    }

    const expanded = levelState[level];
    const visibleItems = expanded ? filtered : filtered.slice(0, 3);
    const showButton = filtered.length > 3;

    return `
    <div class="exam-section">
        <div class="exam-section-top">
            <h3 class="exam-title">${level} - Bài thi trình độ ${level}</h3>

            ${showButton ? `
            <button class="see-more-inline" data-level="${level}">
                ${expanded ? "Thu gọn" : "Xem thêm"}
                <i class="fa-solid ${expanded ? "fa-chevron-up" : "fa-chevron-down"}"></i>
            </button>` : ""}
        </div>

        <div class="exam-row">
            ${visibleItems.map(renderExamCard).join("")}
        </div>
    </div>`;
}

/* ============================
    RENDER ALL LEVELS
============================ */
function renderAll() {
    const levels = ["N5", "N4", "N3", "N2", "N1"];
    examContainer.innerHTML = levels.map(renderLevelSection).join("");
    attachSeeMoreEvents();
    attachCardClickEvents();
}

/* ============================
    SEARCH
============================ */
searchInput.addEventListener("input", e => {
    searchKeyword = e.target.value.trim();
    if (currentLevel === "ALL") renderAll();
    else {
        examContainer.innerHTML = renderLevelSection(currentLevel);
        attachSeeMoreEvents();
        attachCardClickEvents();
    }
});

/* ============================
    FILTER SKILL
============================ */
filterSelect.addEventListener("change", e => {
    currentFilter = e.target.value;
    if (currentLevel === "ALL") renderAll();
    else {
        examContainer.innerHTML = renderLevelSection(currentLevel);
        attachSeeMoreEvents();
        attachCardClickEvents();
    }
});

/* ============================
    CHỌN CẤP ĐỘ
============================ */
levelButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        levelButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const selected = btn.dataset.level;

        levelState = { N5: false, N4: false, N3: false, N2: false, N1: false };

        if (selected === "ALL") {
            currentLevel = "ALL";
            renderAll();
        } else {
            currentLevel = selected;
            examContainer.innerHTML = renderLevelSection(selected);
            attachSeeMoreEvents();
            attachCardClickEvents();
        }
    });
});

/* ============================
    CLICK CARD → OPEN SHEET
============================ */
function attachCardClickEvents() {
    document.querySelectorAll(".exam-card").forEach(card => {
        card.addEventListener("click", () => {

            const examName = card.querySelector(".exam-name").textContent;
            const exam = examData.find(e => e.name === examName);

            if (!exam) return;

            // Fill bottom sheet
            document.getElementById("sheetTitle").textContent = exam.name;
            document.getElementById("sheetQuestions").textContent = `${exam.questions} câu`;
            document.getElementById("sheetTime").textContent = `${exam.time} phút`;
            document.getElementById("sheetTries").textContent = `${exam.tries} lượt làm`;
            document.getElementById("sheetRating").textContent = exam.rating;

            // Mô tả
            document.getElementById("sheetDescription").textContent = exam.description ?? "Không có mô tả.";

            // Nội dung bài thi
            document.getElementById("sheetContentList").innerHTML =
                (exam.content ?? [])
                .map(item => `<li>${item}</li>`).join("");

            openSheet();
        });
    });
}

/* ============================
    XEM THÊM / THU GỌN
============================ */
function attachSeeMoreEvents() {
    const moreButtons = document.querySelectorAll(".see-more-inline");

    moreButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const level = btn.dataset.level;
            levelState[level] = !levelState[level];

            if (currentLevel === "ALL") renderAll();
            else {
                examContainer.innerHTML = renderLevelSection(currentLevel);
                attachSeeMoreEvents();
                attachCardClickEvents();
            }
        });
    });
}

/* ============================
    KHỞI TẠO
============================ */
renderAll();

/* ================================
    BOTTOM SHEET OPEN / CLOSE
================================ */
const sheet = document.getElementById("examSheet");
const sheetOverlay = document.getElementById("sheetOverlay");
const sheetCloseBtn = document.getElementById("sheetCloseBtn");

function openSheet() {
    sheet.classList.remove("hidden");
    sheetOverlay.classList.remove("hidden");

    setTimeout(() => {
        sheet.classList.add("show");
        sheetOverlay.classList.add("show");
    }, 10);
}

function closeSheet() {
    sheet.classList.remove("show");
    sheetOverlay.classList.remove("show");

    setTimeout(() => {
        sheet.classList.add("hidden");
        sheetOverlay.classList.add("hidden");
    }, 200);
}

sheetCloseBtn.addEventListener("click", closeSheet);
sheetOverlay.addEventListener("click", closeSheet);

