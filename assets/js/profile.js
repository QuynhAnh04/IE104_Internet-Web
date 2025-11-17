function initProfileEditor() {
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
  const navbarAvatar = document.getElementById("userIcon");

  editButton.onclick = () => {
    nameInput.value = profileName.textContent;
    emailInput.value = profileEmail.textContent;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  closeBtn.onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };

  avatarInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = evt => {
        profileAvatar.src = evt.target.result;
        navbarAvatar.src = evt.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  form.onsubmit = e => {
    e.preventDefault();
    profileName.textContent = nameInput.value.trim();
    profileEmail.textContent = emailInput.value.trim();
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  };
}

window.addEventListener("load", () => {
  renderActivities();
  initCalendar();          
  initProgressChart();
  initProfileEditor();
});
