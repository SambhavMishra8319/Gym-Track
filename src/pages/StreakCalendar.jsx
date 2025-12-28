// // import React, { useEffect, useState } from "react";
// // // import { getUserStreaks } from "../firebase/users";
// // import { getUserStreaks } from "../firebase/users";

// // export default function StreakCalendar({ user }) {
// //   const [streaks, setStreaks] = useState([]);

// //   useEffect(() => {
// //     if (!user) return;
// //     async function load() {
// //       const data = await getUserStreaks(user.uid);
// //       setStreaks(data);
// //     }
// //     load();
// //   }, [user]);

// //   // Render simple 7x4 grid of past month
// //   return (
// //     <div className="p-8 min-h-screen">
// //       <h2 className="text-3xl font-semibold mb-6">Workout Streak Calendar</h2>
// //       <div className="grid grid-cols-7 gap-1">
// //         {streaks.map((day, idx) => (
// //           <div
// //             key={idx}
// //             className={`h-10 w-10 rounded ${
// //               day.done ? "bg-green-500" : "bg-gray-200"
// //             }`}
// //             title={day.date}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { getUserStreaks } from "../firebase/users";

// export default function StreakCalendar({ user }) {
//   const [streaks, setStreaks] = useState([]);

//   useEffect(() => {
//     if (user?.uid) {
//       getUserStreaks(user.uid).then((data) => setStreaks(data));
//     }
//   }, [user]);

//   if (!user) return <p>Please log in to see your streaks</p>;
//   if (!streaks.length) return <p>No streaks yet. Start your workouts!</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">Your Workout Streaks</h2>
//       <div className="grid grid-cols-7 gap-2">
//         {streaks.map((day, index) => (
//           <div
//             key={index}
//             className={`h-10 w-10 rounded-lg flex items-center justify-center 
//               ${day.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
//           >
//             {day.date.slice(-2)} {/* last two digits of date */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { getUserStreaks } from "../firebase/users";

export default function StreakCalendar({ user }) {
  const [streaks, setStreaks] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      getUserStreaks(user.uid).then((data) => setStreaks(data || []));
    }
  }, [user]);

  if (!user)
    return (
      <div className="pt-16 pb-24 px-4">
        <p>Please log in to see your streaks</p>
      </div>
    );

  if (!streaks.length)
    return (
      <div className="pt-16 pb-24 px-4">
        <p>No streaks yet. Start your workouts!</p>
      </div>
    );

  return (
    <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Your Workout Streaks
        </h2>
        <div className="grid grid-cols-7 gap-2">
          {streaks.map((day, index) => (
            <div
              key={index}
              className={`h-9 w-9 md:h-10 md:w-10 rounded-lg flex items-center justify-center ${
                day.completed
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {day.date.slice(-2)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
