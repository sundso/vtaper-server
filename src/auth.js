const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  if (username !== process.env.ADMIN_USER) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const passwordMatches = bcrypt.compareSync(password, process.env.ADMIN_PASSWORD_HASH || "");
  if (!passwordMatches) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ sub: username }, process.env.JWT_SECRET, { expiresIn: "90d" });
  res.json({ token });
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing authorization token" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = { login, requireAuth };
