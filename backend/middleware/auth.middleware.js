const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

exports.protect = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      success: false,
      message: "No auth token provided",
    });
  }

  const token = header.startsWith("Bearer ")
    ? header.split(" ")[1]
    : header;

  try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("Validating JWT token");
try {
  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded;
} catch {
  return res.status(401).json({
    success: false,
    message: "Expired or invalid token"
  });
}

    req.user = { email: decoded.email };
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token invalid or expired",
    });
  }
};
