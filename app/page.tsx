import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">
        Welcome to Mini CRM - AI Promo Helper
      </h1>

      <p className="text-gray-600">
        Smart Managing customers and promo ideas powered by AI.
      </p>

      <div className="flexs gap-4">
        <Link
          href="/dashboard"
          className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 transition"
        >
          Go to Dashboard
        </Link>

        <Link
          href="/customers"
          className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          View Customers
        </Link>
      </div>
    </main>
  );
}
