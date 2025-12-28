
// src/pages/Templates.jsx
import React, { useEffect, useState } from "react";
import { getTemplates, deleteTemplate, addTemplate } from "../firebase/templates";
import { defaultTemplates } from "../data/defaultTemplates";
import { useNavigate } from "react-router-dom";
import AddWorkout from "./AddWorkout";

export default function Templates({ user }) {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const navigate = useNavigate();

  async function load() {
    if (!user) {
      setTemplates(defaultTemplates);
      setLoading(false);
      return;
    }
    try {
      const saved = await getTemplates(user.uid);
      setTemplates([...defaultTemplates, ...saved]);
    } catch (error) {
      console.error("Error loading templates:", error);
      setTemplates(defaultTemplates);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [user]);

  function useTemplate(template) {
    navigate("/add", { state: { template } });
  }

  const handleSaveTemplate = async (workoutData) => {
    if (!user) return;
    try {
      const templateData = {
        name: `My Template ${new Date().toLocaleDateString()}`,
        exercises: workoutData.exercises,
        createdAt: new Date().toISOString()
      };
      await addTemplate(user.uid, templateData);
      await load();
      setShowNewTemplate(false);
      alert("✅ Template saved!");
    } catch (err) {
      alert("Error saving template");
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center pt-16 pb-24">
        <p className="text-gray-600 text-lg">Loading templates...</p>
      </div>
    );

  return (
    <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">
            🏋️ Workout Templates
          </h2>
          {user && (
            <button
              onClick={() => setShowNewTemplate(true)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-lg transition-all"
            >
              ➕ New Template
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {templates.map((t, i) => (
            <div
              key={i}
              className="
                bg-white p-6 rounded-2xl shadow-md border border-gray-200
                hover:shadow-lg hover:-translate-y-1 transition-all duration-200
              "
            >
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {t.name}
              </h3>

              <div className="mb-4">
                <p className="text-gray-600 font-medium mb-1">Exercises:</p>
                <ul className="list-disc ml-6 text-gray-700 space-y-1 text-sm">
                  {t.exercises.slice(0, 5).map((ex, idx) => (
                    <li key={idx}>{ex.name}</li>
                  ))}
                  {t.exercises.length > 5 && (
                    <li>...</li>
                  )}
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => useTemplate(t)}
                  className="
                    flex-1 px-4 py-2 rounded-lg bg-blue-600 
                    text-white font-medium hover:bg-blue-700 
                    transition shadow-sm
                  "
                >
                  🚀 Use Template
                </button>

                {t.id && user && (
                  <button
                    onClick={async () => {
                      if (confirm("Delete this template?")) {
                        await deleteTemplate(user.uid, t.id);
                        load();
                      }
                    }}
                    className="
                      px-4 py-2 rounded-lg bg-red-500 
                      text-white font-medium hover:bg-red-600 
                      transition shadow-sm
                    "
                  >
                    🗑️ Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 👇 NEW TEMPLATE MODAL */}
      {showNewTemplate && user && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">➕ Create New Template</h2>
              <button
                onClick={() => setShowNewTemplate(false)}
                className="text-2xl font-bold text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-200"
              >
                ×
              </button>
            </div>
            <AddWorkout
              user={user}
              onClose={() => setShowNewTemplate(false)}
              onSave={handleSaveTemplate}
            />
          </div>
        </div>
      )}
    </div>
  );
}
