

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

// ===== BIỂU ĐỒ TRÒN TIẾN TRÌNH HỌC (2 cấp độ) =====
const ctx = document.getElementById("progressChart").getContext("2d");

// Dữ liệu tổng thể
let totalProgress = 77;
let currentLevel = 1;

// Dữ liệu chi tiết
const skills = ["Ngữ pháp", "Từ vựng", "Đọc hiểu", "Nghe hiểu", "Kanji"];
const progressData = [80, 65, 50, 40, 70];
const details = {
  "Ngữ pháp": ["Đã học 24/30 bài", "Hoàn thành 80%", "Cần ôn lại thể て"],
  "Từ vựng": ["Đã học 1300/2000 từ", "Hoàn thành 65%", "Tốt ở chủ đề Gia đình"],
  "Đọc hiểu": ["10/20 bài", "Hoàn thành 50%", "Đọc nhanh, cần luyện chi tiết"],
  "Nghe hiểu": ["8/20 bài", "Hoàn thành 40%", "Tăng luyện hội thoại dài"],
  "Kanji": ["350/500 chữ", "Hoàn thành 70%", "Nhớ tốt 5 bộ thủ chính"]
};

// === Plugin: Bo tròn và khe hở giữa 2 phần ===
const roundedGap = {
  id: "roundedGap",
  afterDraw(chart) {
    if (currentLevel !== 1) return; // chỉ vẽ cho cấp tổng thể
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(0);
    const arc = meta.data[0];
    if (!arc) return;

    const { x, y } = arc.getProps(["x", "y"], true);
    const radius = arc.outerRadius;
    const thickness = radius - arc.innerRadius;
    const midRadius = arc.innerRadius + thickness / 2;

    const gap = 0.06;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + 2 * Math.PI * (totalProgress / 100);

    ctx.save();
    ctx.translate(x, y);
    ctx.lineWidth = thickness;
    ctx.lineCap = "round";

    // 🎨 1️⃣ Vẽ phần chưa học trước (xám khuyết)
    ctx.strokeStyle = "#e0e0e0";
    ctx.beginPath();
    ctx.arc(0, 0, midRadius, endAngle + gap, startAngle - gap + Math.PI * 2);
    ctx.stroke();

    // 🎨 2️⃣ Vẽ phần đã học (xanh bo tròn)
    ctx.strokeStyle = "#1e90ff";
    ctx.beginPath();
    ctx.arc(0, 0, midRadius, startAngle + gap, endAngle - gap);
    ctx.stroke();

    ctx.restore();
  }
};

// === Plugin: Text giữa vòng ===
const centerText = {
  id: "centerText",
  afterDraw(chart) {
    const { ctx, chartArea: { width, height } } = chart;
    ctx.save();
    ctx.font = "bold 28px Inter";
    ctx.fillStyle = "#2b3e50";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      currentLevel === 1 ? `${totalProgress}%` : "Chi tiết",
      width / 2,
      height / 2
    );
  }
};

// === Biểu đồ ban đầu (tổng thể) ===
let progressChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Đã học được", "Chưa học"],
    datasets: [{
      data: [totalProgress, 100 - totalProgress],
      backgroundColor: ["#1e90ff", "#e0e0e0"],
      borderWidth: 0
    }]
  },
  options: {
    cutout: "75%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          font: { size: 13 },
          padding: 15
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        cornerRadius: 8,
        padding: 10,
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (tooltipItem) =>
            `${tooltipItem.parsed}% đã học`
        }
      }
    },
    onClick: () => {
      if (currentLevel === 1) showDetailedChart();
      else showOverviewChart();
    }
  },
  plugins: [roundedGap, centerText]
});

// === Cấp độ 2: Biểu đồ chi tiết ===
function showDetailedChart() {
  currentLevel = 2;

  progressChart.data = {
    labels: skills,
    datasets: [{
      data: progressData,
      backgroundColor: ["#1e90ff", "#40c463", "#ffb347", "#ff6961", "#9370db"],
      borderWidth: 0,
      hoverOffset: 10
    }]
  };

  progressChart.options.plugins.legend = {
    display: true,
    position: "bottom",
    labels: {
      usePointStyle: true,
      boxWidth: 10,
      font: { size: 13 },
      padding: 15
    }
  };

  progressChart.options.plugins.tooltip = {
  enabled: true,
  usePointStyle: false,  // ❌ tắt ô vuông màu
  backgroundColor: "rgba(0,0,0,0.85)",
  titleFont: { size: 15, weight: "bold" },
  bodyFont: { size: 13 },
  cornerRadius: 8,
  padding: 10,
  displayColors: false,  // ❌ không hiển thị ô vuông màu trước label
  callbacks: {
    title: (tooltipItems) => `Kỹ năng: ${tooltipItems[0].label}`,
    label: (tooltipItem) => {
      const val = tooltipItem.parsed;
      return `Đã học được ${val}%`;
    },
    afterLabel: (tooltipItem) => {
      const skill = tooltipItem.label;
      const extra = details[skill] ? details[skill][0] : "";
      return `\n${extra}`; // ✅ thêm dòng mới rõ ràng
    }
  }
};

  progressChart.options.animation = { duration: 700, easing: "easeOutQuart" };
  progressChart.update();
}

// === Quay về tổng thể ===
function showOverviewChart() {
  currentLevel = 1;

  progressChart.data = {
    labels: ["Đã học được", "Chưa học"],
    datasets: [{
      data: [totalProgress, 100 - totalProgress],
      backgroundColor: ["#1e90ff", "#e0e0e0"],
      borderWidth: 0
    }]
  };

  progressChart.options.plugins.legend.display = true;
  progressChart.options.plugins.tooltip.enabled = true;

  progressChart.options.animation = { duration: 700, easing: "easeOutQuart" };
  progressChart.update();
}




// ====== XỬ LÝ SỬA THÔNG TIN CÁ NHÂN ======
window.addEventListener("load", () => {
  const editButton = document.querySelector(".edit-box");
  const modal = document.getElementById("editModal");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("editForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const avatarInput = document.getElementById("avatar");

  const profileName = document.querySelector(".profile-name");
  const profileEmail = document.querySelector(".profile-email");
  const profileAvatar = document.querySelector(".profile-avatar");
  const navbarAvatar = document.querySelector(".avatar");

  // 🧠 Load dữ liệu từ localStorage nếu có
  const savedName = localStorage.getItem("userName");
  const savedEmail = localStorage.getItem("userEmail");
  const savedAvatar = localStorage.getItem("userAvatar");

  if (savedName) profileName.textContent = savedName;
  if (savedEmail) profileEmail.textContent = savedEmail;
  if (savedAvatar) {
    profileAvatar.src = savedAvatar;
    navbarAvatar.src = savedAvatar;
  }

  // 🪟 Mở modal
  editButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    emailInput.value = profileEmail.textContent;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  // ❌ Đóng modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // 🖼️ Xem trước ảnh đại diện
  avatarInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        profileAvatar.src = event.target.result;
        navbarAvatar.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // 💾 Khi bấm “Lưu thay đổi”
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newName = nameInput.value.trim();
    const newEmail = emailInput.value.trim();

    profileName.textContent = newName;
    profileEmail.textContent = newEmail;

    // Nếu người dùng đổi ảnh, đã cập nhật ở preview rồi

    // ✅ Lưu vào localStorage
    localStorage.setItem("userName", newName);
    localStorage.setItem("userEmail", newEmail);
    localStorage.setItem("userAvatar", profileAvatar.src);

    modal.style.display = "none";
    document.body.style.overflow = "auto";

    alert("Đã lưu thay đổi thành công!");
  });
});


// ====== HOẠT ĐỘNG GẦN ĐÂY ======
window.addEventListener("load", () => {
  // Danh sách các hoạt động mẫu
  const activities = [
    {
      icon: "📘",
      title: "Hoàn thành bài Ngữ pháp N4 – て形",
      time: "2 giờ trước",
      type: "nguphap"
    },
    {
      icon: "🗣️",
      title: "Luyện nghe: Bài hội thoại số 5",
      time: "5 giờ trước",
      type: "nghe"
    },
    {
      icon: "📝",
      title: "Làm bài kiểm tra Kanji – Tuần 3",
      time: "Hôm qua",
      type: "kanji"
    },
    {
      icon: "🎯",
      title: "Đạt mốc 2000 từ vựng đã học",
      time: "2 ngày trước",
      type: "tuvung"
    },
    {
      icon: "🏆",
      title: "Nhận huy hiệu “Chăm chỉ tháng 10”",
      time: "3 ngày trước",
      type: "thanh_tich"
    },
    {
      icon: "📖",
      title: "Hoàn thành bài Đọc hiểu N4 – Chủ đề Du lịch",
      time: "4 ngày trước",
      type: "doc"
    },
    {
      icon: "🏆",
      title: "Nhận huy hiệu “Chăm chỉ tháng 10”",
      time: "3 ngày trước",
      type: "thanh_tich"
    },
    {
      icon: "📖",
      title: "Hoàn thành bài Đọc hiểu N4 – Chủ đề Du lịch",
      time: "4 ngày trước",
      type: "doc"
    },
    {
      icon: "🏆",
      title: "Nhận huy hiệu “Chăm chỉ tháng 10”",
      time: "3 ngày trước",
      type: "thanh_tich"
    },
    {
      icon: "📖",
      title: "Hoàn thành bài Đọc hiểu N4 – Chủ đề Du lịch",
      time: "4 ngày trước",
      type: "doc"
    }
  ];

  const activityList = document.getElementById("activityList");

  // Hàm render danh sách hoạt động
  function renderActivities(list) {
    activityList.innerHTML = ""; // Xoá danh sách cũ
    list.forEach((a) => {
      const li = document.createElement("li");
      li.className = "activity-item";

      li.innerHTML = `
        <div class="activity-icon">${a.icon}</div>
        <div class="activity-content">
          <div class="activity-title">${a.title}</div>
          <div class="activity-time">${a.time}</div>
        </div>
      `;
      activityList.appendChild(li);
    });
  }

  // Gọi hàm để hiển thị ban đầu
  renderActivities(activities);

  // (Tuỳ chọn) Nếu muốn tự động thêm hoạt động mới sau vài giây
  // setTimeout(() => {
  //   const newAct = {
  //     icon: "💬",
  //     title: "Thảo luận với giáo viên về Ngữ pháp N3",
  //     time: "Vừa xong",
  //     type: "nguphap"
  //   };
  //   activities.unshift(newAct); // thêm lên đầu
  //   renderActivities(activities);
  // }, 5000);
});
