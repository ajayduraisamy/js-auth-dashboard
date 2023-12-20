const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const USERS_FILE = path.join(__dirname, "../data/users.json");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_EXPIRES_IN = "1h";

function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8") || "[]");
  } catch {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

function generateToken(email) {
  return jwt.sign({ email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

//  REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Email and password (min 6 chars) required",
      });
    }

    const users = readUsers();
    const check = users.find((u) => u.email === email.toLowerCase());

    if (check) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    users.push({
      email: email.toLowerCase(),
      password: hashed,
      createdAt: new Date().toISOString(),
    });

    writeUsers(users);

    const token = generateToken(email);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

//  LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = readUsers();
    const user = users.find((u) => u.email === email.toLowerCase());

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(email);

    res.json({
      success: true,
      message: "Login successful",
      token,
      email,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

//  PROFILE
exports.getProfile = (req, res) => {
  try {
    const users = readUsers();

    const user = users.find((u) => u.email === req.user.email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { password, ...safeUser } = user;

    res.json({
      success: true,
      user: safeUser,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to load profile",
    });
  }
};
