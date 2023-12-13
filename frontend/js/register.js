import { post } from "./api.js";

document.getElementById("register-form").addEventListener("submit", async e => {
  e.preventDefault();

  const email = email.value;
  const password = password.value;

  const res = await post("/register", { email, password });

  alert(res.message);

  if (res.success) window.location.href = "login.html";
});
