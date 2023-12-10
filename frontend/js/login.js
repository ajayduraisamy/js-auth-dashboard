import { loginUser } from "./api.js";

const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const result = await loginUser(email, password);

  if (result.message === "Login successful") {
    localStorage.setItem("token", "demo-token");
    window.location.href = "dashboard.html";
  } else {
    alert(result.message);
  }
});
