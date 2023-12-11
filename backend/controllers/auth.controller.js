const fs = require("fs");
const path = require("path");

const USERS_FILE = path.join(__dirname, "../data/users.json");

function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8") || "[]");
  } catch {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

exports.registerUser = (req, res) => {
  const { email, password } = req.body;

  const users = readUsers();

  users.push({
    email,
    password,
    createdAt: new Date().toISOString(),
  });

  writeUsers(users);

  res.json({
    success: true,
    message: "User registered (base controller)",
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const users = readUsers();

  const found = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!found) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  res.json({
    success: true,
    message: "Login successful (base controller)",
  });
};
