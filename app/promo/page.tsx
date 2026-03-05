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
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  async function generateIdeas() {
    setLoading(true);

    const res = await fetch("/api/promo");
    const data = await res.json();

    setThemes(data.themes || []);
    setLoading(false);
  }

  function copyMessage(text: string, index: number) {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);

    setTimeout(() => setCopiedIndex(null), 1500);
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "40px",
        fontFamily: "sans-serif",
      }}
    >
      {/* HEADER */}

      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
          Promo Ideas Dashboard
        </h1>

        <p style={{ color: "#777", marginTop: "6px" }}>
          AI-generated campaign ideas based on customer interests
        </p>
      </div>

      {/* ACTION BAR */}

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={generateIdeas}
          style={{
            padding: "12px 18px",
            borderRadius: "8px",
            border: "none",
            background: "#111",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            opacity: loading ? 0.6 : 1,
          }}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate AI Promo Ideas"}
        </button>

        <span style={{ color: "#888" }}>
          {themes.length > 0 && `${themes.length} campaign ideas generated`}
        </span>
      </div>

      {/* EMPTY STATE */}

      {!loading && themes.length === 0 && (
        <div
          style={{
            padding: "40px",
            border: "1px dashed #ccc",
            borderRadius: "10px",
            textAlign: "center",
            color: "#777",
          }}
        >
          No promo ideas yet. Click generate to create AI campaign ideas.
        </div>
      )}

      {/* CARD GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {themes.map((theme, index) => (
          <div
            key={index}
            style={{
              borderRadius: "12px",
              padding: "22px",
              background: "white",
              color: "#111",
              border: "1px solid #eee",
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {theme.theme}
              </h2>

              <p style={{ color: "#444", marginBottom: "8px" }}>
                <b>Segment:</b> {theme.segment}
              </p>

              <p style={{ color: "#444", marginBottom: "12px" }}>
                <b>Why now:</b> {theme.why_now}
              </p>

              <p
                style={{
                  fontStyle: "italic",
                  color: "#333",
                  marginBottom: "12px",
                }}
              >
                {theme.message}
              </p>

              <p style={{ color: "#666" }}>
                ⏰ {theme.best_time_window || "Any time"}
              </p>
            </div>

            <button
              onClick={() => copyMessage(theme.message, index)}
              style={{
                marginTop: "16px",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                background: "#fafafa",
                cursor: "pointer",
              }}
            >
              {copiedIndex === index ? "Copied!" : "Copy Message"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
