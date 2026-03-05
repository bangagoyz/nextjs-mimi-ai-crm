import Link from "next/link";
import { db } from "@/lib/db";
import { buildInterestInsights } from "@/lib/insights";
import { cardStyle, buttonStyle } from "@/lib/ui";

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
      }}
    >
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
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
        <div style={cardStyle}>
          <p style={{ color: "#111", fontSize: "30px", fontWeight: "bold" }}>
            Total Customers
          </p>
          <h2 style={{ fontSize: "32px" }}>{totalCustomers}</h2>
        </div>

        <div style={cardStyle}>
          <p style={{ color: "#111", fontSize: "30px", fontWeight: "bold" }}>
            Top Interest
          </p>
          <h2 style={{ fontSize: "28px" }}>{interests[0]?.interest || "-"}</h2>
        </div>
      </div>

      {/* TOP INTERESTS */}

      <div style={{ marginTop: "40px" }}>
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
            <div key={idx} style={cardStyle}>
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
              <p
                style={{
                  color: "#895737",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {i.count} customers
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
