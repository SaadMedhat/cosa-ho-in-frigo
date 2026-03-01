export type MealSummary = {
  readonly idMeal: string;
  readonly strMeal: string;
  readonly strMealThumb: string;
};

export type MealDetail = MealSummary & {
  readonly strCategory: string;
  readonly strArea: string;
  readonly strInstructions: string;
  readonly strTags: string | null;
  readonly strYoutube: string | null;
  readonly strSource: string | null;
  readonly strIngredient1: string | null;
  readonly strIngredient2: string | null;
  readonly strIngredient3: string | null;
  readonly strIngredient4: string | null;
  readonly strIngredient5: string | null;
  readonly strIngredient6: string | null;
  readonly strIngredient7: string | null;
  readonly strIngredient8: string | null;
  readonly strIngredient9: string | null;
  readonly strIngredient10: string | null;
  readonly strIngredient11: string | null;
  readonly strIngredient12: string | null;
  readonly strIngredient13: string | null;
  readonly strIngredient14: string | null;
  readonly strIngredient15: string | null;
  readonly strIngredient16: string | null;
  readonly strIngredient17: string | null;
  readonly strIngredient18: string | null;
  readonly strIngredient19: string | null;
  readonly strIngredient20: string | null;
  readonly strMeasure1: string | null;
  readonly strMeasure2: string | null;
  readonly strMeasure3: string | null;
  readonly strMeasure4: string | null;
  readonly strMeasure5: string | null;
  readonly strMeasure6: string | null;
  readonly strMeasure7: string | null;
  readonly strMeasure8: string | null;
  readonly strMeasure9: string | null;
  readonly strMeasure10: string | null;
  readonly strMeasure11: string | null;
  readonly strMeasure12: string | null;
  readonly strMeasure13: string | null;
  readonly strMeasure14: string | null;
  readonly strMeasure15: string | null;
  readonly strMeasure16: string | null;
  readonly strMeasure17: string | null;
  readonly strMeasure18: string | null;
  readonly strMeasure19: string | null;
  readonly strMeasure20: string | null;
};

export type MealFilterResponse = {
  readonly meals: ReadonlyArray<MealSummary> | null;
};

export type MealLookupResponse = {
  readonly meals: ReadonlyArray<MealDetail> | null;
};

export type MealIngredientListItem = {
  readonly idIngredient: string;
  readonly strIngredient: string;
  readonly strDescription: string | null;
  readonly strType: string | null;
};

export type MealIngredientListResponse = {
  readonly meals: ReadonlyArray<MealIngredientListItem> | null;
};

export type ParsedIngredient = {
  readonly name: string;
  readonly measure: string;
};

export type ScoredMeal = MealSummary & {
  readonly matchCount: number;
  readonly totalSearched: number;
};
