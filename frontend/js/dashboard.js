import { get } from "./api.js";

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

async function loadProfile() {
  const info = document.getElementById("user-email");

  try {
    const data = await get("/me", token);

    if (!data.success) {
      localStorage.clear();
      window.location.href = "login.html";
      return;
    }

    info.innerText = data.user.email;
  } catch {
    info.innerText = "Profile load failed";
  }
}

window.logout = () => {
  localStorage.clear();
  window.location.href = "login.html";
};

loadProfile();
