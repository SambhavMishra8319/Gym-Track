import React from "react";

const NutritionSummary = ({ totals, targets }) => {
  const progress = (value, target) => {
    if (!target) return 0;
    return Math.min((value / target) * 100, 100);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow">
      <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
        Today&apos;s Nutrition
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card
          title="Calories"
          value={totals.calories}
          target={targets.calories}
          unit="kcal"
          percent={progress(totals.calories, targets.calories)}
        />
        <Card
          title="Protein"
          value={totals.protein}
          target={targets.protein}
          unit="g"
          percent={progress(totals.protein, targets.protein)}
        />
        <Card
          title="Carbs"
          value={totals.carbs}
          target={targets.carbs}
          unit="g"
          percent={progress(totals.carbs, targets.carbs)}
        />
        <Card
          title="Fat"
          value={totals.fat}
          target={targets.fat}
          unit="g"
          percent={progress(totals.fat, targets.fat)}
        />
      </div>
    </div>
  );
};

const Card = ({ title, value, target, unit, percent }) => {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4">
      <p className="text-sm text-zinc-500">{title}</p>

      <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
        {value} / {target} {unit}
      </h3>

      <div className="h-2 bg-zinc-300 dark:bg-zinc-700 rounded-full mt-3">
        <div
          className="h-2 bg-black dark:bg-white rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default NutritionSummary;