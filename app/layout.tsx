import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#000" }}>
        {/* NAVBAR */}

        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px 40px",
            borderBottom: "1px solid #222",
          }}
        >
          <h3 style={{ color: "white" }}>Mimi CRM</h3>

          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/dashboard" style={{ color: "white" }}>
              Dashboard
            </Link>

            <Link href="/customers" style={{ color: "white" }}>
              Customers
            </Link>

            <Link href="/promo" style={{ color: "white" }}>
              Promo Ideas
            </Link>

            <Link href="/ai-chat" style={{ color: "white" }}>
              AI Chat
            </Link>
          </div>
        </nav>

        {/* PAGE CONTENT */}

        <main>{children}</main>
      </body>
    </html>
  );
}
