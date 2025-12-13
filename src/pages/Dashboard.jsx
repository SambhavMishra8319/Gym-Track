import React, { useState } from "react";
import GoalsSection from "../components/GoalsSection";
import GoalModal from "../components/GoalModal"; // your modal component

export default function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const addGoal = (goal) => {
    setGoals([...goals, goal]);
  };

  return (
    <>
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
    </>
  );
}
