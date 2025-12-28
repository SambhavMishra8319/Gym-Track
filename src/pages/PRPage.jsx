// import React from "react";
// import PRCharts from "../components/PRCharts";

// export default function PRPage({ user }) {
//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-semibold mb-6">Personal Records</h2>
//       <PRCharts user={user} />
//     </div>
//   );
// }
import React from "react";
import PRCharts from "../components/PRCharts";

export default function PRPage({ user }) {
  return (
    <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Personal Records
        </h2>
        <PRCharts user={user} />
      </div>
    </div>
  );
}
