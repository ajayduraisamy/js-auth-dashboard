const app = document.getElementById("app");

let users = JSON.parse(localStorage.getItem("users")) || [];
let session = localStorage.getItem("session");

/* UI VIEWS */

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
      Have an account?
      <span class="text-primary" style="cursor:pointer" onclick="loginUI()">Login</span>
     </p>
 `;
}

function dashboardUI(user){
 app.innerHTML = `
    <h4 class="text-center">Dashboard</h4>
    <p class="text-center">Welcome, <b>${user}</b></p>

    <button class="btn btn-danger w-100 mt-3" onclick="logout()">Logout</button>
 `;
}


/* LOGIC */

function register(){
 const u = ru.value.trim();
 const p = rp.value.trim();

 if(u.length < 3) return alert("Username must be at least 3 characters");
 if(p.length < 6) return alert("Password must be at least 6 characters");

 if(users.some(x => x.username === u))
    return alert("User already exists");

 users.push({username:u, password:p});
 localStorage.setItem("users", JSON.stringify(users));

 alert("Registered successfully");
 loginUI();
}

function login(){
 const u = lu.value.trim();
 const p = lp.value.trim();

const found = users.find(
    x => x.username === u && x.password === btoa(p)
);


 if(!found) return alert("Invalid credentials");

 localStorage.setItem("session", u);
 dashboardUI(u);
}

function logout(){
 localStorage.removeItem("session");
 location.reload();
}


/* INIT */

if(session){
 dashboardUI(session);
}else{
 loginUI();
}
