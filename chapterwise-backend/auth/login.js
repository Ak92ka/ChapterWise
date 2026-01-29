import bcrypt from "bcrypt";
import db from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();  // <--- must run before using process.env


export default async function loginHandler(req, res) {
  const { email, password } = req.body;

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Create JWT
  const token = jwt.sign(
    { id: user.id, email: user.email, subscribed: user.subscribed },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION || "7d" }
  );

  res.status(200).json({
    token, // <- frontend will store this in localStorage
    id: user.id,
    name: user.name,
    email: user.email,
    subscribed: user.subscribed,
    subscribedAt: user.subscribedAt,
    subscribedUntil: user.subscribedUntil,
    dailyCharacters: user.dailyCharacters,
    monthlyCharacters: user.monthlyCharacters,
  });
}
