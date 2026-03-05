import { db } from "@/lib/db";
import { cardStyle } from "@/lib/ui";

const thStyle = {
  textAlign: "left" as const,
  padding: "14px",
  borderBottom: "1px solid #ddd",
  color: "#333",
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #eee",
  color: "#444",
};

const badgeStyle = {
  padding: "4px 10px",
  borderRadius: "999px",
  background: "#F3E8DC",
  color: "#6B4226",
  fontSize: "12px",
  fontWeight: "bold",
};
export default async function CustomersPage() {
  const customers = await db.customer.findMany();

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "auto",
        padding: "40px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>Customers Lists</h1>

      {/* SEARCH */}

      <input
        placeholder="Search customer..."
        style={{
          marginTop: "20px",
          padding: "10px 14px",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      />

      {/* TABLE CARD */}

      <div style={{ ...cardStyle, marginTop: "20px", padding: "0" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ background: "#895737" }}>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Contact</th>
              <th style={thStyle}>Favorite</th>
              <th style={thStyle}>Interests</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td style={tdStyle}>{c.name}</td>
                <td style={tdStyle}>{c.contact}</td>
                <td style={tdStyle}>{c.favorite}</td>

                <td style={tdStyle}>
                  <div
                    style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}
                  >
                    {c.interests.map((i, idx) => (
                      <span key={idx} style={badgeStyle}>
                        {i}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
