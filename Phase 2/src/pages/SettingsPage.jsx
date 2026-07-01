
// src/pages/SettingsPage.jsx - FULL SETTINGS (copy entire)
import React, { useState, useEffect } from "react";
import { db, logOut } from "../firebase/config";
import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from "firebase/firestore";

export default function SettingsPage({ user }) {
  const [settings, setSettings] = useState({
    weightUnit: "kg",
    height: "",
    goal: "build muscle",
    notifications: true,
    darkMode: false,
    measurementSystem: "metric"
  });
  const [loading, setLoading] = useState(false);
  const [deletingData, setDeletingData] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadSettings();
  }, [user]);

  const loadSettings = async () => {
    try {
      const docRef = doc(db, "users", user.uid, "settings", "preferences");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setSettings(snap.data());
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const saveSettings = async (newSettings) => {
    setLoading(true);
    try {
      await setDoc(doc(db, "users", user.uid, "settings", "preferences"), newSettings);
      setSettings(newSettings);
      alert("✅ Settings saved!");
    } catch (error) {
      alert("❌ Save failed");
      console.error(error);
    }
    setLoading(false);
  };

  const deleteAllData = async () => {
    if (!window.confirm("⚠️ Delete ALL your data? Workouts, templates, weights - EVERYTHING!")) return;
    if (!window.confirm("🔥 REALLY delete everything? This cannot be undone!")) return;

    setDeletingData(true);
    try {
      // Delete workouts
      const workoutsSnap = await getDocs(collection(db, "users", user.uid, "workouts"));
      const batch = writeBatch(db);
      workoutsSnap.docs.forEach(doc => batch.delete(doc.ref));
      await batch.commit();

      // Delete templates
      const templatesSnap = await getDocs(collection(db, "users", user.uid, "templates"));
      const batch2 = writeBatch(db);
      templatesSnap.docs.forEach(doc => batch2.delete(doc.ref));
      await batch2.commit();

      // Delete weights
      const weightsSnap = await getDocs(collection(db, "users", user.uid, "weights"));
      const batch3 = writeBatch(db);
      weightsSnap.docs.forEach(doc => batch3.delete(doc.ref));
      await batch3.commit();

      alert("🗑️ All data deleted! Profile reset.");
      window.location.reload();
    } catch (error) {
      alert("❌ Delete failed");
      console.error(error);
    }
    setDeletingData(false);
  };

  if (!user) {
    return (
      <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-4">
            ⚙️ Settings
          </h1>
          <p className="text-xl text-gray-600">Customize your gym experience</p>
        </div>

        {/* UNITS */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 mb-8 border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4 flex items-center gap-3">
            📏 Units & Measurements
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Weight Unit</label>
              <select
                value={settings.weightUnit}
                onChange={(e) => saveSettings({ ...settings, weightUnit: e.target.value })}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg font-semibold"
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="lbs">Pounds (lbs)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Height (optional)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  placeholder="175"
                  value={settings.height}
                  onChange={(e) => saveSettings({ ...settings, height: e.target.value })}
                  className="flex-1 p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-lg"
                />
                <select
                  value={settings.measurementSystem}
                  onChange={(e) => saveSettings({ ...settings, measurementSystem: e.target.value })}
                  className="w-24 p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500"
                >
                  <option value="metric">cm</option>
                  <option value="imperial">ft/in</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* GOALS */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 mb-8 border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4 flex items-center gap-3">
            🎯 Training Goal
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { value: "build muscle", label: "💪 Build Muscle", icon: "💪" },
              { value: "lose fat", label: "🔥 Lose Fat", icon: "🔥" },
              { value: "strength", label: "⚡ Strength", icon: "⚡" },
              { value: "endurance", label: "🏃 Endurance", icon: "🏃" }
            ].map((goal) => (
              <button
                key={goal.value}
                onClick={() => saveSettings({ ...settings, goal: goal.value })}
                className={`p-6 rounded-2xl border-4 transition-all text-left hover:shadow-xl hover:scale-[1.02] flex items-center gap-4 ${
                  settings.goal === goal.value
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-400 shadow-2xl scale-[1.02]"
                    : "bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <span className="text-3xl">{goal.icon}</span>
                <div>
                  <div className="font-bold text-lg">{goal.label}</div>
                  <div className="text-sm opacity-80">{goal.value}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* NOTIFICATIONS & APPEARANCE */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 mb-8 border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">🔔 Notifications & Display</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-all">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => saveSettings({ ...settings, notifications: e.target.checked })}
                className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
              />
              <div>
                <div className="font-semibold text-lg">Workout Reminders</div>
                <div className="text-sm text-gray-600">Push notifications for scheduled workouts</div>
              </div>
            </label>
            <label className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-all">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => saveSettings({ ...settings, darkMode: e.target.checked })}
                className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
              />
              <div>
                <div className="font-semibold text-lg">Dark Mode</div>
                <div className="text-sm text-gray-600">Eye-friendly dark theme</div>
              </div>
            </label>
          </div>
        </div>

        {/* DANGER ZONE
        <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-red-800 border-b border-red-300 pb-4 flex items-center gap-3">
            ☠️ Danger Zone
          </h3>
          <div className="space-y-4">
            {/* <button
              onClick={deleteAllData}
              disabled={deletingData}
              className="w-full bg-red-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:bg-red-700 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
            >
              {deletingData ? "🔥 Deleting..." : "🗑️ Delete All Data"}
              <span className="text-sm font-normal">(Workouts, Templates, Weights)</span>
            </button> */}
            {/* <p className="text-sm text-red-700 text-center bg-red-100 p-4 rounded-xl">
              ⚠️ This deletes EVERYTHING permanently. Cannot be undone.
            </p>
          </div>
        </div> */} 

        {/* SIGN OUT */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-12 border-t-2 border-gray-200 bg-white rounded-3xl p-8 shadow-xl">
          <button
            onClick={logOut}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-3"
          >
            🚪 Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
