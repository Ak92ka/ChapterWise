import bcrypt from "bcrypt";
import db from "../db.js";

export default async function signupHandler(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: "Password must be at least 8 characters long",
    });
  }

  const existing = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);

  if (existing) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const id = Date.now().toString();

  db.prepare(`
    INSERT INTO users (id, name, email, password, subscribed, subscribedAt, subscribedUntil)
    VALUES (?, ?, ?, ?, 0, NULL, NULL)
  `).run(id, name, email, hashed);

  res.status(201).json({ message: "User created" });
}
