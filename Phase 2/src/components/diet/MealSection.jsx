import React from "react";
import { getMealTotals } from "../../utils/nutrition";

const MealSection = ({ title, foods, onRemoveFood }) => {
  const totals = getMealTotals(foods);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          {title}
        </h2>

        <p className="text-sm text-zinc-500">
          {totals.calories} kcal · {totals.protein}g protein
        </p>
      </div>

      {foods.length === 0 ? (
        <p className="text-zinc-500 text-sm">No food added yet.</p>
      ) : (
        <div className="space-y-3">
          {foods.map((food) => (
            <div
              key={food.id}
              className="flex justify-between items-center bg-zinc-100 dark:bg-zinc-800 rounded-xl p-3"
            >
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {food.name}
                </p>
                <p className="text-sm text-zinc-500">
                  {food.quantity} {food.unit} · {food.calories} kcal ·{" "}
                  {food.protein}g protein
                </p>
              </div>

              <button
                onClick={() => onRemoveFood(food.id)}
                className="text-red-500 text-sm font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealSection;