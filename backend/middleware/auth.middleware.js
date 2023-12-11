// backend/middleware/auth.middleware.js

const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

exports.protect = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid token format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { email: decoded.email };
    next();
  } catch (err) {
    console.error("Token error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
