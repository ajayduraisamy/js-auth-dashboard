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
console.log("Registered user:", email);

    localStorage.setItem("token", res.token);
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error(err);
    alert("Network error, please try again");
  }
});
e.target.querySelector("button").disabled = true;
