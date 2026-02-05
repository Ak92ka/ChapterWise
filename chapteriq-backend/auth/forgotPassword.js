import crypto from "crypto";
import db from "../db.js";

export default async function forgotPassword(req, res) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

// Make sure this is inside an async function
const { rows } = await db.query(
  "SELECT * FROM users WHERE email = $1",
  [email]
);

const user = rows[0]; // undefined if no user found

  // Always return success (security best practice)
  if (!user) {
    return res.json({
      message: "If an account exists, a reset link was sent.",
    });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

await db.query(
  `UPDATE users
   SET resetToken = $1, resetTokenExpires = $2
   WHERE id = $3`,
  [hashedToken, expires, user.id]
);

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  // DEV: log link instead of email
  console.log("🔑 Password reset link:", resetLink);

  res.json({
    message: "If an account exists, a reset link was sent.",
  });
}
