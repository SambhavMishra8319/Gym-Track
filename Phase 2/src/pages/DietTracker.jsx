import React, { useEffect, useState } from "react";
import FoodSearch from "../components/diet/FoodSearch";
import NutritionSummary from "../components/diet/NutritionSummary";
import MealSection from "../components/diet/MealSection";
import WaterTracker from "../components/diet/WaterTracker";
import DietHistory from "../components/diet/DietHistory";
import { getDailyTotals } from "../utils/nutrition";

const STORAGE_KEY = "gymtrack_diet_log";

const defaultMeals = {
  breakfast: [],
  lunch: [],
  snacks: [],
  dinner: [],
};

const targets = {
  calories: 2500,
  protein: 150,
  carbs: 300,
  fat: 70,
};

const DietTracker = () => {
  const [selectedMeal, setSelectedMeal] = useState("breakfast");
  const [meals, setMeals] = useState(defaultMeals);
  const [water, setWater] = useState(0);
  const [history, setHistory] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (saved?.date === today) {
      setMeals(saved.meals || defaultMeals);
      setWater(saved.water || 0);
      setHistory(saved.history || []);
    } else if (saved) {
      setHistory([
        {
          date: saved.date,
          totals: getDailyTotals(saved.meals || defaultMeals),
          water: saved.water || 0,
        },
        ...(saved.history || []),
      ]);
    }
  }, [today]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        date: today,
        meals,
        water,
        history,
      })
    );
  }, [meals, water, history, today]);

  const totals = getDailyTotals(meals);

  const addFood = (food) => {
    setMeals((prev) => ({
      ...prev,
      [selectedMeal]: [...prev[selectedMeal], food],
    }));
  };

  const removeFood = (mealName, foodId) => {
    setMeals((prev) => ({
      ...prev,
      [mealName]: prev[mealName].filter((food) => food.id !== foodId),
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Diet Tracker
          </h1>
          <p className="text-zinc-500">
            Track calories, protein, meals and water like Healthify.
          </p>
        </div>

        <NutritionSummary totals={totals} targets={targets} />

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow">
              <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
                Select Meal
              </h2>

              <select
                value={selectedMeal}
                onChange={(e) => setSelectedMeal(e.target.value)}
                className="w-full p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="snacks">Snacks</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>

            <FoodSearch onAddFood={addFood} />

            <WaterTracker water={water} setWater={setWater} />
          </div>

          <div className="md:col-span-2 space-y-6">
            <MealSection
              title="Breakfast"
              foods={meals.breakfast}
              onRemoveFood={(id) => removeFood("breakfast", id)}
            />

            <MealSection
              title="Lunch"
              foods={meals.lunch}
              onRemoveFood={(id) => removeFood("lunch", id)}
            />

            <MealSection
              title="Snacks"
              foods={meals.snacks}
              onRemoveFood={(id) => removeFood("snacks", id)}
            />

            <MealSection
              title="Dinner"
              foods={meals.dinner}
              onRemoveFood={(id) => removeFood("dinner", id)}
            />

            <DietHistory history={history} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietTracker;