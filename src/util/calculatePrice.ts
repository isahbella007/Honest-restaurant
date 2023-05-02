export const mealPrices = (MealList:MealList[], MealIngredient:MealIngredient[]) => {
  if(MealList.length === 0 || MealIngredient.length === 0){
    return []
  }
  const mealPrices = MealList.map((meal) => {
    let lowQualityMealPrice = 0;
    let lowestVersionOfAnIngredient;

    let highQualityMealPrice = 0;
    let highestVersionOfAnIngredient;

    meal.ingredients.forEach((ingredient) => {
      const ingredientData = MealIngredient.find((ingredientName) => {
        return ingredient.name === ingredientName.name;
      });

      if (ingredientData) {
        lowestVersionOfAnIngredient =
          (ingredient.quantity / 1000) * ingredientData!.options[2].price + 0.1;
        lowQualityMealPrice += lowestVersionOfAnIngredient;

        highestVersionOfAnIngredient =
          (ingredient.quantity / 1000) * ingredientData!.options[0].price;
        highQualityMealPrice += highestVersionOfAnIngredient;
      }
    });

    return [highQualityMealPrice, lowQualityMealPrice];
  });
  return mealPrices;
};
