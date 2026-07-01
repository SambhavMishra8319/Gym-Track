import React, { useMemo, useState } from "react";
import { foodDatabase } from "../../data/foodDatabase";
import { calculateNutrition } from "../../utils/nutrition";

const FoodSearch = ({ onAddFood }) => {
  const [search, setSearch] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("");

  const results = useMemo(() => {
    if (!search.trim()) return [];

    return foodDatabase.filter((food) =>
      food.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleSelectFood = (food) => {
    setSelectedFood(food);
    setUnit(food.commonUnits[0]?.unit || "");
    setSearch(food.name);
  };

  const handleAdd = () => {
    const nutrition = calculateNutrition(selectedFood, Number(quantity), unit);

    if (!nutrition) return;

    onAddFood(nutrition);

    setSearch("");
    setSelectedFood(null);
    setQuantity(1);
    setUnit("");
  };

  const preview =
    selectedFood && unit
      ? calculateNutrition(selectedFood, Number(quantity), unit)
      : null;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow">
      <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">
        Add Food
      </h2>

      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelectedFood(null);
        }}
        placeholder="Search banana, oats, paneer..."
        className="w-full p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
      />

      {results.length > 0 && !selectedFood && (
        <div className="mt-3 border rounded-xl overflow-hidden dark:border-zinc-700">
          {results.map((food) => (
            <button
              key={food.id}
              onClick={() => handleSelectFood(food)}
              className="w-full text-left p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-white"
            >
              <div className="font-semibold">{food.name}</div>
              <div className="text-sm text-zinc-500">
                {food.calories} kcal · {food.protein}g protein /{" "}
                {food.baseQuantity}
                {food.baseUnit}
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedFood && (
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
            />

            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
            >
              {selectedFood.commonUnits.map((item) => (
                <option key={item.unit} value={item.unit}>
                  {item.unit}
                </option>
              ))}
            </select>
          </div>

          {preview && (
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 dark:text-white">
              <p className="font-bold">{selectedFood.name}</p>
              <p>{preview.calories} kcal</p>
              <p className="text-sm text-zinc-500">
                Protein {preview.protein}g · Carbs {preview.carbs}g · Fat{" "}
                {preview.fat}g · Fiber {preview.fiber}g
              </p>
            </div>
          )}

          <button
            onClick={handleAdd}
            className="w-full bg-black text-white dark:bg-white dark:text-black rounded-xl p-3 font-semibold"
          >
            Add Food
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodSearch;