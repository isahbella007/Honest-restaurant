declare type MealList = {
  id: number;
  name: string;
  ingredients: MealListIngredient[];
};

declare type MealListIngredient = {
  name: string;
  quantity: number;
  quantity_type: string;
};

declare type MealIngredient = {
  name: string;
  groups?: string[];
  options: MealIngredientOptions[];
};

declare type MealIngredientOptions = {
  name: string;
  quality: string;
  price: number;
  per_amount: string;
};

declare type SingleMealDetail = {
  id: number;
  name: string;
  ingredients: SingleMealIngredient[];
};

declare type SingleMealIngredient = {
  id: number;
  name: string;
  quantity: number;
  groups?: string[];
  options: MealIngredientOptions[];
};
declare type CardProps = {
  id: number;
  name: string;
  ingredients: MealListIngredient[];
  highestVersionPrice: number;
  lowestVersionPrice: number;
};
declare type FilterOptionProps = {
  onSortChange: (value: string) => void;
  onDietChange: (value: string) => void;
  onMinBudgetChange: (value: string) => void;
  onMaxBudgetChange: (value: string) => void;
  onInputChange: (value:React.ChangeEvent<HTMLInputElement>) => void
};
