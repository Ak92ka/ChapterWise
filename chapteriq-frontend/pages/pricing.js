"use client";
import { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header.js";
import Footer from "@/components/Footer.js";
import SEO from "@/components/SEO";
import dotenv from "dotenv";

dotenv.config();

export default function Pricing() {
  const [billing, setBilling] = useState("monthly");

  const isMonthly = billing === "monthly";

const handleSubscribe = async () => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if (!savedUser) return alert("Please log in first.");

  const priceId = isMonthly
    ? "price_1SuWz8JCvZIg6jX8yPvYcOPK"
    : "price_1SuWzzJCvZIg6jX8InOXpEbU"; // Stripe price IDs

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: savedUser.id, priceId, billing: isMonthly ? "monthly" : "yearly" }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  } catch (err) {
    console.error(err);
    alert("Failed to start checkout.");
  }
};

  return (
    <>
    <SEO
          title="ChapterIQ Pricing – Simple Plans for Exam Preparation"
            description="View ChapterIQ pricing plans and choose the option that fits your study needs. Simple, transparent pricing for exam-ready notes."
            url="https://www.chapteriq.com/pricing"
          />
      <main>
        <Header />

        <div className="pricing-container">
          <h1>Pricing</h1>
          <p className="pricing-subtitle">Simple pricing. Cancel anytime.</p>

          {/* Toggle */}
          <div className="billing-toggle">
            <button
              className={isMonthly ? "active" : ""}
              onClick={() => setBilling("monthly")}
            >
              Pay Monthly
            </button>
            <button
              className={!isMonthly ? "active" : ""}
              onClick={() => setBilling("yearly")}
            >
              Pay Yearly
            </button>
          </div>

          {/* Plan Card */}
          <div className="pricing-card">
            <h2>Plus</h2>

            <div className="price">
              <span className="amount">{isMonthly ? "$5" : "$36"}</span>
              <span className="period">{isMonthly ? "/ month" : "/ year"}</span>
            </div>

            {!isMonthly && (
              <p className="save-text">Save 40% compared to monthly</p>
            )}

            <p className="plan-desc">
              Ideal for undergraduates who want clear, exam-focused notes.
            </p>

            <button className="subscribe-btn" onClick={handleSubscribe}>
              {" "}
              Subscribe Now
            </button>

            <div className="features">
              <label>What is included</label>
              <p>✓ Unlimited chapter summaries</p>
              <p>✓ Upload PDF, Word, PPT, or text</p>
              <p>✓ Exam-focused AI notes</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
