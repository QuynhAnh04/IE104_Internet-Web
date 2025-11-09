// ========================= DỮ LIỆU =========================
const lessonsData = [
  {
    id: 1,
    title: "Bài 1: Giới thiệu bản thân",
    progress: "1 / 3 bài học",
    duration: "14:20",
    subLessons: [
      { title: "Giới thiệu cơ bản", time: "05:20", done: false, videoId: "4DrfaWgGAYU" },
      { title: "Mẫu câu chào hỏi", time: "04:30", done: false, videoId: "lTRiuFIWV54" },
      { title: "Tự giới thiệu ngắn", time: "04:30", done: false, videoId: "V-_O7nl0Ii0" },
    ],
  },
  {
    id: 2,
    title: "Bài 2: Gia đình và bạn bè",
    progress: "2 / 4 bài học",
    duration: "18:05",
    subLessons: [
      { title: "Từ vựng gia đình", time: "04:00", done: true, videoId: "YVv9gKJrHlc" },
      { title: "Giới thiệu thành viên", time: "04:20", done: true, videoId: "GxldQ9eX2wo" },
      { title: "Nói về bạn bè", time: "05:00", done: false, videoId: "tgbNymZ7vqY" },
      { title: "Mẫu hội thoại", time: "04:45", done: false, videoId: "eVTXPUF4Oz4" },
    ],
  },
];

let player;
let watchInterval = null;
let currentLesson = null;

// ========================= RENDER DANH SÁCH =========================
function renderLessons(list) {
  const container = document.querySelector(".lesson-list");
  container.innerHTML = "";

  list.forEach((lesson) => {
    const item = document.createElement("div");
    item.className = "lesson-item";
    item.dataset.lessonId = lesson.id;

    const top = document.createElement("div");
    top.className = "lesson-item-top";
    top.innerHTML = `<h4>${lesson.title}</h4><button class="arrow-btn">▼</button>`;

    const bottom = document.createElement("div");
    bottom.className = "lesson-item-bottom";
    bottom.innerHTML = `<span>${lesson.progress}</span> | <span>${lesson.duration}</span>`;

    const subContainer = document.createElement("div");
    subContainer.className = "sub-lessons";

    lesson.subLessons.forEach((sub, idx) => {
      const subDiv = document.createElement("div");
      subDiv.className = "sub-lesson";
      subDiv.dataset.lessonId = lesson.id;
      subDiv.dataset.subIdx = idx;
      subDiv.innerHTML = `
        <div class="sub-left">
          <div class="sub-title">${sub.title}</div>
          <div class="sub-time"><img src="./assets/img/time.png" /> <span>${sub.time}</span></div>
        </div>
        <div class="sub-right">${sub.done ? "✔" : ""}</div>
      `;
      subContainer.appendChild(subDiv);
    });

    item.appendChild(top);
    item.appendChild(bottom);
    item.appendChild(subContainer);
    container.appendChild(item);
  });

  addToggleListeners();
  addSubLessonClickListeners();
}

// ========================= TOGGLE DANH SÁCH CON =========================
function addToggleListeners() {
  document.querySelectorAll(".lesson-item-top").forEach((top) => {
    top.addEventListener("click", () => {
      const parent = top.parentElement;
      const sub = parent.querySelector(".sub-lessons");
      const arrow = top.querySelector(".arrow-btn");

      const open = sub.classList.contains("open");
      document.querySelectorAll(".sub-lessons").forEach((s) => s.classList.remove("open"));
      document.querySelectorAll(".arrow-btn").forEach((a) => a.classList.remove("rotate"));

      if (!open) {
        sub.classList.add("open");
        arrow.classList.add("rotate");
      }
    });
  });
}

// ========================= CLICK BÀI HỌC CON =========================
function addSubLessonClickListeners() {
  document.querySelectorAll(".sub-lesson").forEach((subDiv) => {
    subDiv.addEventListener("click", () => {
      const lessonId = parseInt(subDiv.dataset.lessonId);
      const subIdx = parseInt(subDiv.dataset.subIdx);
      const video = lessonsData.find((l) => l.id === lessonId).subLessons[subIdx];

      loadVideo(video.videoId);
      currentLesson = { lessonId, subIdx };
      window.currentLesson = { lessonId, subIdx }; // ✅ thêm dòng này

    });
  });
}

// ========================= YOUTUBE API =========================
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "500",
    width: "100%",
    videoId: lessonsData[0].subLessons[0].videoId,
    playerVars: { rel: 0, controls: 1 },
    events: { onStateChange: onPlayerStateChange },
  });
}

function loadVideo(videoId) {
  if (player && typeof player.loadVideoById === "function") {
    player.loadVideoById(videoId);
  } else {
    setTimeout(() => loadVideo(videoId), 500);
  }
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    clearInterval(watchInterval);
    watchInterval = setInterval(checkProgress, 2000);
  } else {
    clearInterval(watchInterval);
  }
}

function checkProgress() {
  if (!player || !currentLesson) return;
  const current = player.getCurrentTime();
  const total = player.getDuration();
  if (total > 0 && current / total >= 0.8) {
    markLessonDone(currentLesson.lessonId, currentLesson.subIdx);
    clearInterval(watchInterval);
  }
}

// ========================= CẬP NHẬT TIẾN ĐỘ =========================
function markLessonDone(lessonId, subIdx) {
  const lesson = lessonsData.find((l) => l.id === lessonId);
  const sub = lesson.subLessons[subIdx];
  if (sub.done) return;

  sub.done = true;
  const doneCount = lesson.subLessons.filter((s) => s.done).length;
  lesson.progress = `${doneCount} / ${lesson.subLessons.length} bài học`;

  const tickDiv = document.querySelector(
    `.sub-lesson[data-lesson-id="${lessonId}"][data-sub-idx="${subIdx}"] .sub-right`
  );
  if (tickDiv) tickDiv.textContent = "✔";

  const bottom = document.querySelector(
    `.lesson-item[data-lesson-id="${lessonId}"] .lesson-item-bottom span:first-child`
  );
  if (bottom) bottom.textContent = lesson.progress;
}

// ========================= TÌM KIẾM =========================
document.querySelector(".search-box input").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = lessonsData.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(keyword) ||
      lesson.subLessons.some((sub) => sub.title.toLowerCase().includes(keyword))
  );
  renderLessons(filtered);
});

// ========================= POPUP GHI CHÚ =========================
document.addEventListener("DOMContentLoaded", () => {
  renderLessons(lessonsData);

  const noteBtn = document.getElementById("noteBtn");
  const noteOverlay = document.getElementById("noteOverlay");
  const notePopup = document.querySelector(".note-popup");
  const noteClose = document.querySelector(".note-close");
  const saveBtn = document.querySelector(".note-save-btn");
  const noteInput = document.querySelector(".note-textarea");
  const noteList = document.querySelector(".note-list");

  console.log("✅ noteInput:", noteInput);

  // Mở popup
  noteBtn?.addEventListener("click", () => {
    noteOverlay.classList.remove("hidden");
    setTimeout(() => noteInput?.focus(), 200);
  });

  // Đóng popup
  noteClose?.addEventListener("click", () => {
    noteOverlay.classList.add("hidden");
  });

  // Lưu ghi chú
//   saveBtn?.addEventListener("click", (e) => {
//     e.preventDefault();
//     if (!noteInput) return alert("Không tìm thấy ô ghi chú!");
//     const text = noteInput.value?.trim();
//     console.log("📘 Text nhập:", text);

//     if (!text || text.length === 0) return alert("❗Vui lòng nhập nội dung ghi chú");

//     const time =
//       player && typeof player.getCurrentTime === "function"
//         ? player.getCurrentTime().toFixed(1)
//         : 0;
//     const vid =
//       currentLesson &&
//       lessonsData[currentLesson.lessonId - 1]?.subLessons[currentLesson.subIdx]?.videoId;

//     if (typeof saveNoteDemo === "function") saveNoteDemo(text, time, vid);
//     noteInput.value = "";
//   });

  // Kéo popup
  let isDragging = false,
    offsetX = 0,
    offsetY = 0;
  notePopup?.addEventListener("mousedown", (e) => {
    if (!e.target.closest(".note-header")) return;
    isDragging = true;
    offsetX = e.clientX - notePopup.getBoundingClientRect().left;
    offsetY = e.clientY - notePopup.getBoundingClientRect().top;
    notePopup.style.transition = "none";
    notePopup.style.position = "fixed";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    notePopup.style.left = `${e.clientX - offsetX}px`;
    notePopup.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    notePopup.style.transition = "all 0.2s";
  });
});

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
