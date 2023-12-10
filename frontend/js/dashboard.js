const token = localStorage.getItem("token");
console.log("Session token:", localStorage.getItem("token"));

if (!token) {
  window.location.href = "login.html";
}
