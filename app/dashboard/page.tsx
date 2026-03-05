import Link from "next/link";
import { db } from "@/lib/db";
import { buildInterestInsights } from "@/lib/insights";

export default async function DashboardPage() {
  const customers = await db.customer.findMany();

  const totalCustomers = customers.length;

  const interests = buildInterestInsights(customers);

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "auto",
        padding: "40px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "white" }}>
        Dashboard Overview
      </h1>

      {/* METRIC CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            padding: "20px",
            borderRadius: "10px",
            background: "white",
            border: "1px solid #eee",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <p style={{ color: "#111", fontSize: "30px", fontWeight: "bold" }}>
            Total Customers
          </p>
          <h2 style={{ fontSize: "28px", color: "#666" }}>{totalCustomers}</h2>
        </div>

        <div
          style={{
            padding: "20px",
            borderRadius: "10px",
            background: "white",
            border: "1px solid #eee",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <p style={{ color: "#111", fontSize: "30px", fontWeight: "bold" }}>
            Top Interest
          </p>
          <h2 style={{ fontSize: "28px", color: "#666" }}>
            {interests[0]?.interest || "-"}
          </h2>
        </div>
      </div>

      {/* TOP INTERESTS */}

      <div style={{ marginTop: "40px", color: "white" }}>
        <h3>Top Customer Interests</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginTop: "15px",
          }}
        >
          {interests.map((i, idx) => (
            <div
              key={idx}
              style={{
                padding: "18px",
                borderRadius: "10px",
                border: "1px solid #e5e5e5",
                background: "#ffffff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
            >
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#111",
                  marginBottom: "4px",
                }}
              >
                {i.interest}
              </h4>
              <p style={{ color: "#666", fontSize: "14px" }}>
                {i.count} customers
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}

      <div style={{ marginTop: "40px" }}>
        <Link href="/promo">
          <button
            style={{
              padding: "12px 18px",
              borderRadius: "8px",
              border: "none",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            Generate Promo Ideas →
          </button>
        </Link>
      </div>
    </div>
  );
}
