import { db } from "@/lib/db";
import { cardStyle } from "@/lib/ui";
import Link from "next/link";
import { navButtonStyle } from "@/lib/ui";

const thStyle = {
  textAlign: "left" as const,
  padding: "14px",
  borderBottom: "1px solid #ddd",
  color: "white",
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

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;

  const page = Number(params.page || 1);

  const limit = 15;

  const skip = (page - 1) * limit;

  const customers = await db.customer.findMany({
    skip,
    take: limit,
  });

  const totalCustomers = await db.customer.count();

  const totalPages = Math.ceil(totalCustomers / limit);

  const pageWindow = 5;

  const startPage = Math.max(1, page - Math.floor(pageWindow / 2));
  const endPage = Math.min(totalPages, startPage + pageWindow - 1);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "auto",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>Customers Lists</h1>

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
                    style={{
                      display: "flex",
                      gap: "6px",
                      flexWrap: "wrap",
                    }}
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

      {/* PAGINATION */}

      <div
        style={{
          marginTop: "25px",
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* PREVIOUS */}

        {page > 1 && (
          <Link href={`/customers?page=${page - 1}`}>
            <button style={navButtonStyle}>Previous</button>
          </Link>
        )}

        {/* PAGE NUMBERS */}

        {pages.map((p) => {
          const active = p === page;

          return (
            <Link key={p} href={`/customers?page=${p}`}>
              <button
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: active ? "1px solid #895737" : "1px solid #ddd",
                  background: active ? "#895737" : "white",
                  color: active ? "white" : "#444",
                  cursor: "pointer",
                  fontWeight: active ? "bold" : "normal",
                }}
              >
                {p}
              </button>
            </Link>
          );
        })}

        {/* NEXT */}

        {page < totalPages && (
          <Link href={`/customers?page=${page + 1}`}>
            <button style={navButtonStyle}>Next</button>
          </Link>
        )}
      </div>
    </div>
  );
}
