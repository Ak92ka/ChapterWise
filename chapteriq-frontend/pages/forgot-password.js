import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";
import { useState } from "react";
import dotenv from "dotenv";

dotenv.config();

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      // IMPORTANT: generic message for security
      setMessage(
        "If an account with that email exists, a password reset link has been sent."
      );
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <Head>
  <title>Forgot Password | ChapterIQ</title>
  <meta
    name="description"
    content="Forgot your ChapterIQ password? Enter your email to receive instructions and regain access to your account."
  />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, follow" />
  <link rel="icon" href="/favicon.ico" />
</Head>
      <Header />
      <div className="login-container">
        <div className="auth-card">
          <h1 className="forgot-password-title">Forgot Password</h1>

          <form onSubmit={submit}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
