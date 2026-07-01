import React from "react";
import Charts from "../components/Charts";

export default function AnalyticsPage({ user }) {
  return (
    <div className="space-y-5 pb-24 sm:space-y-6">
      <section className="premium-hero">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-300">Training intelligence</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl md:text-5xl">Analytics Dashboard</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Track volume, PRs, consistency, and exercise progress using normalized exercise names.
        </p>
      </section>

      <section className="premium-card">
        <Charts user={user} />
      </section>
    </div>
  );
}
