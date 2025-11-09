// ========================= NOTE POPUP LOGIC =========================
let notes = [];
let selectedNoteIndex = null;

// Khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  const noteBtn = document.getElementById("noteBtn");
  const overlay = document.getElementById("noteOverlay");
  const closeBtn = document.querySelector(".note-close");
  const saveBtn = document.querySelector(".note-save-btn");
  const deleteBtn = document.querySelector(".note-delete-btn");
  const textarea = document.querySelector(".note-textarea");
  const noteList = document.querySelector(".note-list");

  if (!textarea) {
    console.warn("⏳ Đang chờ textarea render...");
    setTimeout(() => {
      textarea = document.querySelector(".note-textarea");
      console.log("✅ textarea đã load lại:", textarea);
    }, 500);
  }

  // ================= MỞ POPUP =================
  noteBtn?.addEventListener("click", () => {
    overlay.classList.remove("hidden");
    renderNoteList();

    // focus an toàn
    if (textarea) setTimeout(() => textarea.focus(), 200);
  });

  // ================= ĐÓNG POPUP =================
  closeBtn?.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });

  // ================= LƯU GHI CHÚ =================
  saveBtn?.addEventListener("click", () => {
  const text = textarea.value.trim();
  if (!text) {
    alert("❗ Vui lòng nhập nội dung ghi chú");
    return;
  }

  // ✅ Lấy player an toàn (nếu chưa có thì = null)
  const ytPlayer = window.player || null;
  let currentTime = 0;

  // ✅ Kiểm tra kỹ để không gọi sai
  if (ytPlayer && typeof ytPlayer.getCurrentTime === "function") {
    try {
      currentTime = ytPlayer.getCurrentTime().toFixed(1);
    } catch (err) {
      console.warn("⚠️ Không thể lấy thời gian video:", err);
      currentTime = 0;
    }
  }

  // ✅ Lấy video hiện tại an toàn
  let currentVideo = null;

if (window.currentLesson && typeof window.currentLesson.lessonId !== "undefined") {
  const lessonObj = lessonsData.find(l => l.id === window.currentLesson.lessonId);
  if (lessonObj) currentVideo = lessonObj.subLessons[window.currentLesson.subIdx];
}

  const note = {
    id: Date.now(),
    videoTitle: currentVideo ? currentVideo.title : "Không xác định",
    videoId: currentVideo ? currentVideo.videoId : "unknown",
    time: currentTime,
    content: text,
    createdAt: new Date().toLocaleString(),
  };

  // ✅ Ghi đè hoặc thêm mới
  if (selectedNoteIndex !== null) {
    notes[selectedNoteIndex] = note;
    selectedNoteIndex = null;
  } else {
    notes.push(note);
  }

  textarea.value = "";
  renderNoteList();
  saveToTxt();
});


  // ================= XÓA GHI CHÚ =================
  deleteBtn?.addEventListener("click", () => {
    if (selectedNoteIndex === null) return alert("Chưa chọn ghi chú nào!");
    if (!confirm("🗑️ Xóa ghi chú này?")) return;
    notes.splice(selectedNoteIndex, 1);
    selectedNoteIndex = null;
    textarea.value = "";
    renderNoteList();
    saveToTxt();
  });

  // ================= RENDER DANH SÁCH =================
  function renderNoteList() {
    noteList.innerHTML = "";
    if (notes.length === 0) {
      noteList.innerHTML = "<li>📄 Chưa có ghi chú</li>";
      return;
    }

    notes.forEach((note, i) => {
      const li = document.createElement("li");
      li.className = "note-item";
      li.innerHTML = `
        <div>
          <strong>${note.videoTitle}</strong>
          <br><small>${note.content.substring(0, 40)}...</small>
        </div>
        <span class="note-time">${note.createdAt.split(",")[0]}</span>
      `;

      li.addEventListener("click", () => {
        selectedNoteIndex = i;
        textarea.value = note.content;
        renderNoteList();
      });

      if (selectedNoteIndex === i) li.style.background = "#fff5cc";
      noteList.appendChild(li);
    });
  }

  // ================= GHI RA FILE TXT =================
  function saveToTxt() {
    const lines = notes.map(
      (n) =>
        `[${n.createdAt}]\nVideo: ${n.videoTitle} (${n.videoId}) @ ${n.time}s\nNote: ${n.content}\n---\n`
    );
    const content = lines.join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "notes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }
});
