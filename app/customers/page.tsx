import { db } from "@/lib/db";

export default async function CustomersPage() {
  const customers = await db.customer.findMany();

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Customers</h1>

      <table
        style={{
          marginTop: "20px",
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #444", padding: "10px" }}>Name</th>
            <th style={{ border: "1px solid #444", padding: "10px" }}>
              Contact
            </th>
            <th style={{ border: "1px solid #444", padding: "10px" }}>
              Favorite
            </th>
            <th style={{ border: "1px solid #444", padding: "10px" }}>
              Interests
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td style={{ border: "1px solid #444" }}>{c.name}</td>
              <td style={{ border: "1px solid #444" }}>{c.contact}</td>
              <td style={{ border: "1px solid #444" }}>{c.favorite}</td>
              <td style={{ border: "1px solid #444" }}>
                {c.interests.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
