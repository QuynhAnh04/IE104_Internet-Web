function computeSkillProgress() {
  const skills = {
    "Ngữ pháp": 0,
    "Từ vựng": 0,
    "Đọc hiểu": 0,
    "Nghe hiểu": 0,
    "Kanji": 0
  };

  HISTORY.forEach(ev => {
    if (skills[ev.skill] !== undefined) {
      if (ev.skill === "Từ vựng" || ev.skill === "Kanji") {
        skills[ev.skill] += ev.amount;
      } else {
        skills[ev.skill] += 1;
      }
    }
  });

  return skills;
}

function computeOverallProgress(skillData) {
  const max = {
    "Ngữ pháp": 30,
    "Từ vựng": 2000,
    "Đọc hiểu": 20,
    "Nghe hiểu": 20,
    "Kanji": 500
  };

  let sum = 0, count = 0;
  for (let s in skillData) {
    const p = Math.min(100, skillData[s] / max[s] * 100);
    sum += p;
    count++;
  }
  return Math.floor(sum / count);
}

function initProgressChart() {
  const skillData = computeSkillProgress();
  const max = {
    "Ngữ pháp": 30,
    "Từ vựng": 2000,
    "Đọc hiểu": 20,
    "Nghe hiểu": 20,
    "Kanji": 500
  };

  const skills = Object.keys(skillData);
  const progressData = skills.map(s =>
    Math.min(100, Math.floor((skillData[s] / max[s]) * 100))
  );
  const totalProgress = computeOverallProgress(skillData);

  const chartEl = document.getElementById("progressChart");
  const ctx = chartEl.getContext("2d");

  /* ==== Plugin chữ ở giữa ==== */
  const centerText = {
    id: "centerText",
    beforeDraw(chart) {
      const { ctx, chartArea } = chart;
      if (!chartArea) return;

      const x = (chartArea.left + chartArea.right) / 2;
      const y = (chartArea.top + chartArea.bottom) / 2;

      ctx.save();
      ctx.font = "600 26px Inter";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#2b3e50";
      ctx.fillText(chart._level === 1 ? `${chart._progress}%` : "Chi tiết", x, y);
      ctx.restore();
    }
  };

  /* ==== Plugin bo tròn ==== */
  const roundedGap = {
    id: "roundedGap",
    afterDatasetDraw(chart) {
      if (chart._level !== 1) return;

      const arc = chart.getDatasetMeta(0).data[0];
      if (!arc) return;

      const { ctx } = chart;
      const { x, y, innerRadius, outerRadius } = arc.getProps(
        ["x", "y", "innerRadius", "outerRadius"],
        true
      );

      const mid = (innerRadius + outerRadius) / 2;
      const thick = outerRadius - innerRadius;
      const start = -Math.PI / 2;
      const end = start + 2 * Math.PI * (chart._progress / 100);

      ctx.save();
      ctx.translate(x, y);
      ctx.lineWidth = thick;
      ctx.lineCap = "round";

      // nền xám
      ctx.strokeStyle = "#e0e0e0";
      ctx.beginPath();
      ctx.arc(0, 0, mid, 0, Math.PI * 2);
      ctx.stroke();

      // tiến độ xanh
      ctx.strokeStyle = "#1e90ff";
      ctx.beginPath();
      ctx.arc(0, 0, mid, start, end);
      ctx.stroke();

      ctx.restore();
    }
  };

  /* ==== Tạo chart ==== */
  const chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Đã học", "Còn lại"],
      datasets: [{
        data: [totalProgress, 100 - totalProgress],
        backgroundColor: ["#1e90ff", "#e0e0e0"],   // ⭐ KHÔNG ĐỂ TRANSPARENT
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      //aspectRatio: 1,
      cutout: "60%",                     // ⭐ làm chart lớn hơn, cân đối 2 mode
      layout: {
    padding: {
      top: 10,
      bottom: 10                  // ⭐ Tăng khoảng cách giữa chart và legend
    }
  }, // ⭐ tránh legend chèn lên biểu đồ
      animation: {
        duration: 600,
        easing: "easeInOutQuart"
      },
      plugins: {
  legend: {
    display: true,
    position: "bottom",
    fullSize: false,           // Không chiếm toàn bộ chiều ngang
    maxHeight: 40,             // ⭐ Giới hạn chiều cao legend
    labels: {
      usePointStyle: true,
      boxWidth: 10,
      boxHeight: 8,

      padding: 10,              // ⭐ Giảm padding để legend cực gọn
      font: { family: "Inter", size: 13, weight: "500" },
      color: "#333"
    }
  },

        tooltip: {
          enabled: true,
          bodyFont: { family: "Inter", size: 14 },
          titleFont: { family: "Inter", size: 14 },
          yAlign: "bottom",
          displayColors: false
        }
      }
    },
    plugins: [centerText, roundedGap]
  });

  chart._level = 1;
  chart._progress = totalProgress;

  /* ==== Click đổi chế độ ==== */
  chartEl.onclick = () => {
    if (chart._level === 1) {
      chart._level = 2;
      chart.data.labels = skills;
      chart.data.datasets[0].data = progressData;
      chart.data.datasets[0].backgroundColor = [
        "#4C8DF5",
        "#59C97B",
        "#FFB85F",
        "#FF7373",
        "#A98DF0"
      ];
    } else {
      chart._level = 1;
      chart.data.labels = ["Đã học", "Còn lại"];
      chart.data.datasets[0].data = [totalProgress, 100 - totalProgress];
      chart.data.datasets[0].backgroundColor = ["#1e90ff", "#e0e0e0"];
    }

    chart.update();
    
  };
}
