"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("user_email", email);
      localStorage.setItem("token", data.token);

      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Login</h1>

      <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
        />

        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "#6B4226",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
