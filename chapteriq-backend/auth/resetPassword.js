import bcrypt from "bcrypt";
import crypto from "crypto";
import db from "../db.js";

export default async function resetPassword(req, res) {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: "Invalid request" });
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: "Password must be at least 8 characters",
    });
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

// Find the user by reset token
const { rows } = await db.query(
  `SELECT * FROM users
   WHERE resetToken = $1
     AND resetTokenExpires > $2`,
  [hashedToken, new Date().toISOString()]
);

const user = rows[0];

if (!user) {
  return res.status(400).json({ error: "Token is invalid or expired" });
}

// Hash the new password
const hashedPassword = await bcrypt.hash(password, 10);

// Update the user's password and clear the token
await db.query(
  `UPDATE users
   SET password = $1,
       resetToken = NULL,
       resetTokenExpires = NULL
   WHERE id = $2`,
  [hashedPassword, user.id]
);

  res.json({
    message: "Password updated successfully. You can now log in.",
  });
}
