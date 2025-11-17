const lessonsData = [
  {
    id: 1,
    title: "Bài 1: Giới thiệu bản thân",
    progress: "0 / 3 bài học",
    duration: "14:20",
    subLessons: [
      { title: "Giới thiệu cơ bản", time: "05:20", done: false, videoId: "4DrfaWgGAYU", description: "Giới thiệu về bản thân bằng những mẫu câu đơn giản."},
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
      { title: "Mẫu hội thoại", time: "04:45", done: false, videoId: "tgbNymZ7vqY" },
    ],
  },
];

let player;
let watchInterval = null;
let currentLesson = null;

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
      <div class="sub-time">
        <i class="fa-solid fa-clock"></i>
        <span>${sub.time}</span>
      </div>
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

function addSubLessonClickListeners() {
  document.querySelectorAll(".sub-lesson").forEach((subDiv) => {
    subDiv.addEventListener("click", () => {
  const lessonId = parseInt(subDiv.dataset.lessonId);
  const subIdx = parseInt(subDiv.dataset.subIdx);
  const video = lessonsData.find((l) => l.id === lessonId).subLessons[subIdx];

  loadVideo(video.videoId);

  const descEl = document.querySelector(".description-block p");
  if (descEl)
      descEl.textContent = video.description || "Không có mô tả cho bài học này.";

  currentLesson = { lessonId, subIdx };
  window.currentLesson = { lessonId, subIdx };
});
  });
}

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
    updateGlobalProgress();

}

document.querySelector(".search-box input").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = lessonsData.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(keyword) ||
      lesson.subLessons.some((sub) => sub.title.toLowerCase().includes(keyword))
  );
  renderLessons(filtered);
});

document.addEventListener("DOMContentLoaded", () => {
  renderLessons(lessonsData);
  updateGlobalProgress();



  const noteBtn = document.getElementById("noteBtn");
  const noteOverlay = document.getElementById("noteOverlay");
  const notePopup = document.querySelector(".note-popup");
  const noteClose = document.querySelector(".note-close");
  const saveBtn = document.querySelector(".note-save-btn");
  const noteInput = document.querySelector(".note-textarea");
  const noteList = document.querySelector(".note-list");

  console.log("noteInput:", noteInput);

  noteBtn?.addEventListener("click", () => {
    noteOverlay.classList.remove("hidden");
    setTimeout(() => noteInput?.focus(), 200);
  });

  noteClose?.addEventListener("click", () => {
    noteOverlay.classList.add("hidden");
  });

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

document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const nextBigBtn = document.querySelector(".footer-next-big span");

  function updateFooterDisplay() {
    if (!window.currentLesson) return;
    const { lessonId, subIdx } = window.currentLesson;
    const mainIdx = lessonsData.findIndex((l) => l.id === lessonId);
    const lesson = lessonsData[mainIdx];
    const sub = lesson.subLessons[subIdx];

    const titleEl = document.querySelector(".course-title");
    if (titleEl)
      titleEl.textContent = `${lesson.title} – ${sub.title}`;
    if (lessonsData[mainIdx + 1]) {
      nextBigBtn.textContent = lessonsData[mainIdx + 1].title;
    } else {
      nextBigBtn.textContent = "🎉 Hết khóa học";
    }
  }

  nextBtn.addEventListener("click", () => {
    if (!window.currentLesson) return;
    let { lessonId, subIdx } = window.currentLesson;
    const mainIdx = lessonsData.findIndex((l) => l.id === lessonId);
    const lesson = lessonsData[mainIdx];

    if (subIdx < lesson.subLessons.length - 1) {
      subIdx++;
    } else if (mainIdx < lessonsData.length - 1) {
      lessonId = lessonsData[mainIdx + 1].id;
      subIdx = 0;
    }

    window.currentLesson = { lessonId, subIdx };
    const nextVideoId =
      lessonsData.find((l) => l.id === lessonId).subLessons[subIdx].videoId;
    loadVideo(nextVideoId);
    updateFooterDisplay();
  });

  prevBtn.addEventListener("click", () => {
    if (!window.currentLesson) return;
    let { lessonId, subIdx } = window.currentLesson;
    const mainIdx = lessonsData.findIndex((l) => l.id === lessonId);

    if (subIdx > 0) {
      subIdx--;
    } else if (mainIdx > 0) {
      lessonId = lessonsData[mainIdx - 1].id;
      const prevLesson = lessonsData[mainIdx - 1];
      subIdx = prevLesson.subLessons.length - 1;
    }

    window.currentLesson = { lessonId, subIdx };
    const prevVideoId =
      lessonsData.find((l) => l.id === lessonId).subLessons[subIdx].videoId;
    loadVideo(prevVideoId);
    updateFooterDisplay();
  });

  setTimeout(() => updateFooterDisplay(), 800);
});

document.querySelector(".footer-next-big").addEventListener("click", () => {
  if (!window.currentLesson) return;
  const { lessonId } = window.currentLesson;
  const mainIdx = lessonsData.findIndex((l) => l.id === lessonId);
  const nextLesson = lessonsData[mainIdx + 1];
  if (!nextLesson) return; 

  window.currentLesson = { lessonId: nextLesson.id, subIdx: 0 };
  const firstVideoId = nextLesson.subLessons[0].videoId;
  loadVideo(firstVideoId);

  const titleEl = document.querySelector(".course-title");
  if (titleEl) titleEl.textContent = `${nextLesson.title} – ${nextLesson.subLessons[0].title}`;
  const nextBigBtn = document.querySelector(".footer-next-big span");
  if (lessonsData[mainIdx + 2]) {
    nextBigBtn.textContent = lessonsData[mainIdx + 2].title;
  } else {
    nextBigBtn.textContent = "🎉 Hết khóa học";
  }
});

function updateGlobalProgress() {
  const totalLessons = lessonsData.length; 
  const completedLessons = lessonsData.filter(lesson =>
    lesson.subLessons.every(sub => sub.done)
  ).length;

  const el = document.querySelector(".lesson-progress");
  if (el) el.textContent = `${completedLessons} / ${totalLessons} bài học`;
}

