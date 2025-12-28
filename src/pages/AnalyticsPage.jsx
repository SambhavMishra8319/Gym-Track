
import React from "react";
import Charts from "../components/Charts";

export default function AnalyticsPage({ user }) {
  return (
    <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Analytics Dashboard
        </h2>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <Charts user={user} />
        </div>
      </div>
    </div>
  );
}
