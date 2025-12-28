// import React, { useEffect, useState } from "react";
// import { getWorkouts } from "../firebase/exercises";
// // import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
// import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

// export default function Charts({ user }) {
//   const [workouts, setWorkouts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) return;

//     const fetchWorkouts = async () => {
//       try {
//         const data = await getWorkouts(user.uid);
//         setWorkouts(data);
//       } catch (err) {
//         console.error("Error fetching workouts:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWorkouts();
//   }, [user]);

//   if (!user) return <p>Please sign in to see your charts.</p>;
//   if (loading) return <p>Loading charts...</p>;
//   if (!workouts.length) return <p>No workouts found.</p>;

//   // Prepare chart data per exercise
//   const chartData = {};
//   workouts.forEach((workout) => {
//     workout.exercises.forEach((ex) => {
//       if (!chartData[ex.name]) chartData[ex.name] = [];
//       ex.sets.forEach((set, idx) => {
//         chartData[ex.name].push({
//           set: idx + 1,
//           weight: Number(set.weight) || 0,
//           reps: Number(set.reps) || 0,
//         });
//       });
//     });
//   });

//   return (
//     <div className="space-y-6">
//       {Object.keys(chartData).map((exName) => (
//         // <div key={exName} className="bg-white p-4 rounded shadow">
//         //   <h3 className="font-semibold mb-2">{exName} Progress</h3>
//         //   <LineChart
//         //     width={600}
//         //     height={250}
//         //     data={chartData[exName]}
//         //     margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
//         //   >
//         //     <XAxis dataKey="set" label={{ value: "Set", position: "insideBottomRight", offset: -5 }} />
//         //     <YAxis label={{ value: "Weight (kg)", angle: -90, position: "insideLeft" }} />
//         //     <Tooltip />
//         //     <Legend />
//         //     <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//         //     <Line type="monotone" dataKey="weight" stroke="#3b82f6" />
//         //   </LineChart>
//         // </div>
//         <div className="bg-white p-4 rounded shadow">
//   <h3 className="font-semibold mb-2">{exName} Progress</h3>
//   <div style={{ width: "100%", height: 280 }}>
//     <ResponsiveContainer width="100%" height="100%">
//       <LineChart data={chartData[exName]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
//         <XAxis dataKey="set" label={{ value: "Set", position: "insideBottomRight", offset: -5 }} />
//         <YAxis label={{ value: "Weight (kg)", angle: -90, position: "insideLeft" }} />
//         <Tooltip />
//         <Legend />
//         <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//         <Line type="monotone" dataKey="weight" stroke="#3b82f6" />
//       </LineChart>
//     </ResponsiveContainer>
//   </div>
// </div>

//       ))}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { getWorkouts } from "../firebase/exercises";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export default function Charts({ user }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchWorkouts = async () => {
      try {
        const data = await getWorkouts(user.uid);
        setWorkouts(data);
      } catch (err) {
        console.error("Error fetching workouts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [user]);

  if (!user) return <p>Please sign in to see your charts.</p>;
  if (loading) return <p>Loading charts...</p>;
  if (!workouts.length) return <p>No workouts found.</p>;

  const chartData = {};
  workouts.forEach((workout) => {
    (workout.exercises || []).forEach((ex) => {
      if (!chartData[ex.name]) chartData[ex.name] = [];
      (ex.sets || []).forEach((set, idx) => {
        chartData[ex.name].push({
          set: idx + 1,
          weight: Number(set.weight) || 0,
          reps: Number(set.reps) || 0,
        });
      });
    });
  });

  return (
    <div className="space-y-6">
      {Object.keys(chartData).map((exName) => (
        <div
          key={exName}
          className="bg-white p-4 rounded shadow"
        >
          <h3 className="font-semibold mb-2">
            {exName} Progress
          </h3>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData[exName]}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <XAxis
                  dataKey="set"
                  label={{
                    value: "Set",
                    position: "insideBottomRight",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: "Weight (kg)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <CartesianGrid
                  stroke="#ccc"
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#3b82f6"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}
