"use client";

import { useState } from "react";

export default function AIChatPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  async function askAI() {
    const res = await fetch("/api/promo", {
      method: "GET",
    });

    const data = await res.json();

    setReply(JSON.stringify(data.themes?.[0]?.message || ""));
  }

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>
      <h1>AI Marketing Assistant</h1>

      <input
        placeholder="Ask something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
        }}
      />

      <button
        onClick={askAI}
        style={{
          marginTop: "10px",
          padding: "10px",
          background: "black",
          color: "white",
          border: "none",
        }}
      >
        Ask AI
      </button>

      {reply && (
        <div style={{ marginTop: "20px" }}>
          <b>AI Response:</b>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}
