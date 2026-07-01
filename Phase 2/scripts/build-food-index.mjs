import fs from "node:fs/promises";

const sources = [
  "./src/data/foods/usdaFoods.generated.json",
  "./src/data/foods/openFoodFacts.generated.json",
];

const normalize = (v = "") => String(v).toLowerCase().trim().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ");
const all = [];

for (const file of sources) {
  try {
    const data = JSON.parse(await fs.readFile(file, "utf8"));
    all.push(...data);
  } catch {
    console.warn(`Skipping missing file ${file}`);
  }
}

const byId = new Map();
for (const food of all) {
  if (!food.id || byId.has(food.id)) continue;
  byId.set(food.id, { ...food, searchText: normalize([food.name, food.category, food.brand, ...(food.aliases || [])].filter(Boolean).join(" ")) });
}

await fs.writeFile("./src/data/foods/allFoods.generated.json", JSON.stringify([...byId.values()], null, 2));
console.log(`Built searchable index with ${byId.size} foods.`);
