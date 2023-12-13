import { post } from "./api.js";

document.getElementById("register-form").addEventListener("submit", async (e) => {
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
    const res = await post("/register", { email, password });

    alert(res.message || "Registration failed");

    if (res.success) {
      window.location.href = "login.html";
    }
  } catch (err) {
    console.error(err);
    alert("Network error, please try again");
  }
});
