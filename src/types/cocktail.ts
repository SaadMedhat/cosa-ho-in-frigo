export type CocktailSummary = {
  readonly idDrink: string;
  readonly strDrink: string;
  readonly strDrinkThumb: string;
};

export type AlcoholicType = "Alcoholic" | "Non alcoholic" | "Optional alcohol";

export type CocktailDetail = CocktailSummary & {
  readonly strCategory: string;
  readonly strAlcoholic: AlcoholicType;
  readonly strGlass: string;
  readonly strInstructions: string;
  readonly strTags: string | null;
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
};

export type CocktailFilterResponse = {
  readonly drinks: ReadonlyArray<CocktailSummary> | null;
};

export type CocktailLookupResponse = {
  readonly drinks: ReadonlyArray<CocktailDetail> | null;
};

export type CocktailIngredientListItem = {
  readonly strIngredient1: string;
};

export type CocktailIngredientListResponse = {
  readonly drinks: ReadonlyArray<CocktailIngredientListItem> | null;
};

export type ParsedCocktailIngredient = {
  readonly name: string;
  readonly measure: string;
};

export type ScoredCocktail = CocktailSummary & {
  readonly matchCount: number;
  readonly totalSearched: number;
};
