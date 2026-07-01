import React, { useEffect, useState } from "react";
import { addWellnessEntry, deleteWellnessEntry, getWellnessEntries } from "../firebase/wellness";

const today = () => new Date().toISOString().slice(0, 10);
const initialForm = { date: today(), weight: "", chest: "", waist: "", arms: "", bodyFat: "", note: "" };

export default function BodyTracker({ user }) {
  const [form, setForm] = useState(initialForm);
  const [entries, setEntries] = useState([]);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!user) return;
    setEntries(await getWellnessEntries(user.uid, "bodyMetrics"));
  };

  useEffect(() => { load(); }, [user]);

  const save = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    await addWellnessEntry(user.uid, "bodyMetrics", form);
    setForm(initialForm);
    await load();
    setSaving(false);
  };

  const latest = entries[0];

  return (
    <div className="space-y-6">
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
        <p className="text-sm text-blue-600 font-semibold">Tracksy body tracker added</p>
        <h1 className="text-2xl font-bold">Body Metrics</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Track weight, waist, chest, arms, body fat and progress notes.</p>
      </section>

      {latest && (
        <section className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[["Weight", latest.weight, "kg"], ["Chest", latest.chest, "cm"], ["Waist", latest.waist, "cm"], ["Arms", latest.arms, "cm"], ["Body Fat", latest.bodyFat, "%"]].map(([label, value, unit]) => (
            <div key={label} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
              <div className="text-xs text-gray-500">{label}</div>
              <div className="text-xl font-bold">{value || "-"} <span className="text-sm font-normal">{value ? unit : ""}</span></div>
            </div>
          ))}
        </section>
      )}

      <form onSubmit={save} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          ["date", "Date", "date"], ["weight", "Weight kg", "number"], ["chest", "Chest cm", "number"], ["waist", "Waist cm", "number"], ["arms", "Arms cm", "number"], ["bodyFat", "Body Fat %", "number"],
        ].map(([name, label, type]) => (
          <label key={name} className="text-sm font-medium">{label}
            <input type={type} step="0.1" value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} className="mt-1 w-full rounded-lg border p-2 dark:bg-gray-900 dark:border-gray-700" />
          </label>
        ))}
        <label className="md:col-span-3 text-sm font-medium">Note
          <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="mt-1 w-full rounded-lg border p-2 dark:bg-gray-900 dark:border-gray-700" />
        </label>
        <button disabled={saving} className="md:col-span-3 bg-blue-600 text-white rounded-lg py-2 font-semibold">{saving ? "Saving..." : "Save Body Entry"}</button>
      </form>

      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
        <h2 className="text-xl font-bold mb-3">History</h2>
        <div className="space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="border dark:border-gray-700 rounded-xl p-3 flex justify-between gap-3">
              <div>
                <div className="font-semibold">{entry.date}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Weight {entry.weight || "-"} kg • Waist {entry.waist || "-"} cm • Body fat {entry.bodyFat || "-"}%</div>
                {entry.note && <div className="text-sm mt-1">{entry.note}</div>}
              </div>
              <button onClick={async () => { await deleteWellnessEntry(user.uid, "bodyMetrics", entry.id); load(); }} className="text-red-600 text-sm">Delete</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
