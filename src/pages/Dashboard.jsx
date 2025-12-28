// import React, { useState } from "react";
// import GoalsSection from "../components/GoalsSection";
// import GoalModal from "../components/GoalModal"; // your modal component

// export default function Dashboard() {
//   const [goals, setGoals] = useState([]);
//   const [openModal, setOpenModal] = useState(false);

//   const addGoal = (goal) => {
//     setGoals([...goals, goal]);
//   };

//   return (
//     <>
//       <GoalsSection
//         goals={goals}
//         onAddGoal={() => setOpenModal(true)}
//       />

//       {openModal && (
//         <GoalModal
//           onClose={() => setOpenModal(false)}
//           onSave={(goal) => {
//             addGoal(goal);
//             setOpenModal(false);
//           }}
//         />
//       )}
//     </>
//   );
// }
import React, { useState } from "react";
import GoalsSection from "../components/GoalsSection";
import GoalModal from "../components/GoalModal";

export default function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const addGoal = (goal) => {
    setGoals((prev) => [...prev, goal]);
  };

  return (
    <div className="pt-16 pb-24 px-4 md:pt-20 md:pb-10 md:px-8 min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto">
        <GoalsSection
          goals={goals}
          onAddGoal={() => setOpenModal(true)}
        />

        {openModal && (
          <GoalModal
            onClose={() => setOpenModal(false)}
            onSave={(goal) => {
              addGoal(goal);
              setOpenModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
