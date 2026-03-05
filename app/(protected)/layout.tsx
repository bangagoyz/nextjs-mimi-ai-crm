"use client";

import { AuthProvider, useAuth } from "@/lib/auth-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function Navbar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("user_email");
    setUserEmail(email);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyle = (path: string) => ({
    color: "#F5EDE4",
    textDecoration: "none",
    paddingBottom: "4px",
    borderBottom:
      pathname === path ? "2px solid #F3E8DC" : "2px solid transparent",
    transition: "all 0.2s ease",
  });

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "#6B4226",
        color: "white",
        boxShadow: scrolled ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 0",
        }}
      >
        <Link
          href="/dashboard"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "white",
            textDecoration: "none",
          }}
        >
          ☕ MimiCoffeeCRM
        </Link>

        <div style={{ display: "flex", gap: "24px" }}>
          <Link href="/dashboard" style={linkStyle("/dashboard")}>
            Dashboard
          </Link>

          <Link href="/customers" style={linkStyle("/customers")}>
            Customers
          </Link>

          <Link href="/promo" style={linkStyle("/promo")}>
            Promo Ideas
          </Link>

          <Link href="/ai-chat" style={linkStyle("/ai-chat")}>
            AI Chat
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              opacity: 0.9,
            }}
          >
            {userEmail}
          </span>

          <button
            onClick={logout}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              background: "#C08552",
              color: "white",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Navbar />

      <main
        style={{
          padding: "40px",
          maxWidth: "1100px",
          margin: "auto",
          marginTop: "80px",
        }}
      >
        {children}
      </main>
    </AuthProvider>
  );
}
