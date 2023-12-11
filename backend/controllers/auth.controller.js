// backend/controllers/auth.controller.js

const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const USERS_FILE = path.join(__dirname, "../data/users.json");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_EXPIRES_IN = "1h";

function readUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Error reading users file:", err.message);
    return [];
  }
}

function writeUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Error writing users file:", err.message);
  }
}

function generateToken(email) {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// POST /api/auth/register
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Email and password (min 6 chars) are required",
      });
    }

    const normalizedEmail = email.toLowerCase();
    const users = readUsers();

    const existing = users.find((u) => u.email === normalizedEmail);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email: normalizedEmail,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeUsers(users);

    const token = generateToken(normalizedEmail);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};
// POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase();
    const users = readUsers();

    // Find user
    const user = users.find((u) => u.email === normalizedEmail);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(normalizedEmail);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      email: normalizedEmail,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// GET /api/auth/me
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

    res.status(200).json({
      success: true,
      user: safeUser,
    });
  } catch (err) {
    console.error("Profile error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
    });
  }
};
