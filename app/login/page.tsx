"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  function handleLogin(e: any) {
    e.preventDefault();

    // fake login
    localStorage.setItem("crm_user", email);

    router.push("/dashboard");
  }

  return (
    <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          style={{
            width: "100%",
            padding: "10px",
            background: "black",
            color: "white",
            border: "none",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
