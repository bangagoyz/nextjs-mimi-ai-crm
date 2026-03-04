import Navbar from "@/components/navbar";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Mini CRM - AI Promo Helper",
  description: "Mimi's Coffee Shop CRM",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <div className="max-w-6x1 mx-auto px-6 py-8">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
