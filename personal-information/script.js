// ===== SCALE FIGMA =====
function scaleFigma() {
  const frame = document.querySelector('.figma-frame');
  if (!frame) return;
  const scale = window.innerWidth / 1280;
  frame.style.transform = `scale(${scale})`;
}
window.addEventListener('load', scaleFigma);
window.addEventListener('resize', scaleFigma);

// ===== LỊCH CHUYÊN CẦN =====
window.addEventListener('load', () => {
  const calendarGrid = document.getElementById("calendar-grid");
  const monthLabels = document.getElementById("month-labels");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const weeksPerMonth = 3;
  const daysPerWeek = 7;

  months.forEach(m => {
    const span = document.createElement("span");
    span.textContent = m;
    monthLabels.appendChild(span);
  });

  for (let m = 0; m < months.length; m++) {
    for (let w = 0; w < weeksPerMonth; w++) {
      for (let d = 0; d < daysPerWeek; d++) {
        const cell = document.createElement("div");
        cell.classList.add("day-cell");
        const activity = Math.floor(Math.random() * 11);
        let level = 0;
        if (activity > 7) level = 4;
        else if (activity > 5) level = 3;
        else if (activity > 2) level = 2;
        else if (activity > 0) level = 1;
        if (level > 0) cell.classList.add(`level-${level}`);
        calendarGrid.appendChild(cell);
      }
    }
  }

  // ===== MODAL =====
  const editButton = document.querySelector(".edit-box");
  const modal = document.getElementById("editModal");
  const closeBtn = document.querySelector(".close-btn");

  editButton.addEventListener("click", () => {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});
