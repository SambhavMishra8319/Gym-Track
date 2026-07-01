import React, { useEffect, useMemo, useState } from "react";
import { addWellnessEntry, deleteWellnessEntry, getWellnessEntries } from "../firebase/wellness";

const today = () => new Date().toISOString().slice(0, 10);
const initialForm = { date: today(), mood: "Good", sleep: "", water: "", stress: "Medium", journal: "" };

export default function MindTracker({ user }) {
  const [form, setForm] = useState(initialForm);
  const [entries, setEntries] = useState([]);

  const load = async () => {
    if (!user) return;
    setEntries(await getWellnessEntries(user.uid, "mindLogs"));
  };
  useEffect(() => { load(); }, [user]);

  const avgSleep = useMemo(() => {
    const values = entries.map((e) => Number(e.sleep)).filter(Boolean);
    return values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) : "-";
  }, [entries]);

  const save = async (e) => {
    e.preventDefault();
    if (!user) return;
    await addWellnessEntry(user.uid, "mindLogs", form);
    setForm(initialForm);
    load();
  };

  return (
    <div className="space-y-6">
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
        <p className="text-sm text-blue-600 font-semibold">Tracksy mind tracker added</p>
        <h1 className="text-2xl font-bold">Mind & Recovery</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Log mood, sleep, hydration, stress and daily journal notes.</p>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow"><div className="text-xs text-gray-500">Logs</div><div className="text-2xl font-bold">{entries.length}</div></div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow"><div className="text-xs text-gray-500">Avg Sleep</div><div className="text-2xl font-bold">{avgSleep}h</div></div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow"><div className="text-xs text-gray-500">Latest Mood</div><div className="text-2xl font-bold">{entries[0]?.mood || "-"}</div></div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow"><div className="text-xs text-gray-500">Latest Stress</div><div className="text-2xl font-bold">{entries[0]?.stress || "-"}</div></div>
      </section>

      <form onSubmit={save} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="text-sm font-medium">Date<input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1 w-full rounded-lg border p-2 dark:bg-gray-900 dark:border-gray-700" /></label>
        <label className="text-sm font-medium">Mood<select value={form.mood} onChange={(e) => setForm({ ...form, mood: e.target.value })} className="mt-1 w-full rounded-lg border p-2 dark:bg-gray-900 dark:border-gray-700"><option>Excellent</option><option>Good</option><option>Okay</option><option>Low</option></select></label>
        <label className="text-sm font-medium">Sleep hours<input type="number" step="0.1" value={form.sleep} onChange={(e) => setForm({ ...form, sleep: e.target.value })} className="mt-1 w-full rounded-lg border p-2 dark:bg-gray-900 dark:border-gray-700" /></label>
        <label className="text-sm font-medium">Water glasses<input type="number" value={form.water} onChange={(e) => setForm({ ...form, water: e.target.value })} className="mt-1 w-full rounded-lg border p-2 dark:bg-gray-900 dark:border-gray-700" /></label>
        <label className="text-sm font-medium">Stress<select value={form.stress} onChange={(e) => setForm({ ...form, stress: e.target.value })} className="mt-1 w-full rounded-lg border p-2 dark:bg-gray-900 dark:border-gray-700"><option>Low</option><option>Medium</option><option>High</option></select></label>
        <label className="md:col-span-2 text-sm font-medium">Journal<textarea value={form.journal} onChange={(e) => setForm({ ...form, journal: e.target.value })} className="mt-1 w-full rounded-lg border p-2 dark:bg-gray-900 dark:border-gray-700" /></label>
        <button className="md:col-span-2 bg-blue-600 text-white rounded-lg py-2 font-semibold">Save Mind Log</button>
      </form>

      <section className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex justify-between gap-3">
            <div><div className="font-semibold">{entry.date} • {entry.mood}</div><div className="text-sm text-gray-600 dark:text-gray-300">Sleep {entry.sleep || "-"}h • Water {entry.water || "-"} glasses • Stress {entry.stress}</div>{entry.journal && <p className="text-sm mt-2">{entry.journal}</p>}</div>
            <button onClick={async () => { await deleteWellnessEntry(user.uid, "mindLogs", entry.id); load(); }} className="text-red-600 text-sm">Delete</button>
          </div>
        ))}
      </section>
    </div>
  );
}
