const app = document.getElementById("app");

let users = JSON.parse(localStorage.getItem("users")) || [];
let session = localStorage.getItem("session");

// ================= UI BUILD =================

function showLogin(){
    app.innerHTML = `
        <h3>Login</h3>
        <input id="lu" placeholder="Username"><br>
        <input id="lp" type="password" placeholder="Password"><br>
        <button onclick="login()">Login</button>
        <p onclick="showRegister()" style="cursor:pointer;color:blue;">Create account</p>
    `;
}

function showRegister(){
    app.innerHTML = `
        <h3>Register</h3>
        <input id="ru" placeholder="Username"><br>
        <input id="rp" type="password" placeholder="Password"><br>
        <button onclick="register()">Register</button>
        <p onclick="showLogin()" style="cursor:pointer;color:blue;">Back to login</p>
    `;
}

function showDashboard(user){
    app.innerHTML = `
        <h3>Dashboard</h3>
        <p>Welcome <b>${user}</b></p>
        <button onclick="logout()">Logout</button>
    `;
}

// ================= LOGIC =================

function register(){
    const u = ru.value.trim();
    const p = rp.value.trim();

    if(u.length < 3 || p.length < 6)
        return alert("Username >=3 chars, Password >=6 chars");

    if(users.some(x => x.username === u))
        return alert("User already exists");

    users.push({username:u, password:p});
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully");
    showLogin();
}

function login(){
    const u = lu.value.trim();
    const p = lp.value.trim();

    const found = users.find(x => x.username===u && x.password===p);

    if(!found) return alert("Invalid credentials");

    localStorage.setItem("session", u);
    showDashboard(u);
}

function logout(){
    localStorage.removeItem("session");
    location.reload();
}

// ================= INIT =================

if(session){
    showDashboard(session);
}else{
    showLogin();
}
