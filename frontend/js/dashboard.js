import { post } from "./api.js";

const token = localStorage.getItem("token");

if (!token) window.location.href = "login.html";

fetch("http://localhost:5000/api/auth/me", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => {
  document.getElementById("user-email").innerText = data.user.email;
});
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
const email = document.getElementById("user-email");
email.innerText = "Loading user...";
const loginTime = document.createElement("p");
loginTime.innerText = "Logged in at: " + new Date().toLocaleTimeString();
document.body.appendChild(loginTime);

if (!localStorage.getItem("token")) {
  alert("Session expired");
  window.location.href = "login.html";
}

window.addEventListener("storage", () => {
  if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
  }
});
document.getElementById("user-email").innerText = "Welcome ✔";
export async function post(endpoint, data, token) {
  try {
    const res = await fetch(`${API}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : ""
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch {
    console.log("Retrying API call...");
    return await fetch(`${API}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : ""
      },
      body: JSON.stringify(data)
    }).then(r => r.json());
  }
}
if (!localStorage.getItem("token")) {
  alert("Session expired");
  window.location.href = "login.html";
}
async function loadProfile() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    if (data.success) {
      document.getElementById("user-email").innerText = data.user.email;
    } else {
      alert("Session invalid");
      window.location.href = "login.html";
    }
  } catch (e) {
    alert("Failed to load profile");
  }
}

loadProfile();
