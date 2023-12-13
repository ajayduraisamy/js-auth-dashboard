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
