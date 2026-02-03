import { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header.js";
import Footer from "@/components/Footer.js";
import SEO from "@/components/SEO";

export default function About({title, description, url, image}) {
  return (
    <>
      <SEO
      title="About ChapterIQ – Exam-Focused Study Notes"
        description="Learn how ChapterIQ helps students turn textbook chapters into exam-ready study notes and study smarter for their exams."
        url="https://www.chapteriq.com/about-us"
      />
      <main>
        <Header />
        <div className="about-us-container">
          <h1>About us</h1>
          <h2>We don’t summarize chapters.</h2>
          <p>We help you pass exams.</p>
          <p>
            Textbooks aren’t written for exams — they’re written to be complete.
            </p>
            <p>
            That’s the problem. 
            </p>
            <p>
            Students are expected to read hundreds of pages, figure out what matters, and somehow turn it into exam-ready knowledge. Most don’t know <span className="bold">what to focus on</span>, what to <span className="bold">ignore</span>, or how deep they’re expected to understand each topic. 
            </p>
            <p>That’s where <span className="bold">ChapterIQ</span> comes in.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
