import type { MealDetail, ParsedIngredient } from "@/types/meal";
import type { CocktailDetail, ParsedCocktailIngredient } from "@/types/cocktail";

const INGREDIENT_INDICES = Array.from({ length: 20 }, (_, i) => i + 1);
const COCKTAIL_INGREDIENT_INDICES = Array.from({ length: 15 }, (_, i) => i + 1);

const isNonEmpty = (value: string | null | undefined): value is string =>
  value !== null && value !== undefined && value.trim() !== "";

export const parseMealIngredients = (meal: MealDetail): ReadonlyArray<ParsedIngredient> =>
  INGREDIENT_INDICES
    .map((i) => {
      const name = meal[`strIngredient${i}` as keyof MealDetail] as string | null;
      const measure = meal[`strMeasure${i}` as keyof MealDetail] as string | null;

      if (!isNonEmpty(name)) {
        return null;
      }

      return {
        name: name.trim(),
        measure: isNonEmpty(measure) ? measure.trim() : "",
      };
    })
    .filter((item): item is ParsedIngredient => item !== null);

export const parseCocktailIngredients = (
  cocktail: CocktailDetail,
): ReadonlyArray<ParsedCocktailIngredient> =>
  COCKTAIL_INGREDIENT_INDICES
    .map((i) => {
      const name = cocktail[`strIngredient${i}` as keyof CocktailDetail] as string | null;
      const measure = cocktail[`strMeasure${i}` as keyof CocktailDetail] as string | null;

      if (!isNonEmpty(name)) {
        return null;
      }

      return {
        name: name.trim(),
        measure: isNonEmpty(measure) ? measure.trim() : "",
      };
    })
    .filter((item): item is ParsedCocktailIngredient => item !== null);

export const normalizeIngredient = (ingredient: string): string =>
  ingredient.toLowerCase().trim();

export const ingredientsMatch = (a: string, b: string): boolean =>
  normalizeIngredient(a) === normalizeIngredient(b);
