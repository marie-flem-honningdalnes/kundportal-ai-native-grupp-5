import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-slate-700">Welcome to your customer portal.</p>
      <Link href="/tickets" className="inline-block font-medium text-blue-700 underline-offset-4 hover:underline">
        View your support tickets →
      </Link>
    </div>
  );
}
