import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between mb-10">
      <Link href="/" className="text-2xl font-semibold">
        Mimi CRM
      </Link>

      <div className="flex gap-6 text-sm">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>

        <Link href="/promo" className="hoer:underline">
          Promo Ideas
        </Link>
      </div>
    </nav>
  );
}
