import React, { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format } from "date-fns";
import { addWeight, getWeights, deleteWeight, updateWeight } from "../firebase/weightTracking";
import { addWellnessEntry, deleteWellnessEntry, getWellnessEntries } from "../firebase/wellness";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const today = () => new Date().toISOString().slice(0, 10);
const bodyInitial = { date: today(), chest: "", waist: "", arms: "", bodyFat: "", note: "" };

export default function BodyProgress({ user }) {
  const [weights, setWeights] = useState([]);
  const [weightForm, setWeightForm] = useState({ date: today(), weight: "" });
  const [editingWeightId, setEditingWeightId] = useState(null);
  const [bodyForm, setBodyForm] = useState(bodyInitial);
  const [bodyEntries, setBodyEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    if (!user) return;
    setLoading(true);
    const [weightData, metricData] = await Promise.all([
      getWeights(user.uid),
      getWellnessEntries(user.uid, "bodyMetrics"),
    ]);
    setWeights(weightData.sort((a, b) => new Date(a.date) - new Date(b.date)));
    setBodyEntries(metricData);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, [user]);

  const latestWeight = weights[weights.length - 1];
  const latestBody = bodyEntries[0];

  const chartData = useMemo(
    () => ({
      labels: weights.map((item) => format(new Date(item.date), "MMM dd")),
      datasets: [
        {
          label: "Body Weight (kg)",
          data: weights.map((item) => item.weight),
          tension: 0.4,
          fill: true,
        },
      ],
    }),
    [weights]
  );

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Body Weight Progress" },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: { callback: (value) => `${value}kg` },
      },
    },
  };

  async function saveWeight() {
    if (!user || !weightForm.weight) return;
    const payload = {
      date: weightForm.date,
      weight: parseFloat(weightForm.weight),
      updatedAt: new Date().toISOString(),
    };
    if (editingWeightId) {
      await updateWeight(user.uid, editingWeightId, payload);
    } else {
      await addWeight(user.uid, { ...payload, createdAt: new Date().toISOString() });
    }
    setWeightForm({ date: today(), weight: "" });
    setEditingWeightId(null);
    await loadAll();
  }

  async function saveBodyMetrics(event) {
    event.preventDefault();
    if (!user) return;
    await addWellnessEntry(user.uid, "bodyMetrics", bodyForm);
    setBodyForm(bodyInitial);
    await loadAll();
  }

  if (loading) return <div className="p-8 text-center">Loading progress...</div>;

  return (
    <div className="space-y-8 pb-24">
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <p className="text-sm font-semibold text-blue-600">Progress tracking</p>
        <h1 className="text-3xl font-bold">Body Progress</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Body weight and body measurements are now in one clean section.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5 md:gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <p className="text-xs text-gray-500">Current Weight</p>
          <p className="text-2xl font-bold">{latestWeight ? `${latestWeight.weight} kg` : "-"}</p>
        </div>
        {[
          ["Chest", latestBody?.chest, "cm"],
          ["Waist", latestBody?.waist, "cm"],
          ["Arms", latestBody?.arms, "cm"],
          ["Body Fat", latestBody?.bodyFat, "%"],
        ].map(([label, value, unit]) => (
          <div key={label} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-2xl font-bold">{value ? `${value} ${unit}` : "-"}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-5">Body Weight</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-end">
            <label className="text-sm font-medium">
              Date
              <input
                type="date"
                value={weightForm.date}
                onChange={(e) => setWeightForm({ ...weightForm, date: e.target.value })}
                max={today()}
                className="mt-1 w-full rounded-lg border p-3 dark:bg-gray-900 dark:border-gray-700"
              />
            </label>
            <label className="text-sm font-medium">
              Weight kg
              <input
                type="number"
                step="0.1"
                value={weightForm.weight}
                onChange={(e) => setWeightForm({ ...weightForm, weight: e.target.value })}
                placeholder="70.5"
                className="mt-1 w-full rounded-lg border p-3 dark:bg-gray-900 dark:border-gray-700"
              />
            </label>
            <button
              onClick={saveWeight}
              disabled={!weightForm.weight}
              className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50"
            >
              {editingWeightId ? "Update" : "Save"}
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {weights.slice(-6).reverse().map((entry) => (
              <div key={entry.id} className="flex justify-between items-center rounded-xl bg-gray-50 dark:bg-gray-900 p-3">
                <div>
                  <p className="font-bold">{entry.weight} kg</p>
                  <p className="text-sm text-gray-500">{format(new Date(entry.date), "MMM dd, yyyy")}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setWeightForm({ date: entry.date, weight: entry.weight.toString() });
                      setEditingWeightId(entry.id);
                    }}
                    className="text-blue-600 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm("Delete this weight?")) {
                        await deleteWeight(user.uid, entry.id);
                        loadAll();
                      }
                    }}
                    className="text-red-600 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {weights.length === 0 && <p className="text-gray-500 text-center py-6">No weight entries yet.</p>}
          </div>
        </div>

        <form onSubmit={saveBodyMetrics} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-5">Measurements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ["date", "Date", "date"],
              ["chest", "Chest cm", "number"],
              ["waist", "Waist cm", "number"],
              ["arms", "Arms cm", "number"],
              ["bodyFat", "Body Fat %", "number"],
            ].map(([name, label, type]) => (
              <label key={name} className="text-sm font-medium">
                {label}
                <input
                  type={type}
                  step="0.1"
                  value={bodyForm[name]}
                  onChange={(e) => setBodyForm({ ...bodyForm, [name]: e.target.value })}
                  className="mt-1 w-full rounded-lg border p-3 dark:bg-gray-900 dark:border-gray-700"
                />
              </label>
            ))}
            <label className="sm:col-span-2 text-sm font-medium">
              Note
              <textarea
                value={bodyForm.note}
                onChange={(e) => setBodyForm({ ...bodyForm, note: e.target.value })}
                className="mt-1 w-full rounded-lg border p-3 dark:bg-gray-900 dark:border-gray-700"
              />
            </label>
          </div>
          <button className="mt-4 w-full bg-green-600 text-white rounded-lg py-3 font-semibold">
            Save Measurements
          </button>
        </form>
      </section>

      {weights.length > 1 && (
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <Line data={chartData} options={chartOptions} />
        </section>
      )}

      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Measurement History</h2>
        <div className="space-y-3">
          {bodyEntries.map((entry) => (
            <div key={entry.id} className="flex flex-col gap-3 rounded-xl border p-4 dark:border-gray-700 sm:flex-row sm:justify-between">
              <div>
                <p className="font-semibold">{entry.date}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Chest {entry.chest || "-"} cm • Waist {entry.waist || "-"} cm • Arms {entry.arms || "-"} cm • Body fat {entry.bodyFat || "-"}%
                </p>
                {entry.note && <p className="text-sm mt-1">{entry.note}</p>}
              </div>
              <button
                onClick={async () => {
                  await deleteWellnessEntry(user.uid, "bodyMetrics", entry.id);
                  loadAll();
                }}
                className="text-red-600 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          ))}
          {bodyEntries.length === 0 && <p className="text-gray-500 text-center py-6">No measurement entries yet.</p>}
        </div>
      </section>
    </div>
  );
}
