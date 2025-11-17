// ⭐ Rút năm từ HISTORY
function extractYearsFromHistory() {
  const years = new Set();

  HISTORY.forEach(ev => {
    const year = ev.time.slice(0, 4); // YYYY
    years.add(year);
  });

  return Array.from(years).sort((a, b) => b - a); // năm lớn → trước
}

// ⭐ Tạo danh sách năm trong dropdown
function populateYearDropdown() {
  const yearSelect = document.getElementById("yearSelect");
  const years = extractYearsFromHistory();

  yearSelect.innerHTML = "";

  years.forEach(year => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  });

  return years[0]; // năm mới nhất
}

// ⭐ Hàm vẽ calendar theo đúng năm
function renderCalendar(year) {
  const calendarGrid = document.getElementById("calendar-grid");
  const monthLabels = document.getElementById("month-labels");

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const weeksPerMonth = 3;
  const daysPerWeek = 7;

  // reset labels tháng
  monthLabels.innerHTML = "";
  months.forEach(m => {
    const span = document.createElement("span");
    span.textContent = m;
    monthLabels.appendChild(span);
  });

  // gom dữ liệu theo ngày CỦA ĐÚNG NĂM
  const map = {};
  HISTORY.forEach(ev => {
    if (ev.time.startsWith(year.toString())) {
      const day = ev.time.slice(0, 10);
      if (!map[day]) map[day] = 0;
      map[day] += ev.duration;
    }
  });

  // clear grid và vẽ lại
  calendarGrid.innerHTML = "";

  for (let m = 0; m < 12; m++) {
    for (let w = 0; w < weeksPerMonth; w++) {
      for (let d = 1; d <= daysPerWeek; d++) {
        const date = new Date(year, m, w * 7 + d);
        const key = date.toISOString().slice(0, 10);

        const cell = document.createElement("div");
        cell.classList.add("day-cell");

        if (map[key]) {
          const lv = getActivityLevel(map[key]);
          if (lv > 0) cell.classList.add(`level-${lv}`);
        }

        calendarGrid.appendChild(cell);
      }
    }
  }
}

// ⭐ Khởi động
function initCalendar() {
  const newestYear = populateYearDropdown(); // load dropdown
  renderCalendar(newestYear);                // vẽ lịch mặc định

  // khi user chọn năm → vẽ lại
  document.getElementById("yearSelect")
    .addEventListener("change", function () {
      renderCalendar(this.value);
    });
}

initCalendar();
