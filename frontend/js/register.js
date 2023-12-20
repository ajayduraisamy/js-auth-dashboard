import { post } from "./api.js";

document.getElementById("register-form").addEventListener("submit", async e => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errBox = document.getElementById("reg-error");

  errBox.innerText = "";

  if (!email || !password) {
    errBox.innerText = "All fields required";
    return;
  }

  try {
    const res = await post("/register", { email, password });

    if (!res.success) {
      errBox.innerText = res.message;
      return;
    }

    window.location.href = "login.html";
  } catch {
    errBox.innerText = "Network error";
  }
});
