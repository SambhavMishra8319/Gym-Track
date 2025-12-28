// import React, { useEffect, useState } from "react";
// import { db, logOut } from "../firebase/config";
// import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
// import { updateProfile } from "firebase/auth";

// export default function SettingsPage({ user }) {
//   const [settings, setSettings] = useState({
//     displayName: "",
//     email: "",
//     notifications: true,
//     darkMode: false,
//     workoutReminders: true,
//     metricSystem: true, // true = kg, false = lbs
//     privacyMode: false,
//     autoSaveWorkouts: true,
//   });
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [showNameInput, setShowNameInput] = useState(false);
//   const [newName, setNewName] = useState("");

//   useEffect(() => {
//     if (!user) return;
//     loadSettings();
//   }, [user]);

//   const loadSettings = async () => {
//     try {
//       const docRef = doc(db, "users", user.uid);
//       const snap = await getDoc(docRef);
//       if (snap.exists()) {
//         const userData = snap.data();
//         setSettings({
//           displayName: userData.displayName || user.email.split("@")[0],
//           email: userData.email || user.email,
//           notifications: userData.notifications !== false,
//           darkMode: userData.darkMode || false,
//           workoutReminders: userData.workoutReminders !== false,
//           metricSystem: userData.metricSystem !== false,
//           privacyMode: userData.privacyMode || false,
//           autoSaveWorkouts: userData.autoSaveWorkouts !== false,
//         });
//         setNewName(userData.displayName || user.email.split("@")[0]);
//       }
//     } catch (error) {
//       console.error("Error loading settings:", error);
//     }
//   };

//   const saveSettings = async () => {
//     setSaving(true);
//     try {
//       // Update Firebase Auth profile
//       await updateProfile(user, {
//         displayName: newName,
//       });

//       // Update Firestore user document
//       await updateDoc(doc(db, "users", user.uid), {
//         displayName: newName,
//         notifications: settings.notifications,
//         darkMode: settings.darkMode,
//         workoutReminders: settings.workoutReminders,
//         metricSystem: settings.metricSystem,
//         privacyMode: settings.privacyMode,
//         autoSaveWorkouts: settings.autoSaveWorkouts,
//         updatedAt: new Date().toISOString(),
//       });

//       alert("✅ Settings saved successfully!");
//     } catch (error) {
//       console.error("Error saving settings:", error);
//       alert("❌ Failed to save settings");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const toggleSetting = (key) => {
//     setSettings(prev => ({
//       ...prev,
//       [key]: !prev[key]
//     }));
//   };

//   const resetSettings = () => {
//     setSettings({
//       displayName: user.email.split("@")[0],
//       email: user.email,
//       notifications: true,
//       darkMode: false,
//       workoutReminders: true,
//       metricSystem: true,
//       privacyMode: false,
//       autoSaveWorkouts: true,
//     });
//     setNewName(user.email.split("@")[0]);
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-blue-50">
//         <div className="text-center max-w-md">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in</h2>
//           <p className="text-gray-600">Sign in to access settings.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-12 sm:py-16 md:py-20">
//       <div className="max-w-2xl mx-auto space-y-8 md:space-y-12">
        
//         {/* Header */}
//         <div className="text-center">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-slate-700 bg-clip-text text-transparent mb-4">
//             ⚙️ Settings
//           </h1>
//           <p className="text-xl text-gray-600 bg-white/70 px-6 py-3 rounded-2xl inline-block shadow-lg">
//             Customize your workout experience
//           </p>
//         </div>

//         {/* Profile Section */}
//         <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-6 sm:p-8 border border-white/50">
//           <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-blue-100 pb-4 flex items-center gap-3">
//             👤 Profile
//           </h3>
//           <div className="space-y-6">
//             <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-100">
//               <span className="font-bold text-gray-700 text-lg whitespace-nowrap min-w-[80px]">Name:</span>
//               {showNameInput ? (
//                 <div className="flex-1 flex gap-3 items-center">
//                   <input
//                     type="text"
//                     value={newName}
//                     onChange={(e) => setNewName(e.target.value)}
//                     onBlur={() => setShowNameInput(false)}
//                     className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 font-semibold bg-white shadow-sm text-lg"
//                     autoFocus
//                   />
//                   <button
//                     onClick={() => setShowNameInput(false)}
//                     className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold text-sm transition-all"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex-1 flex items-center justify-between">
//                   <span className="text-2xl font-black text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent px-4 py-2">
//                     {settings.displayName}
//                   </span>
//                   <button
//                     onClick={() => {
//                       setShowNameInput(true);
//                       setNewName(settings.displayName);
//                     }}
//                     className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
//                   >
//                     ✏️ Edit
//                   </button>
//                 </div>
//               )}
//             </div>
//             <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-100">
//               <div className="flex items-center justify-between">
//                 <span className="font-bold text-gray-700 text-lg">Email</span>
//                 <span className="bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-xl font-mono text-sm font-semibold text-emerald-800">
//                   {settings.email}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Preferences Section */}
//         <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-6 sm:p-8 border border-white/50">
//           <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-purple-100 pb-4 flex items-center gap-3">
//             🎯 Preferences
//           </h3>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:border-purple-200 transition-all">
//               <div>
//                 <div className="font-bold text-gray-800 text-lg">Push Notifications</div>
//                 <p className="text-sm text-gray-600">Get workout reminders and progress updates</p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={settings.notifications}
//                   onChange={() => toggleSetting("notifications")}
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//               </label>
//             </div>

//             <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 hover:border-indigo-200 transition-all">
//               <div>
//                 <div className="font-bold text-gray-800 text-lg">Dark Mode</div>
//                 <p className="text-sm text-gray-600">Enable dark theme for better night viewing</p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={settings.darkMode}
//                   onChange={() => toggleSetting("darkMode")}
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
//               </label>
//             </div>

//             <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100 hover:border-emerald-200 transition-all">
//               <div>
//                 <div className="font-bold text-gray-800 text-lg">Workout Reminders</div>
//                 <p className="text-sm text-gray-600">Daily notifications for consistent training</p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={settings.workoutReminders}
//                   onChange={() => toggleSetting("workoutReminders")}
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
//               </label>
//             </div>

//             <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100 hover:border-orange-200 transition-all">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="font-bold text-gray-800 text-lg">Units</div>
//                   <p className="text-sm text-gray-600">Weight measurement system</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setSettings(prev => ({ ...prev, metricSystem: true }))}
//                     className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
//                       settings.metricSystem
//                         ? "bg-orange-500 text-white shadow-lg shadow-orange-300"
//                         : "bg-orange-100 hover:bg-orange-200 text-orange-800"
//                     }`}
//                   >
//                     KG
//                   </button>
//                   <button
//                     onClick={() => setSettings(prev => ({ ...prev, metricSystem: false }))}
//                     className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
//                       !settings.metricSystem
//                         ? "bg-orange-500 text-white shadow-lg shadow-orange-300"
//                         : "bg-orange-100 hover:bg-orange-200 text-orange-800"
//                     }`}
//                   >
//                     LBS
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Privacy & Advanced */}
//         <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-6 sm:p-8 border border-white/50">
//           <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b-2 border-red-100 pb-4 flex items-center gap-3">
//             🔒 Privacy & Advanced
//           </h3>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between p-4 bg-gradient-to-r from-rose-50 to-red-50 rounded-xl border border-rose-100 hover:border-rose-200 transition-all">
//               <div>
//                 <div className="font-bold text-gray-800 text-lg">Privacy Mode</div>
//                 <p className="text-sm text-gray-600">Hide workout stats from social features</p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={settings.privacyMode}
//                   onChange={() => toggleSetting("privacyMode")}
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
//               </label>
//             </div>

//             <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all">
//               <div>
//                 <div className="font-bold text-gray-800 text-lg">Auto-save Workouts</div>
//                 <p className="text-sm text-gray-600">Automatically save workouts as you log</p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={settings.autoSaveWorkouts}
//                   onChange={() => toggleSetting("autoSaveWorkouts")}
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t-2 border-gray-200 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
//           <button
//             onClick={saveSettings}
//             disabled={saving}
//             className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
//           >
//             {saving ? "⏳ Saving..." : "💾 Save All Changes"}
//           </button>
//           <button
//             onClick={resetSettings}
//             className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
//           >
//             🔄 Reset Defaults
//           </button>
//         </div>

//         {/* Danger Zone */}
//         <div className="bg-gradient-to-r from-rose-50 to-red-50 border-2 border-rose-200 rounded-3xl p-8 text-center">
//           <h3 className="text-2xl font-bold text-rose-800 mb-4 flex items-center justify-center gap-3 mx-auto">
//             ⚠️ Danger Zone
//           </h3>
//           <button
//             onClick={logOut}
//             className="w-full max-w-md mx-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
//           >
//             🚪 Sign Out
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
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
