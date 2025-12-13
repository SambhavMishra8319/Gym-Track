// import React, { useState } from "react";

// export default function SettingsPage({ user }) {
//   const [displayName, setDisplayName] = useState(user.displayName || "");
//   const [email, setEmail] = useState(user.email || "");

//   const handleSave = async () => {
//     // Update in Firebase Auth or Firestore
//     alert("Settings saved! (You can implement Firebase updates here)");
//   };

//   return (
//     <div className="p-8 min-h-screen">
//       <h2 className="text-3xl font-semibold mb-6">Account Settings</h2>
//       <div className="bg-white p-6 rounded-xl shadow space-y-4 max-w-md">
//         <div>
//           <label className="block text-sm">Name</label>
//           <input
//             type="text"
//             value={displayName}
//             onChange={(e) => setDisplayName(e.target.value)}
//             className="w-full p-2 border rounded mt-1"
//           />
//         </div>
//         <div>
//           <label className="block text-sm">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border rounded mt-1"
//           />
//         </div>
//         <button
//           onClick={handleSave}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           Save Settings
//         </button>
//       </div>
//     </div>
//   );
// }
import React from "react";

export default function SettingsPage({ user }) {
  
  // 1️⃣ Handle not logged in
  if (!user) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Please log in to view settings.</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      {/* Profile Info */}
      <div className="bg-white shadow p-4 rounded mb-4">
        <p className="text-lg"><strong>Name:</strong> {user.displayName || "No name set"}</p>
        <p className="text-lg"><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}
