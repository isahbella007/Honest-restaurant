export function sortingOptions(
  sortOption: string,
  filteredmealList: MealList[],
  filteredMealPrices: number[][]
) {
  let sortedMealList = filteredmealList.slice(); // make a copy of the original array to avoid modifying it directly
  let sortedMealPrices = filteredMealPrices.slice();


  if (sortOption === "name") {
    sortedMealList.sort((a, b) => a.name.localeCompare(b.name));
    sortedMealPrices = sortedMealList.map(
      (meal) => filteredMealPrices[filteredmealList.indexOf(meal)]
    );
  } else if (sortOption === "price-dec") {
    console.log(sortedMealList.length, sortedMealPrices.length);
    if (sortedMealList.length === sortedMealPrices.length) {
      sortedMealList.sort((a, b) => {
        const indexA = filteredmealList.indexOf(a);
        const indexB = filteredmealList.indexOf(b);
        const aPrice = sortedMealPrices[indexA][1];
        const bPrice = sortedMealPrices[indexB][1];
        return aPrice - bPrice;
      });
      sortedMealPrices = sortedMealList.map(
        (meal) => filteredMealPrices[filteredmealList.indexOf(meal)]
      );
    }
  } else if (sortOption === "price-asc") {
    if (sortedMealList.length === sortedMealPrices.length) {
      sortedMealList.sort((a, b) => {
        const indexA = filteredmealList.indexOf(a);
        const indexB = filteredmealList.indexOf(b);
        const aPrice = sortedMealPrices[indexA][1];
        const bPrice = sortedMealPrices[indexB][1];
        return bPrice - aPrice;
      });
    }

    sortedMealPrices = sortedMealList.map(
      (meal) => filteredMealPrices[filteredmealList.indexOf(meal)]
    );
  }
  return [sortedMealList, sortedMealPrices] as const;
}
