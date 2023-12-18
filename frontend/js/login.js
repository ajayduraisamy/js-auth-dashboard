import { post } from "./api.js";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // ✅ Basic validation
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }
function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
if (!validEmail(email)) {
  alert("Enter a valid email address");
  return;
}
    const history = JSON.parse(localStorage.getItem("loginHistory") || "[]");

history.push({
  email,
  time: new Date().toISOString()
});
document.getElementById("login-spinner").classList.add("d-none");

localStorage.setItem("loginHistory", JSON.stringify(history));


  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {
    const res = await post("/login", { email, password });

    if (!res.success) {
      alert(res.message || "Login failed");
      return;
    }


    localStorage.setItem("token", res.token);
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error(err);
    alert("Network error, please try again");
  }
});
e.target.querySelector("button").disabled = true;
document.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    document.querySelector("form").requestSubmit();
  }
});
