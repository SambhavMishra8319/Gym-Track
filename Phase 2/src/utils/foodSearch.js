import { foodDatabase } from "../data/foodDatabase";

const normalize = (value = "") => value.toString().toLowerCase().trim();

export const searchFoods = (query, limit = 30) => {
  const q = normalize(query);
  if (!q) return [];

  return foodDatabase
    .map((food) => {
      const name = normalize(food.name);
      const category = normalize(food.category);
      const aliases = food.aliases || [];

      let score = 0;
      if (name === q) score += 100;
      if (name.startsWith(q)) score += 60;
      if (name.includes(q)) score += 40;
      if (category.includes(q)) score += 10;
      if (aliases.some((a) => normalize(a) === q)) score += 90;
      if (aliases.some((a) => normalize(a).includes(q))) score += 30;

      return { food, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.food.name.localeCompare(b.food.name))
    .slice(0, limit)
    .map((item) => item.food);
};

export const getFoodById = (id) => foodDatabase.find((food) => food.id === id);
