// middleware/auth.middleware.js

exports.protect = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token." });
  }

  // Temporary demo validation
  if (token !== "demo-token") {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
};
