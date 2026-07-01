export const calculateNutrition = (food, quantity = 1, servingOption = null) => {
  if (!food || Number(quantity) <= 0) return null;

  const selectedServing =
    servingOption || food.servingOptions?.[0] || { name: "100 g", grams: 100 };

  const grams = Number(quantity) * Number(selectedServing.grams || 100);
  const multiplier = grams / 100;
  const n = food.nutritionPer100g || {};

  return {
    id: crypto.randomUUID(),
    foodId: food.id,
    name: food.name,
    category: food.category,
    quantity: Number(quantity),
    servingName: selectedServing.name,
    grams,
    calories: Math.round((n.calories || 0) * multiplier),
    protein: +((n.protein || 0) * multiplier).toFixed(1),
    carbs: +((n.carbs || 0) * multiplier).toFixed(1),
    fat: +((n.fat || 0) * multiplier).toFixed(1),
    fiber: +((n.fiber || 0) * multiplier).toFixed(1),
    sugar: +((n.sugar || 0) * multiplier).toFixed(1),
    sodium: +((n.sodium || 0) * multiplier).toFixed(1),
    potassium: +((n.potassium || 0) * multiplier).toFixed(1),
  };
};

export const getTotals = (foods = []) =>
  foods.reduce(
    (total, food) => ({
      calories: total.calories + (food.calories || 0),
      protein: +(total.protein + (food.protein || 0)).toFixed(1),
      carbs: +(total.carbs + (food.carbs || 0)).toFixed(1),
      fat: +(total.fat + (food.fat || 0)).toFixed(1),
      fiber: +(total.fiber + (food.fiber || 0)).toFixed(1),
      sugar: +(total.sugar + (food.sugar || 0)).toFixed(1),
      sodium: +(total.sodium + (food.sodium || 0)).toFixed(1),
      potassium: +(total.potassium + (food.potassium || 0)).toFixed(1),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0, potassium: 0 }
  );

export const getMealTotals = getTotals;

export const getDailyTotals = (meals = {}) => {
  const allFoods = Object.values(meals).flat();
  return getTotals(allFoods);
};
