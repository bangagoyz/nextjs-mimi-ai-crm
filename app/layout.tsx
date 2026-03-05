import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Inter, sans-serif",
          background: "#F5EDE4",
          color: "#2F1B12",
        }}
      >
        {/* NAVBAR */}

        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 40px",
            background: "#6B4226",
            color: "white",
          }}
        >
          <h3 style={{ margin: 0 }}>☕ CoffeeCRM</h3>

          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/dashboard" style={{ color: "#F5EDE4" }}>
              Dashboard
            </Link>

            <Link href="/customers" style={{ color: "#F5EDE4" }}>
              Customers
            </Link>

            <Link href="/promo" style={{ color: "#F5EDE4" }}>
              Promo Ideas
            </Link>

            <Link href="/ai-chat" style={{ color: "#F5EDE4" }}>
              AI Chat
            </Link>
          </div>
        </nav>

        {/* CONTENT */}

        <main
          style={{
            padding: "40px",
            maxWidth: "1100px",
            margin: "auto",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
