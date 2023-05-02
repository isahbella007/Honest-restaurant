import { mealPrices } from "./calculatePrice";

export function getFilteredMealList(
  dietOption: string,
  mealList: MealList[],
  mealIngredient: MealIngredient[],
  minBudget: string,
  maxBudget: string,
  luckyValue: string
) {
  let filteredMealList = mealList.slice();
  const pricesGotten = mealPrices(mealList, mealIngredient);

  if (dietOption === "vegan") {
    filteredMealList = filteredMealList.filter((meal) => {
      const ingredients = meal.ingredients;

      return ingredients.every((ingredient) => {
        const menuIngredient = mealIngredient.find(
          (mi) => mi.name === ingredient.name
        );

        return menuIngredient?.groups?.includes("vegan");
      });
    });
  } else if (dietOption === "vegetarian") {
    filteredMealList = filteredMealList.filter((meal) => {
      const ingredients = meal.ingredients;
      return ingredients.every((ingredient) => {
        const menuIngredient = mealIngredient.find(
          (mi) => mi.name === ingredient.name
        );
        return (
          menuIngredient?.groups?.includes("vegan") ||
          menuIngredient?.groups?.includes("vegetarian")
        );
      });
    });
  }

  if(luckyValue !== ""){
    minBudget = ""
    maxBudget = ""
  }
  if(minBudget !== "" && maxBudget !== ""){
    filteredMealList = filteredMealList.filter((meal) => {
        const price = pricesGotten[mealList.indexOf(meal)]
        return parseFloat(minBudget).toFixed(2) <= price[1].toFixed(2) && parseFloat(maxBudget).toFixed(2) >= price[0].toFixed(2);
    })
  }

  if(luckyValue !== ""){ 
    const luckyMeals = filteredMealList.filter((meal) => {
      const priceRange = pricesGotten[mealList.indexOf(meal)]
      const minPrice = priceRange[1]
      const maxPrice = priceRange[0]
      return parseFloat(luckyValue).toFixed(2) >= minPrice.toFixed(2) && parseFloat(luckyValue).toFixed(2) <= maxPrice.toFixed(2)
    })
    const randomIndex = Math.floor(Math.random() * luckyMeals.length)
    filteredMealList = [luckyMeals[randomIndex]]
    
  }
  const filteredMealPrices = filteredMealList.map((meal) => pricesGotten[mealList.indexOf(meal)]);

  return [filteredMealList, filteredMealPrices] as const
}
