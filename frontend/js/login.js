import { post } from "./api.js";

document.getElementById("login-form").addEventListener("submit", async e => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errBox = document.getElementById("login-error");

  errBox.innerText = "";

  if (!email || !password) {
    errBox.innerText = "All fields required";
    return;
  }

  try {
    const res = await post("/login", { email, password });

    if (!res.success) {
      errBox.innerText = res.message;
      return;
    }

    localStorage.setItem("token", res.token);
    window.location.href = "dashboard.html";
  } catch {
    errBox.innerText = "Network error";
  }
});
