const app = document.getElementById("app");

let users = JSON.parse(localStorage.getItem("users")) || [];
let session = localStorage.getItem("session");
let sessionTimer = null;

/* ================= UI ================= */

function loginUI(){
 app.innerHTML = `
    <h4 class="text-center mb-3">Login</h4>
    <input id="lu" class="form-control mb-2" placeholder="Username">
    <input id="lp" type="password" class="form-control mb-3" placeholder="Password">

    <button class="btn btn-primary w-100" onclick="login()">Login</button>

    <p class="text-center mt-3">
     New user?
     <span class="text-primary" style="cursor:pointer" onclick="registerUI()"> Register</span>
    </p>
 `;
}

function registerUI(){
 app.innerHTML = `
     <h4 class="text-center mb-3">Register</h4>

     <input id="ru" class="form-control mb-2" placeholder="Username">
     <input id="rp" type="password" class="form-control mb-3" placeholder="Password">

     <button class="btn btn-success w-100" onclick="register()">Register</button>

     <p class="text-center mt-3">
      Have account?
      <span class="text-primary" style="cursor:pointer" onclick="loginUI()"> Login</span>
     </p>
 `;
}

function dashboardUI(user){
 app.innerHTML = `
    <h4 class="text-center">Dashboard</h4>
    <p class="text-center">Welcome <b>${user}</b></p>

    <p class="text-center text-muted">
      Session expires automatically after inactivity
    </p>

    <button class="btn btn-danger w-100 mt-3" onclick="logout()">
      Logout
    </button>
 `;
}


/* ================= LOGIC ================= */

function hash(p){
 return btoa(p);   // base64 hash simulation
}

// Register
function register(){
 const u = ru.value.trim();
 const p = rp.value.trim();

 if(u.length < 3) return alert("Username must be 3+ characters");
 if(p.length < 6) return alert("Password must be 6+ characters");

 if(users.some(x => x.username === u))
    return alert("User already exists");

 users.push({
    username: u,
    password: hash(p)
 });

 localStorage.setItem("users", JSON.stringify(users));

 alert("Registered successfully");
 loginUI();
}


// Login
function login(){
 const u = lu.value.trim();
 const p = lp.value.trim();

 const found = users.find(
     x => x.username === u &&
     x.password === hash(p)
 );

 if(!found)
    return alert("Invalid login");

 localStorage.setItem("session", u);

 startSessionTimer();
 dashboardUI(u);
}


// Logout
function logout(){
 localStorage.removeItem("session");

 if(sessionTimer)
    clearTimeout(sessionTimer);

 location.reload();
}


/* ================= SECURITY ================= */

// Auto logout after 5 minutes
function startSessionTimer(){

 if(sessionTimer)
    clearTimeout(sessionTimer);

 sessionTimer = setTimeout(() => {
    alert("Session expired — auto logout");
    logout();
 }, 1000 * 60 * 5);   // 5 minutes
}

// Route Guard
function guard(){

 const user = localStorage.getItem("session");

 if(!user){
    loginUI();
 } else {
    startSessionTimer();
    dashboardUI(user);
 }
}

// Initial load
guard();
