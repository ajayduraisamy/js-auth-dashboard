exports.protect = (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res.status(401).json({ message: "Missing auth token" });
  }

  if (!auth.startsWith("Bearer")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = auth.split(" ")[1];

  if (token !== "demo-token") {
    return res.status(401).json({ message: "Unauthorized token" });
  }

  req.user = { role: "user" };
  next();
};
