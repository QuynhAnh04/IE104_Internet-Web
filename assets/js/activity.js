function renderActivities() {
  const activityList = document.getElementById("activityList");

  const sorted = [...HISTORY].sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  activityList.innerHTML = "";

  sorted.forEach(ev => {
    const li = document.createElement("li");
    li.className = "activity-item";

    const icon = ICONS[ev.type] || ICONS.default;
    const title = makeTitle(ev);
    const ago = timeAgo(ev.time);

    li.innerHTML = `
      <div class="activity-icon">${icon}</div>
      <div class="activity-content">
        <div class="activity-title">${title}</div>
        <div class="activity-time">${ago}</div>
      </div>
    `;

    activityList.appendChild(li);
  });
}
