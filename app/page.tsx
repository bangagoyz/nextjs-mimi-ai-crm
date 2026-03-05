import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "80px 40px",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>Mimi CRM</h1>

      <p style={{ color: "#888", fontSize: "18px" }}>
        AI-powered CRM that helps generate marketing campaign ideas based on
        customer interests.
      </p>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Link href="/dashboard">
          <button
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Open Dashboard
          </button>
        </Link>

        <Link href="/promo">
          <button
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "1px solid #444",
              background: "transparent",
              color: "white",
              cursor: "pointer",
            }}
          >
            Generate Promo Ideas
          </button>
        </Link>
      </div>
    </div>
  );
}
