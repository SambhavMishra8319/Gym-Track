import beverage from './foods/beverage.json';
import dairy from './foods/dairy.json';
import drinks from './foods/drinks.json';
import fat from './foods/fat.json';
import fruits from './foods/fruits.json';
import grains from './foods/grains.json';
import indian_bread from './foods/indian-bread.json';
import indian_breakfast from './foods/indian-breakfast.json';
import indian_meal from './foods/indian-meal.json';
import indian from './foods/indian.json';
import nuts from './foods/nuts.json';
import packaged_food from './foods/packaged-food.json';
import prepared_meal from './foods/prepared-meal.json';
import protein from './foods/protein.json';
import recipes from './foods/recipes.json';
import snacks from './foods/snacks.json';
import south_indian from './foods/south-indian.json';
import street_food from './foods/street-food.json';
import supplements from './foods/supplements.json';
import vegetables from './foods/vegetables.json';

export const foodDatabase = [
  ...beverage,
  ...dairy,
  ...drinks,
  ...fat,
  ...fruits,
  ...grains,
  ...indian_bread,
  ...indian_breakfast,
  ...indian_meal,
  ...indian,
  ...nuts,
  ...packaged_food,
  ...prepared_meal,
  ...protein,
  ...recipes,
  ...snacks,
  ...south_indian,
  ...street_food,
  ...supplements,
  ...vegetables,
];

export const FOOD_COUNT = foodDatabase.length;
