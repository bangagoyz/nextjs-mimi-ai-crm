"use client";

import { useState } from "react";

type PromoTheme = {
  theme: string;
  segment: string;
  why_now: string;
  message: string;
  best_time_window?: string;
};

export default function PromoPage() {
  const [themes, setThemes] = useState<PromoTheme[]>([]);
  const [loading, setLoading] = useState(false);

  async function generateIdeas() {
    setLoading(true);

    const res = await fetch("/api/promo");
    const data = await res.json();

    setThemes(data.themes || []);
    setLoading(false);
  }

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
        Promo Ideas Dashboard
      </h1>

      <button
        onClick={generateIdeas}
        style={{
          marginTop: "20px",
          padding: "10px 16px",
          background: "black",
          color: "white",
          borderRadius: "6px",
        }}
      >
        {loading ? "Generating..." : "Generate Promo Ideas"}
      </button>

      <div style={{ marginTop: "30px" }}>
        {themes.map((theme, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #eee",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "16px",
            }}
          >
            <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>
              {theme.theme}
            </h2>

            <p>
              <b>Segment:</b> {theme.segment}{" "}
            </p>
            <p>
              <b>Why now:</b> {theme.why_now}
            </p>
            <p>
              <b>Message:</b> {theme.message}
            </p>
            <p>
              <b>Best time:</b> {theme.best_time_window}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
