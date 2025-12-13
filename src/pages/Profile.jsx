// // import React, { useEffect, useState } from "react";
// // import { getWorkouts } from "../firebase/exercises";

// // export default function Profile({ user }) {
// //   const [stats, setStats] = useState({
// //     totalWorkouts: 0,
// //     totalVolume: 0,
// //     topExercises: [],
// //   });

// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!user) return;

// //     async function loadProfile() {
// //       const workouts = await getWorkouts(user.uid);

// //       const totalWorkouts = workouts.length;
// //       let totalVolume = 0;
// //       const exerciseCount = {};

// //       workouts.forEach((w) => {
// //         w.exercises?.forEach((ex) => {
// //           // Count exercises
// //           exerciseCount[ex.name] = (exerciseCount[ex.name] || 0) + 1;

// //           // Calculate volume
// //           ex.sets?.forEach((s) => {
// //             const reps = Number(s.reps) || 0;
// //             const weight = Number(s.weight) || 0;
// //             totalVolume += reps * weight;
// //           });
// //         });
// //       });

// //       // Sort top exercises
// //       const topExercises = Object.entries(exerciseCount)
// //         .sort((a, b) => b[1] - a[1])
// //         .slice(0, 5)
// //         .map(([name, count]) => ({ name, count }));

// //       setStats({
// //         totalWorkouts,
// //         totalVolume,
// //         topExercises,
// //       });

// //       setLoading(false);
// //     }

// //     loadProfile();
// //   }, [user]);

// //   if (loading) return <p className="text-gray-600">Loading profile...</p>;

// //   return (
// //     <div className="p-8">
// //       <h2 className="text-3xl font-semibold mb-6">Your Profile</h2>

// //       {/* USER DETAILS CARD */}
// //       <div className="bg-white p-6 rounded-xl shadow-md mb-8">
// //         <h3 className="text-xl font-semibold mb-3">User Info</h3>
// //         <p className="text-gray-700"><strong>Name:</strong> {user.displayName || "User"}</p>
// //         <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
// //       </div>

// //       {/* STATS CARD */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
// //         <div className="bg-white p-6 rounded-xl shadow text-center">
// //           <p className="text-3xl font-bold text-blue-600">{stats.totalWorkouts}</p>
// //           <p className="text-gray-700 mt-2">Total Workouts</p>
// //         </div>

// //         <div className="bg-white p-6 rounded-xl shadow text-center">
// //           <p className="text-3xl font-bold text-green-600">{stats.totalVolume}</p>
// //           <p className="text-gray-700 mt-2">Total Volume Lifted</p>
// //         </div>

// //         <div className="bg-white p-6 rounded-xl shadow text-center">
// //           <p className="text-3xl font-bold text-purple-600">
// //             {stats.topExercises.length}
// //           </p>
// //           <p className="text-gray-700 mt-2">Top Exercises</p>
// //         </div>
// //       </div>

// //       {/* TOP EXERCISES LIST */}
// //       <div className="bg-white p-6 rounded-xl shadow">
// //         <h3 className="text-xl font-semibold mb-4">Most Frequently Performed Exercises</h3>

// //         {stats.topExercises.length === 0 ? (
// //           <p className="text-gray-600">No exercises logged yet.</p>
// //         ) : (
// //           <ul className="space-y-3">
// //             {stats.topExercises.map((ex, i) => (
// //               <li
// //                 key={i}
// //                 className="p-3 border rounded-lg flex justify-between items-center"
// //               >
// //                 <span className="font-medium">{ex.name}</span>
// //                 <span className="text-gray-600">{ex.count} times</span>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { getWorkouts } from "../firebase/exercises";

// export default function Profile({ user }) {
//   const [stats, setStats] = useState({
//     totalWorkouts: 0,
//     totalVolume: 0,
//     topExercises: [],
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) return;

//     async function loadProfile() {
//       const workouts = await getWorkouts(user.uid);

//       const totalWorkouts = workouts.length;
//       let totalVolume = 0;
//       const exerciseCount = {};

//       workouts.forEach((w) => {
//         w.exercises?.forEach((ex) => {
//           exerciseCount[ex.name] = (exerciseCount[ex.name] || 0) + 1;

//           ex.sets?.forEach((s) => {
//             const reps = Number(s.reps) || 0;
//             const weight = Number(s.weight) || 0;
//             totalVolume += reps * weight;
//           });
//         });
//       });

//       const topExercises = Object.entries(exerciseCount)
//         .sort((a, b) => b[1] - a[1])
//         .slice(0, 5)
//         .map(([name, count]) => ({ name, count }));

//       setStats({
//         totalWorkouts,
//         totalVolume,
//         topExercises,
//       });

//       setLoading(false);
//     }

//     loadProfile();
//   }, [user]);

//   if (loading)
//     return (
//       <p className="pt-20 md:pt-16 text-gray-600 px-6 md:px-12">
//         Loading profile...
//       </p>
//     );

//   return (
//     <div className="pt-20 md:pt-16 px-6 md:px-12 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-semibold mb-6">Your Profile</h2>

//       {/* USER DETAILS */}
//       <div className="bg-white rounded-2xl p-6 shadow border border-gray-200 mb-8">
//         <h3 className="text-xl font-semibold mb-4">User Info</h3>

//         <div className="space-y-2 text-gray-700">
//           <p>
//             <strong>Name:</strong> {user.displayName || "User"}
//           </p>
//           <p>
//             <strong>Email:</strong> {user.email}
//           </p>
//         </div>
//       </div>

//       {/* STAT CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white p-6 rounded-2xl border shadow-md text-center">
//           <p className="text-4xl font-bold text-blue-600">
//             {stats.totalWorkouts}
//           </p>
//           <p className="text-gray-700 mt-2">Total Workouts</p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border shadow-md text-center">
//           <p className="text-4xl font-bold text-green-600">
//             {stats.totalVolume}
//           </p>
//           <p className="text-gray-700 mt-2">Total Volume Lifted</p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border shadow-md text-center">
//           <p className="text-4xl font-bold text-purple-600">
//             {stats.topExercises.length}
//           </p>
//           <p className="text-gray-700 mt-2">Top Exercises</p>
//         </div>
//       </div>

//       {/* TOP EXERCISES LIST */}
//       <div className="bg-white rounded-2xl p-6 shadow border border-gray-200">
//         <h3 className="text-xl font-semibold mb-4">
//           Most Frequently Performed Exercises
//         </h3>

//         {stats.topExercises.length === 0 ? (
//           <p className="text-gray-600">No exercises logged yet.</p>
//         ) : (
//           <ul className="space-y-3">
//             {stats.topExercises.map((ex, i) => (
//               <li
//                 key={i}
//                 className="p-3 border rounded-lg flex justify-between items-center"
//               >
//                 <span className="font-medium">{ex.name}</span>
//                 <span className="text-gray-600">{ex.count} times</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }
