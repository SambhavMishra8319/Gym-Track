export const calculateNutrition = (food, quantity, unit) => {
  if (!food || !quantity || quantity <= 0) return null;

  const selectedUnit = food.commonUnits.find((item) => item.unit === unit);

  if (!selectedUnit) return null;

  let multiplier;

  if (food.baseUnit === "piece" || food.baseUnit === "scoop") {
    multiplier = quantity * selectedUnit.grams;
  } else {
    const totalGrams = quantity * selectedUnit.grams;
    multiplier = totalGrams / 100;
  }

  return {
    id: crypto.randomUUID(),
    foodId: food.id,
    name: food.name,
    quantity,
    unit,
    calories: Math.round(food.calories * multiplier),
    protein: +(food.protein * multiplier).toFixed(1),
    carbs: +(food.carbs * multiplier).toFixed(1),
    fat: +(food.fat * multiplier).toFixed(1),
    fiber: +(food.fiber * multiplier).toFixed(1),
  };
};

export const getMealTotals = (foods = []) => {
  return foods.reduce(
    (total, food) => ({
      calories: total.calories + food.calories,
      protein: +(total.protein + food.protein).toFixed(1),
      carbs: +(total.carbs + food.carbs).toFixed(1),
      fat: +(total.fat + food.fat).toFixed(1),
      fiber: +(total.fiber + food.fiber).toFixed(1),
    }),
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
    }
  );
};

export const getDailyTotals = (meals) => {
  const allFoods = Object.values(meals).flat();
  return getMealTotals(allFoods);
};