// import React from "react";
// import Charts from "../components/Charts";

// export default function AnalyticsPage({ user }) {
//   return (
//     <div className="p-8 overflow-y-auto">
//       <h2 className="text-3xl font-semibold mb-6">Analytics Dashboard</h2>

//       {/* Charts Section */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <Charts user={user} />
//       </div>
//     </div>
//   );
// }
import React from "react";
import Charts from "../components/Charts";

export default function AnalyticsPage({ user }) {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Analytics Dashboard
        </h2>

        {/* Charts Section */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <Charts user={user} />
        </div>
      </div>
    </div>
  );
}
