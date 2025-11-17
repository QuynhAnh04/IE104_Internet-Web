function timeAgo(dateStr) {
  const now = new Date();
  const t = new Date(dateStr);
  const diff = Math.floor((now - t) / 1000);

  if (diff < 60) return "Vừa xong";
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} ngày trước`;

  return t.toLocaleDateString("vi-VN");
}

function makeTitle(ev) {
  switch (ev.type) {
    case "grammar": return `Ngữ pháp – ${ev.lesson}`;
    case "vocab": return `Học ${ev.amount} từ vựng – ${ev.lesson}`;
    case "kanji": return `Test Kanji – ${ev.lesson}`;
    case "reading": return `Đọc hiểu – ${ev.lesson}`;
    case "listening": return `Nghe hiểu – ${ev.lesson}`;
  }
  return "Hoạt động học tập";
}

function getActivityLevel(minutes) {
  if (minutes >= 30) return 4;
  if (minutes >= 20) return 3;
  if (minutes >= 10) return 2;
  if (minutes >= 5) return 1;
  return 0;
}
