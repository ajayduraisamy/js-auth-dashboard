import { post } from "./api.js";

document.getElementById("login-form").addEventListener("submit", async e => {
  e.preventDefault();

  const email = email.value;
  const password = password.value;

  const res = await post("/login", { email, password });

  if (!res.success) return alert(res.message);

  localStorage.setItem("token", res.token);
  window.location.href = "dashboard.html";
});
