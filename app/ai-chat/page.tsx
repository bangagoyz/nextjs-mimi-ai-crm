"use client";

import { useState } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const userInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
        }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        role: "ai",
        text: data.reply || "No response",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "AI failed to respond",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "auto",
        padding: "40px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        Chat With Mimi AI Marketing Asistant
      </h1>

      {/* CHAT WINDOW */}

      <div
        style={{
          marginTop: "20px",
          background: "#895737",
          borderRadius: "12px",
          padding: "20px",
          height: "400px",
          overflowY: "auto",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: "14px",
              textAlign: m.role === "user" ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px 14px",
                borderRadius: "12px",
                background: m.role === "user" ? "#C08552" : "#f1f1f1",
                color: m.role === "user" ? "white" : "#333",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "16px",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask marketing assistant..."
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#6B4226",
            color: "white",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
