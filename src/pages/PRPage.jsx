import React from "react";
import PRCharts from "../components/PRCharts";

export default function PRPage({ user }) {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6">Personal Records</h2>
      <PRCharts user={user} />
    </div>
  );
}
