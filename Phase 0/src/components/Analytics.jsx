import React, { useEffect, useState } from "react";
import { workoutsCollection } from "../firebase/config";
import { query, orderBy, getDocs } from "firebase/firestore";

export default function Analytics({ user }) {
  const [summary, setSummary] = useState({
    totalWorkouts: 0,
    exercises: {},
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
        workouts.forEach((w) => {
          (w.exercises || []).forEach((ex) => {
            const name = (ex.name || "unnamed").toLowerCase();
            if (!exMap[name]) {
              exMap[name] = {
                sessions: 0,
                totalReps: 0,
                totalWeight: 0,
              };
            }
            exMap[name].sessions += 1;
            (ex.sets || []).forEach((s) => {
              const reps = Number(s.reps) || 0;
              const weight = Number(s.weight) || 0;
              exMap[name].totalReps += reps;
              exMap[name].totalWeight += reps * weight;
            });
          });
        });
        setSummary({ totalWorkouts: workouts.length, exercises: exMap });
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    calc();
  }, [user]);

  if (!user)
    return (
      <div className="pt-4 text-sm md:text-base">
        Please sign in to view analytics.
      </div>
    );

  return (
    <div className="pt-2">
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="space-y-3">
          <div className="mb-2">
            Total workouts:{" "}
            <strong>{summary.totalWorkouts}</strong>
          </div>

          <h3 className="font-medium mb-1">Top Exercises</h3>
          {Object.keys(summary.exercises).length === 0 && (
            <div className="text-sm text-gray-500">
              No data available yet.
            </div>
          )}

          <div className="space-y-2">
            {Object.entries(summary.exercises)
              .sort((a, b) => b[1].sessions - a[1].sessions)
              .slice(0, 10)
              .map(([name, data]) => (
                <div
                  key={name}
                  className="border p-2 rounded text-sm bg-white"
                >
                  <div className="capitalize font-medium">
                    {name}
                  </div>
                  <div>{data.sessions} sessions</div>
                  <div>Total reps: {data.totalReps}</div>
                  <div>Total volume: {data.totalWeight} kg</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
