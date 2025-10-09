// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./WorkoutCategory.css";

// export default function WorkoutCategory() {
//   const { name } = useParams(); // get category name from URL
//   const navigate = useNavigate();
//   const formattedName = name.replace("-", " ").toUpperCase();

//   const [exercises, setExercises] = useState([
//     "Bench Press",
//     "Incline Dumbbell Press",
//   ]);
//   const [newExercise, setNewExercise] = useState("");

//   const addExercise = () => {
//     if (newExercise.trim() === "") return;
//     setExercises([...exercises, newExercise]);
//     setNewExercise("");
//   };

//   return (
//     <div className="category-page">
//       <h2 className="category-title">{formattedName}</h2>

//       <div className="add-section">
//         <input
//           type="text"
//           placeholder="Add new exercise..."
//           value={newExercise}
//           onChange={(e) => setNewExercise(e.target.value)}
//         />
//         <button onClick={addExercise}>Add</button>
//       </div>

//       <div className="exercise-list">
//         {exercises.map((exercise, index) => (
//           <div
//             key={index}
//             className="exercise-card"
//             onClick={() =>
//               navigate(`/exercise/${exercise.toLowerCase().replace(/ /g, "-")}`)
//             }
//           >
//             {exercise}
//           </div>
//         ))}
//       </div>

//       <button className="back-btn" onClick={() => navigate("/")}>
//         ⬅ Back to Home
//       </button>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./WorkoutCategory.css";

export default function WorkoutCategory() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState("");

  const categoryKey = `exercises:${name}`;
  const updatedKey = `category_last_updated:${name}`;

  useEffect(() => {
    const stored = localStorage.getItem(categoryKey);
    if (stored) setExercises(JSON.parse(stored));
  }, [name]);

  const handleAddExercise = () => {
    if (!newExercise.trim()) return;
    const updated = [...exercises, { title: newExercise.trim(), created: new Date().toISOString() }];
    setExercises(updated);
    localStorage.setItem(categoryKey, JSON.stringify(updated));
    localStorage.setItem(updatedKey, new Date().toISOString());
    setNewExercise("");
  };
  function formatName(slug) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
}


  const handleDelete = (index) => {
    const updated = exercises.filter((_, i) => i !== index);
    setExercises(updated);
    localStorage.setItem(categoryKey, JSON.stringify(updated));
    localStorage.setItem(updatedKey, new Date().toISOString());
  };

  return (
    <div className="category-root">
      <h1>{formatName(name)}</h1>

      <header className="category-header">
        <h1>{name.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}</h1>
        <button onClick={() => navigate("/")}>← Back</button>
      </header>

      <div className="add-exercise">
        <input
          type="text"
          placeholder="New exercise..."
          value={newExercise}
          onChange={(e) => setNewExercise(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddExercise()}
        />
        <button onClick={handleAddExercise}>Add</button>
      </div>

      <ul className="exercise-list">
        {exercises.map((ex, i) => (
          <li key={i}>
            <span onClick={() => navigate(`/exercise/${encodeURIComponent(ex.title)}?category=${name}`)}>
              {ex.title}
            </span>
            <button onClick={() => handleDelete(i)}>✖</button>
          </li>
        ))}
      </ul>
      {exercises.length === 0 && <p>No exercises added yet.</p>}
    </div>
  );
}
