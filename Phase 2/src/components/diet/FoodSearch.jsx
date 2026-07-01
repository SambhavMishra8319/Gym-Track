import React, { useMemo, useState } from "react";
import { searchFoods } from "../../utils/foodSearch";
import { calculateNutrition } from "../../utils/nutrition";

const FoodSearch = ({ onAddFood }) => {
  const [search, setSearch] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedServingIndex, setSelectedServingIndex] = useState(0);

  const results = useMemo(() => searchFoods(search), [search]);
  const selectedServing = selectedFood?.servingOptions?.[selectedServingIndex] || null;
  const preview = selectedFood && selectedServing ? calculateNutrition(selectedFood, quantity, selectedServing) : null;

  const handleSelectFood = (food) => {
    setSelectedFood(food);
    setSearch(food.name);
    setQuantity(1);
    setSelectedServingIndex(0);
  };

  const handleAddFood = () => {
    if (!selectedFood || !selectedServing) return;
    const nutrition = calculateNutrition(selectedFood, quantity, selectedServing);
    if (!nutrition) return;
    onAddFood(nutrition);
    setSearch("");
    setSelectedFood(null);
    setQuantity(1);
    setSelectedServingIndex(0);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow">
      <h2 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">Add Food</h2>

      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setSelectedFood(null);
        }}
        placeholder="Search banana, roti, dal, dry fruit shake..."
        className="w-full p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
      />

      {results.length > 0 && !selectedFood && (
        <div className="mt-3 border rounded-xl overflow-hidden dark:border-zinc-700 max-h-80 overflow-y-auto">
          {results.map((food) => (
            <button
              key={food.id}
              onClick={() => handleSelectFood(food)}
              className="w-full text-left p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <div className="font-semibold text-zinc-900 dark:text-white">{food.name}</div>
              <div className="text-sm text-zinc-500">
                {food.nutritionPer100g?.calories || 0} kcal · {food.nutritionPer100g?.protein || 0}g protein / 100g
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedFood && (
        <div className="mt-4 space-y-3">
          <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4">
            <h3 className="font-bold text-zinc-900 dark:text-white">{selectedFood.name}</h3>
            <p className="text-sm text-zinc-500">{selectedFood.category}</p>
          </div>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
          />

          <select
            value={selectedServingIndex}
            onChange={(e) => setSelectedServingIndex(Number(e.target.value))}
            className="w-full p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
          >
            {selectedFood.servingOptions?.map((serving, index) => (
              <option key={`${serving.name}-${index}`} value={index}>{serving.name}</option>
            ))}
          </select>

          {preview && (
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4">
              <p className="font-bold text-zinc-900 dark:text-white">{preview.calories} kcal</p>
              <p className="text-sm text-zinc-500">
                Protein {preview.protein}g · Carbs {preview.carbs}g · Fat {preview.fat}g · Fiber {preview.fiber}g
              </p>
              <p className="text-xs text-zinc-400 mt-1">Weight: {preview.grams}g</p>
            </div>
          )}

          <button
            onClick={handleAddFood}
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
