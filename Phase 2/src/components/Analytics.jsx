// // import React, { useEffect, useState } from "react";
// // import { workoutsCollection } from "../firebase/config";
// // import { query, orderBy, getDocs } from "firebase/firestore";
// // import { normalizeExerciseName, getExerciseMuscleGroup } from "../data/exerciseDatabase";

// // export default function Analytics({ user }) {
// //   const [summary, setSummary] = useState({
// //     totalWorkouts: 0,
// //     exercises: {},
// //   });
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     async function calc() {
// //       if (!user) {
// //         setLoading(false);
// //         return;
// //       }
// //       setLoading(true);
// //       try {
// //         const q = query(
// //           workoutsCollection(user.uid),
// //           orderBy("createdAt", "desc")
// //         );
// //         const snap = await getDocs(q);
// //         const workouts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
// //         const exMap = {};
// //         workouts.forEach((w) => {
// //           (w.exercises || []).forEach((ex) => {
// //             const name = normalizeExerciseName(ex.name || ex.originalName || "unnamed");
// //             if (!exMap[name]) {
// //               exMap[name] = {
// //                 sessions: 0,
// //                 totalReps: 0,
// //                 totalWeight: 0,
// //                 muscleGroup: ex.muscleGroup || getExerciseMuscleGroup(name),
// //               };
// //             }
// //             exMap[name].sessions += 1;
// //             (ex.sets || []).forEach((s) => {
// //               const reps = Number(s.reps) || 0;
// //               const weight = Number(s.weight) || 0;
// //               exMap[name].totalReps += reps;
// //               exMap[name].totalWeight += reps * weight;
// //             });
// //           });
// //         });
// //         setSummary({ totalWorkouts: workouts.length, exercises: exMap });
// //       } catch (e) {
// //         console.error(e);
// //       }
// //       setLoading(false);
// //     }
// //     calc();
// //   }, [user]);

// //   if (!user)
// //     return (
// //       <div className="pt-4 text-sm md:text-base">
// //         Please sign in to view analytics.
// //       </div>
// //     );

// //   return (
// //     <div className="pt-2">
// //       <h2 className="text-xl font-semibold mb-4">Analytics</h2>
// //       {loading && <p>Loading...</p>}
// //       {!loading && (
// //         <div className="space-y-3">
// //           <div className="mb-2">
// //             Total workouts:{" "}
// //             <strong>{summary.totalWorkouts}</strong>
// //           </div>

// //           <h3 className="font-medium mb-1">Top Exercises</h3>
// //           {Object.keys(summary.exercises).length === 0 && (
// //             <div className="text-sm text-gray-500">
// //               No data available yet.
// //             </div>
// //           )}

// //           <div className="space-y-2">
// //             {Object.entries(summary.exercises)
// //               .sort((a, b) => b[1].sessions - a[1].sessions)
// //               .slice(0, 10)
// //               .map(([name, data]) => (
// //                 <div
// //                   key={name}
// //                   className="border p-2 rounded text-sm bg-white"
// //                 >
// //                   <div className="font-medium">
// //                     {name}
// //                   </div>
// //                   <div className="text-xs text-gray-500">{data.muscleGroup}</div>
// //                   <div>{data.sessions} sessions</div>
// //                   <div>Total reps: {data.totalReps}</div>
// //                   <div>Total volume: {data.totalWeight} kg</div>
// //                 </div>
// //               ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import React, { useEffect, useMemo, useState } from "react";
// import { workoutsCollection } from "../firebase/config";
// import { query, orderBy, getDocs } from "firebase/firestore";
// import {
//   normalizeExerciseName,
//   getExerciseMuscleGroup,
// } from "../data/exerciseDatabase";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
//   CartesianGrid,
// } from "recharts";
// import { Activity, BarChart3, Dumbbell, TrendingUp } from "lucide-react";

// const COLORS = [
//   "#3b82f6",
//   "#8b5cf6",
//   "#22c55e",
//   "#f97316",
//   "#ef4444",
//   "#14b8a6",
//   "#eab308",
//   "#ec4899",
// ];

// export default function Analytics({ user }) {
//   const [summary, setSummary] = useState({
//     totalWorkouts: 0,
//     exercises: {},
//     timeline: [],
//     muscleGroups: {},
//     totalVolume: 0,
//     totalReps: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function calc() {
//       if (!user) {
//         setLoading(false);
//         return;
//       }

//       setLoading(true);

//       try {
//         const q = query(workoutsCollection(user.uid), orderBy("createdAt", "desc"));
//         const snap = await getDocs(q);
//         const workouts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

//         const exMap = {};
//         const dayMap = {};
//         const muscleMap = {};
//         let totalVolume = 0;
//         let totalReps = 0;

//         workouts.forEach((w) => {
//           const dateObj =
//             w.createdAt?.toDate?.() ||
//             (w.date ? new Date(w.date) : null) ||
//             new Date();

//           const dateKey = dateObj.toLocaleDateString("en-IN", {
//             day: "2-digit",
//             month: "short",
//           });

//           if (!dayMap[dateKey]) {
//             dayMap[dateKey] = {
//               date: dateKey,
//               volume: 0,
//               reps: 0,
//               exercises: 0,
//             };
//           }

//           (w.exercises || []).forEach((ex) => {
//             const name = normalizeExerciseName(
//               ex.name || ex.originalName || "Unnamed"
//             );

//             const muscleGroup = ex.muscleGroup || getExerciseMuscleGroup(name);

//             if (!exMap[name]) {
//               exMap[name] = {
//                 name,
//                 sessions: 0,
//                 totalReps: 0,
//                 totalWeight: 0,
//                 muscleGroup,
//               };
//             }

//             exMap[name].sessions += 1;
//             dayMap[dateKey].exercises += 1;

//             if (!muscleMap[muscleGroup]) {
//               muscleMap[muscleGroup] = 0;
//             }

//             (ex.sets || []).forEach((s) => {
//               const reps = Number(s.reps) || 0;
//               const weight = Number(s.weight) || 0;
//               const volume = reps * weight;

//               exMap[name].totalReps += reps;
//               exMap[name].totalWeight += volume;

//               dayMap[dateKey].reps += reps;
//               dayMap[dateKey].volume += volume;

//               muscleMap[muscleGroup] += volume;

//               totalReps += reps;
//               totalVolume += volume;
//             });
//           });
//         });

//         setSummary({
//           totalWorkouts: workouts.length,
//           exercises: exMap,
//           timeline: Object.values(dayMap).reverse(),
//           muscleGroups: muscleMap,
//           totalVolume,
//           totalReps,
//         });
//       } catch (e) {
//         console.error(e);
//       }

//       setLoading(false);
//     }

//     calc();
//   }, [user]);

//   const topExercises = useMemo(() => {
//     return Object.values(summary.exercises)
//       .sort((a, b) => b.sessions - a.sessions)
//       .slice(0, 10);
//   }, [summary.exercises]);

//   const volumeExercises = useMemo(() => {
//     return Object.values(summary.exercises)
//       .sort((a, b) => b.totalWeight - a.totalWeight)
//       .slice(0, 8);
//   }, [summary.exercises]);

//   const muscleData = useMemo(() => {
//     return Object.entries(summary.muscleGroups)
//       .map(([name, value]) => ({ name, value }))
//       .sort((a, b) => b.value - a.value);
//   }, [summary.muscleGroups]);

//   if (!user) {
//     return (
//       <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-sm text-slate-300">
//         Please sign in to view analytics.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-5 pb-6">
//       <div className="premium-card overflow-hidden p-5 sm:p-6">
//         <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
//           <div>
//             <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-300">
//               Performance Analytics
//             </p>
//             <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
//               Training Insights
//             </h2>
//             <p className="mt-2 max-w-2xl text-sm text-slate-300">
//               Exercise names are normalized, so wrong spellings are grouped correctly.
//             </p>
//           </div>

//           <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-200">
//             {summary.totalWorkouts} workouts logged
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <div className="premium-card p-6 text-sm text-slate-300">Loading...</div>
//       ) : (
//         <>
//           <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//             <StatCard
//               icon={Dumbbell}
//               title="Total Workouts"
//               value={summary.totalWorkouts}
//             />
//             <StatCard
//               icon={Activity}
//               title="Total Reps"
//               value={summary.totalReps.toLocaleString("en-IN")}
//             />
//             <StatCard
//               icon={BarChart3}
//               title="Total Volume"
//               value={`${Math.round(summary.totalVolume).toLocaleString("en-IN")} kg`}
//             />
//             <StatCard
//               icon={TrendingUp}
//               title="Exercises"
//               value={Object.keys(summary.exercises).length}
//             />
//           </div>

//           {topExercises.length === 0 ? (
//             <div className="premium-card p-6 text-sm text-slate-300">
//               No data available yet.
//             </div>
//           ) : (
//             <>
//               <div className="grid gap-4 lg:grid-cols-2">
//                 <ChartCard title="Volume Trend">
//                   <ResponsiveContainer width="100%" height={260}>
//                     <LineChart data={summary.timeline}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
//                       <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
//                       <YAxis stroke="#94a3b8" fontSize={11} />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Line
//                         type="monotone"
//                         dataKey="volume"
//                         stroke="#3b82f6"
//                         strokeWidth={3}
//                         dot={{ r: 4 }}
//                         activeDot={{ r: 6 }}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </ChartCard>

//                 <ChartCard title="Top Exercises by Sessions">
//                   <ResponsiveContainer width="100%" height={260}>
//                     <BarChart data={topExercises}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
//                       <XAxis
//                         dataKey="name"
//                         stroke="#94a3b8"
//                         fontSize={10}
//                         interval={0}
//                         angle={-18}
//                         textAnchor="end"
//                         height={70}
//                       />
//                       <YAxis stroke="#94a3b8" fontSize={11} />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Bar dataKey="sessions" radius={[10, 10, 0, 0]} fill="#8b5cf6" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </ChartCard>
//               </div>

//               <div className="grid gap-4 lg:grid-cols-2">
//                 <ChartCard title="Volume by Exercise">
//                   <ResponsiveContainer width="100%" height={280}>
//                     <BarChart data={volumeExercises} layout="vertical">
//                       <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
//                       <XAxis type="number" stroke="#94a3b8" fontSize={11} />
//                       <YAxis
//                         type="category"
//                         dataKey="name"
//                         stroke="#94a3b8"
//                         fontSize={10}
//                         width={110}
//                       />
//                       <Tooltip content={<CustomTooltip />} />
//                       <Bar dataKey="totalWeight" radius={[0, 10, 10, 0]} fill="#22c55e" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </ChartCard>

//                 <ChartCard title="Muscle Group Distribution">
//                   <ResponsiveContainer width="100%" height={280}>
//                     <PieChart>
//                       <Pie
//                         data={muscleData}
//                         dataKey="value"
//                         nameKey="name"
//                         cx="50%"
//                         cy="50%"
//                         outerRadius={95}
//                         innerRadius={55}
//                         paddingAngle={3}
//                       >
//                         {muscleData.map((_, index) => (
//                           <Cell
//                             key={index}
//                             fill={COLORS[index % COLORS.length]}
//                           />
//                         ))}
//                       </Pie>
//                       <Tooltip content={<CustomTooltip />} />
//                     </PieChart>
//                   </ResponsiveContainer>

//                   <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
//                     {muscleData.map((item, index) => (
//                       <div
//                         key={item.name}
//                         className="flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-slate-300"
//                       >
//                         <span
//                           className="h-2.5 w-2.5 rounded-full"
//                           style={{ backgroundColor: COLORS[index % COLORS.length] }}
//                         />
//                         <span className="truncate">{item.name}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </ChartCard>
//               </div>

//               <div className="premium-card p-4 sm:p-5">
//                 <h3 className="mb-4 text-lg font-black text-white">
//                   Top Exercises
//                 </h3>

//                 <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
//                   {topExercises.map((data) => (
//                     <div
//                       key={data.name}
//                       className="rounded-3xl border border-white/10 bg-white/5 p-4"
//                     >
//                       <div className="font-bold text-white">{data.name}</div>
//                       <div className="mt-1 text-xs text-blue-300">
//                         {data.muscleGroup}
//                       </div>
//                       <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
//                         <MiniStat label="Sessions" value={data.sessions} />
//                         <MiniStat label="Reps" value={data.totalReps} />
//                         <MiniStat
//                           label="Volume"
//                           value={`${Math.round(data.totalWeight)}kg`}
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// function StatCard({ icon: Icon, title, value }) {
//   return (
//     <div className="premium-card p-4">
//       <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
//         <Icon size={21} />
//       </div>
//       <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
//         {title}
//       </p>
//       <p className="mt-1 text-2xl font-black text-white">{value}</p>
//     </div>
//   );
// }

// function ChartCard({ title, children }) {
//   return (
//     <div className="premium-card p-4 sm:p-5">
//       <h3 className="mb-4 text-lg font-black text-white">{title}</h3>
//       <div className="w-full overflow-hidden">{children}</div>
//     </div>
//   );
// }

// function MiniStat({ label, value }) {
//   return (
//     <div className="rounded-2xl bg-white/5 px-2 py-2">
//       <p className="font-black text-white">{value}</p>
//       <p className="mt-0.5 text-[10px] text-slate-400">{label}</p>
//     </div>
//   );
// }

// function CustomTooltip({ active, payload, label }) {
//   if (!active || !payload?.length) return null;

//   return (
//     <div className="rounded-2xl border border-white/10 bg-slate-950/95 px-3 py-2 text-xs text-white shadow-2xl backdrop-blur-xl">
//       {label && <p className="mb-1 font-bold text-blue-300">{label}</p>}
//       {payload.map((item, index) => (
//         <p key={index}>
//           {item.name}:{" "}
//           <span className="font-bold">
//             {Math.round(Number(item.value || 0)).toLocaleString("en-IN")}
//           </span>
//         </p>
//       ))}
//     </div>
//   );
// }
import React, { useEffect, useMemo, useState } from "react";
import { workoutsCollection } from "../firebase/config";
import { query, orderBy, getDocs } from "firebase/firestore";
import {
  normalizeExerciseName,
  getExerciseMuscleGroup,
} from "../data/exerciseDatabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { Activity, BarChart3, Dumbbell, TrendingUp } from "lucide-react";

const COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#22c55e",
  "#f97316",
  "#ef4444",
  "#14b8a6",
  "#eab308",
  "#ec4899",
];

export default function Analytics({ user }) {
  const [summary, setSummary] = useState({
    totalWorkouts: 0,
    exercises: {},
    timeline: [],
    muscleGroups: {},
    totalVolume: 0,
    totalReps: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function calc() {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const q = query(
          workoutsCollection(user.uid),
          orderBy("createdAt", "desc")
        );

        const snap = await getDocs(q);
        const workouts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

        const exMap = {};
        const dayMap = {};
        const muscleMap = {};
        let totalVolume = 0;
        let totalReps = 0;

        workouts.forEach((w) => {
          const dateObj =
            w.createdAt?.toDate?.() ||
            (w.date ? new Date(w.date) : null) ||
            new Date();

          const dateKey = dateObj.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          });

          if (!dayMap[dateKey]) {
            dayMap[dateKey] = {
              date: dateKey,
              volume: 0,
              reps: 0,
              exercises: 0,
            };
          }

          (w.exercises || []).forEach((ex) => {
            const name = normalizeExerciseName(
              ex.name || ex.originalName || "Unnamed"
            );

            const muscleGroup = ex.muscleGroup || getExerciseMuscleGroup(name);

            if (!exMap[name]) {
              exMap[name] = {
                name,
                sessions: 0,
                totalReps: 0,
                totalWeight: 0,
                muscleGroup,
              };
            }

            exMap[name].sessions += 1;
            dayMap[dateKey].exercises += 1;

            if (!muscleMap[muscleGroup]) {
              muscleMap[muscleGroup] = 0;
            }

            (ex.sets || []).forEach((s) => {
              const reps = Number(s.reps) || 0;
              const weightRaw = String(s.weight || "0").toLowerCase();

              const weight =
                weightRaw.includes("body") || weightRaw.includes("/")
                  ? 0
                  : Number(weightRaw) || 0;

              const volume = reps * weight;

              exMap[name].totalReps += reps;
              exMap[name].totalWeight += volume;

              dayMap[dateKey].reps += reps;
              dayMap[dateKey].volume += volume;

              muscleMap[muscleGroup] += volume;

              totalReps += reps;
              totalVolume += volume;
            });
          });
        });

        setSummary({
          totalWorkouts: workouts.length,
          exercises: exMap,
          timeline: Object.values(dayMap).reverse(),
          muscleGroups: muscleMap,
          totalVolume,
          totalReps,
        });
      } catch (e) {
        console.error("Analytics error:", e);
      }

      setLoading(false);
    }

    calc();
  }, [user]);

  const topExercises = useMemo(() => {
    return Object.values(summary.exercises)
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 10);
  }, [summary.exercises]);

  const volumeExercises = useMemo(() => {
    return Object.values(summary.exercises)
      .filter((ex) => ex.totalWeight > 0)
      .sort((a, b) => b.totalWeight - a.totalWeight)
      .slice(0, 8);
  }, [summary.exercises]);

  const muscleData = useMemo(() => {
    return Object.entries(summary.muscleGroups)
      .filter(([, value]) => value > 0)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [summary.muscleGroups]);

  if (!user) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
        Please sign in to view analytics.
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/10 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-300">
              Performance Analytics
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white sm:text-3xl">
              Training Insights
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Exercise names are normalized, so wrong spellings are grouped
              correctly.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-200">
            {summary.totalWorkouts} workouts logged
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
          Loading...
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Dumbbell} title="Total Workouts" value={summary.totalWorkouts} />
            <StatCard icon={Activity} title="Total Reps" value={summary.totalReps.toLocaleString("en-IN")} />
            <StatCard icon={BarChart3} title="Total Volume" value={`${Math.round(summary.totalVolume).toLocaleString("en-IN")} kg`} />
            <StatCard icon={TrendingUp} title="Exercises" value={Object.keys(summary.exercises).length} />
          </div>

          {topExercises.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
              No data available yet.
            </div>
          ) : (
            <>
              <div className="grid gap-4 lg:grid-cols-2">
                <ChartCard title="Volume Trend">
                  {summary.timeline.length > 0 ? (
                    <ResponsiveContainer width="100%" height={260}>
                      <LineChart data={summary.timeline}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.25} />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="volume"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ r: 4, fill: "#3b82f6" }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <EmptyChart />
                  )}
                </ChartCard>

                <ChartCard title="Top Exercises by Sessions">
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={topExercises}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.25} />
                      <XAxis
                        dataKey="name"
                        stroke="#64748b"
                        fontSize={10}
                        interval={0}
                        angle={-18}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="sessions" radius={[10, 10, 0, 0]} fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <ChartCard title="Volume by Exercise">
                  {volumeExercises.length > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={volumeExercises} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.25} />
                        <XAxis type="number" stroke="#64748b" fontSize={11} />
                        <YAxis
                          type="category"
                          dataKey="name"
                          stroke="#64748b"
                          fontSize={10}
                          width={110}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="totalWeight" radius={[0, 10, 10, 0]} fill="#22c55e" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <EmptyChart />
                  )}
                </ChartCard>

                <ChartCard title="Muscle Group Distribution">
                  {muscleData.length > 0 ? (
                    <>
                      <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                          <Pie
                            data={muscleData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={95}
                            innerRadius={55}
                            paddingAngle={3}
                          >
                            {muscleData.map((_, index) => (
                              <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>

                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
                        {muscleData.map((item, index) => (
                          <div
                            key={item.name}
                            className="flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2 text-slate-700 dark:bg-white/5 dark:text-slate-300"
                          >
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{
                                backgroundColor: COLORS[index % COLORS.length],
                              }}
                            />
                            <span className="truncate">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <EmptyChart />
                  )}
                </ChartCard>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">
        <Icon size={21} />
      </div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <p className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10 sm:p-5">
      <h3 className="mb-4 text-lg font-black text-slate-950 dark:text-white">
        {title}
      </h3>
      <div className="h-[280px] w-full min-w-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function EmptyChart() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400">
      Not enough data for this chart.
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-2xl dark:border-white/10 dark:bg-slate-950/95 dark:text-white">
      {label && <p className="mb-1 font-bold text-blue-600 dark:text-blue-300">{label}</p>}
      {payload.map((item, index) => (
        <p key={index}>
          {item.name}:{" "}
          <span className="font-bold">
            {Math.round(Number(item.value || 0)).toLocaleString("en-IN")}
          </span>
        </p>
      ))}
    </div>
  );
}