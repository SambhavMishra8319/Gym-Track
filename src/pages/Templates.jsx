// import React, { useEffect, useState } from "react";
// import { getTemplates, addTemplate, deleteTemplate } from "../firebase/templates";
// import { defaultTemplates } from "../data/defaultTemplates";
// import { useNavigate } from "react-router-dom";

// export default function Templates({ user }) {
//   const [templates, setTemplates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   async function load() {
//     const saved = await getTemplates(user.uid);
//     setTemplates([...defaultTemplates, ...saved]);
//     setLoading(false);
//   }

//   useEffect(() => {
//     if (user) load();
//   }, [user]);

//   function useTemplate(template) {
//     navigate("/add", { state: { template } });
//   }

//   if (loading) return <p>Loading templates...</p>;

//   return (
//     <div className="p-8">
//       <h2 className="text-3xl font-semibold mb-6">Workout Templates</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {templates.map((t, i) => (
//           <div key={i} className="bg-white p-6 rounded-xl shadow">
//             <h3 className="text-xl font-bold mb-2">{t.name}</h3>

//             <ul className="list-disc ml-6 text-gray-700">
//               {t.exercises.map((ex, idx) => (
//                 <li key={idx}>{ex.name}</li>
//               ))}
//             </ul>

//             <div className="mt-4 flex gap-3">
//               <button
//                 onClick={() => useTemplate(t)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Use Template
//               </button>

//               {t.id && (
//                 <button
//                   onClick={async () => {
//                     await deleteTemplate(user.uid, t.id);
//                     load();
//                   }}
//                   className="px-3 py-2 bg-red-500 text-white rounded"
//                 >
//                   Delete
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { getTemplates, deleteTemplate } from "../firebase/templates";
import { defaultTemplates } from "../data/defaultTemplates";
import { useNavigate } from "react-router-dom";

export default function Templates({ user }) {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function load() {
    const saved = await getTemplates(user.uid);
    setTemplates([...defaultTemplates, ...saved]);
    setLoading(false);
  }

  useEffect(() => {
    if (user) load();
  }, [user]);

  function useTemplate(template) {
    navigate("/add", { state: { template } });
  }

  if (loading)
    return (
      <div className="flex justify-center items-center pt-20">
        <p className="text-gray-600 text-lg">Loading templates...</p>
      </div>
    );

  return (
    <div className="pt-20 md:pt-10 px-6 md:px-12">
      <h2 className="text-3xl font-semibold mb-8">Workout Templates</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {templates.map((t, i) => (
          <div
            key={i}
            className="
              bg-white p-6 rounded-2xl shadow-md border border-gray-200
              hover:shadow-lg hover:-translate-y-1 transition-all duration-200
            "
          >
            {/* Template Name */}
            <h3 className="text-xl font-bold mb-3 text-gray-900">
              {t.name}
            </h3>

            {/* Exercises List */}
            <div className="mb-4">
              <p className="text-gray-600 font-medium mb-1">Exercises:</p>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                {t.exercises.map((ex, idx) => (
                  <li key={idx}>{ex.name}</li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => useTemplate(t)}
                className="
                  px-4 py-2 rounded-lg bg-blue-600 
                  text-white font-medium hover:bg-blue-700 
                  transition shadow-sm
                "
              >
                Use Template
              </button>

              {t.id && (
                <button
                  onClick={async () => {
                    await deleteTemplate(user.uid, t.id);
                    load();
                  }}
                  className="
                    px-4 py-2 rounded-lg bg-red-500 
                    text-white font-medium hover:bg-red-600 
                    transition shadow-sm
                  "
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
