import React, { useEffect, useState } from "react";
import { getUserAchievements } from "../firebase/users";

export default function AchievementsPage({ user }) {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    async function load() {
      if (!user) return;
      const data = await getUserAchievements(user.uid);
      setAchievements(data);
    }
    load();
  }, [user]);

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.length === 0 && <p>No achievements yet.</p>}
        {achievements.map((a, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow text-center">
            <div className="text-4xl mb-2">{a.emoji || "🏅"}</div>
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-sm text-gray-500">{a.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
