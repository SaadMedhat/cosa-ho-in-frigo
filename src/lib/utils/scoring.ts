import type { MealSummary, ScoredMeal } from "@/types/meal";
import type { CocktailSummary, ScoredCocktail } from "@/types/cocktail";

const countOccurrences = <T extends Record<string, unknown>>(
  results: ReadonlyArray<ReadonlyArray<T>>,
  idKey: string,
): Map<string, { readonly item: T; readonly count: number }> => {
  const counts = new Map<string, { item: T; count: number }>();

  results.forEach((group) => {
    group.forEach((item) => {
      const id = String(item[idKey]);
      const existing = counts.get(id);

      if (existing) {
        counts.set(id, { item: existing.item, count: existing.count + 1 });
        return;
      }

      counts.set(id, { item, count: 1 });
    });
  });

  return counts;
};

export const scoreMeals = (
  resultsByIngredient: ReadonlyArray<ReadonlyArray<MealSummary>>,
): ReadonlyArray<ScoredMeal> => {
  const totalSearched = resultsByIngredient.length;
  const counts = countOccurrences(resultsByIngredient, "idMeal");

  return Array.from(counts.values())
    .map(({ item, count }) => ({
      ...item,
      matchCount: count,
      totalSearched,
    }))
    .sort((a, b) => b.matchCount - a.matchCount);
};

export const scoreCocktails = (
  resultsByIngredient: ReadonlyArray<ReadonlyArray<CocktailSummary>>,
): ReadonlyArray<ScoredCocktail> => {
  const totalSearched = resultsByIngredient.length;
  const counts = countOccurrences(resultsByIngredient, "idDrink");

  return Array.from(counts.values())
    .map(({ item, count }) => ({
      ...item,
      matchCount: count,
      totalSearched,
    }))
    .sort((a, b) => b.matchCount - a.matchCount);
};
