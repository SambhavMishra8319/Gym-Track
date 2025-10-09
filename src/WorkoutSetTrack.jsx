// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./WorkoutCategory.css";

// export default function WorkoutCategory() {
//   const { name } = useParams(); // slug like 'chest-day'
//   const navigate = useNavigate();

//   const [exercises, setExercises] = useState([]);
//   const [newExercise, setNewExercise] = useState("");

//   const categoryKey = `exercises:${name}`;
//   const updatedKey = `category_last_updated:${name}`;

//   // Load exercises from localStorage
//   useEffect(() => {
//     const stored = localStorage.getItem(categoryKey);
//     if (stored) setExercises(JSON.parse(stored));
//   }, [name]);

//   const handleAddExercise = () => {
//     if (!newExercise.trim()) return;
//     const updated = [...exercises, { title: newExercise.trim(), created: new Date().toISOString() }];
//     setExercises(updated);
//     localStorage.setItem(categoryKey, JSON.stringify(updated));
//     localStorage.setItem(updatedKey, new Date().toISOString()); // update dashboard
//     setNewExercise("");
//   };

//   const handleDelete = (index) => {
//     const updated = exercises.filter((_, i) => i !== index);
//     setExercises(updated);
//     localStorage.setItem(categoryKey, JSON.stringify(updated));
//     localStorage.setItem(updatedKey, new Date().toISOString());
//   };

//   return (
//     <div className="category-root">
//       <header className="category-header">
//         <h1 className="category-title">
//           {name.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//         </h1>
//         <button className="back-btn" onClick={() => navigate("/")}>
//           ← Back
//         </button>
//       </header>

//       <div className="add-exercise">
//         <input
//           type="text"
//           placeholder="Enter new exercise..."
//           value={newExercise}
//           onChange={(e) => setNewExercise(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleAddExercise()}
//         />
//         <button onClick={handleAddExercise}>Add</button>
//       </div>

//       <div className="exercise-list">
//         {exercises.length === 0 ? (
//           <p className="no-data">No exercises added yet.</p>
//         ) : (
//           <ul>
//             {exercises.map((ex, i) => (
//               <li key={i} className="exercise-item">
//                 <span
//                   className="exercise-name"
//                   onClick={() => navigate(`/exercise/${ex.title}?category=${name}`)}
//                 >
//                   {ex.title}
//                 </span>
//                 <button className="delete-btn" onClick={() => handleDelete(i)}>
//                   ✖
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WorkoutSetTrack.css";

const CATEGORIES = [
  "chest-day",
  "leg-day",
  "abs-day",
  "back-day",
  "biceps-day",
  "shoulder-day",
  "triceps-day",
];

export default function WorkoutSetTrack() {
  const navigate = useNavigate();
  const [lastUpdated, setLastUpdated] = useState({});

 useEffect(() => {
  const handleStorageChange = () => {
    const updated = {};
    CATEGORIES.forEach(cat => {
      const time = localStorage.getItem(`category_last_updated:${cat}`);
      if (time) updated[cat] = new Date(time).toLocaleString();
    });
    setLastUpdated(updated);
  };

  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, []);


  return (
    <div className="dashboard-root">
      <h1>Workout SetTrack</h1>
      <div className="categories-grid">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className="category-btn"
            onClick={() => navigate(`/category/${cat}`)}
            title={lastUpdated[cat] ? `Last Updated: ${lastUpdated[cat]}` : "No record yet"}
          >
            {cat.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>
    </div>
  );
}
