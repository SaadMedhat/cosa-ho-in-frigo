import { useQuery, useQueries } from "@tanstack/react-query";
import { mealClient } from "./meal-client";
import { cocktailClient } from "./cocktail-client";
import { scoreMeals, scoreCocktails } from "@/lib/utils/scoring";
import { STALE_TIME } from "@/lib/constants";
import type { MealSummary } from "@/types/meal";
import type { CocktailSummary } from "@/types/cocktail";

export const useMealsByIngredients = (ingredients: ReadonlyArray<string>) => {
  const queries = useQueries({
    queries: ingredients.map((ingredient) => ({
      queryKey: ["meals", "filter", ingredient] as const,
      queryFn: (): Promise<ReadonlyArray<MealSummary>> =>
        mealClient
          .filterByIngredient(ingredient)
          .then((res) => res.meals ?? []),
      staleTime: STALE_TIME,
      enabled: ingredients.length > 0,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const allData = queries
    .map((q) => q.data)
    .filter((d): d is ReadonlyArray<MealSummary> => d !== undefined);

  return {
    data: allData.length > 0 ? scoreMeals(allData) : [],
    isLoading,
    isError,
    refetch: async (): Promise<void> => {
      await Promise.all(queries.map((q: { refetch: () => Promise<unknown> }) => q.refetch()));
    },
  };
};

export const useMealDetail = (id: string | undefined) =>
  useQuery({
    queryKey: ["meals", "detail", id] as const,
    queryFn: () => mealClient.lookupById(id!).then((res) => res.meals?.[0] ?? null),
    staleTime: STALE_TIME,
    enabled: id !== undefined,
  });

export const useMealIngredientsList = () =>
  useQuery({
    queryKey: ["meals", "ingredients"] as const,
    queryFn: () =>
      mealClient
        .listAllIngredients()
        .then((res) =>
          (res.meals ?? []).map((item) => item.strIngredient),
        ),
    staleTime: STALE_TIME,
  });

export const useCocktailsByIngredients = (ingredients: ReadonlyArray<string>) => {
  const queries = useQueries({
    queries: ingredients.map((ingredient) => ({
      queryKey: ["cocktails", "filter", ingredient] as const,
      queryFn: (): Promise<ReadonlyArray<CocktailSummary>> =>
        cocktailClient
          .filterByIngredient(ingredient)
          .then((res) => res.drinks ?? []),
      staleTime: STALE_TIME,
      enabled: ingredients.length > 0,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const allData = queries
    .map((q) => q.data)
    .filter((d): d is ReadonlyArray<CocktailSummary> => d !== undefined);

  return {
    data: allData.length > 0 ? scoreCocktails(allData) : [],
    isLoading,
    isError,
    refetch: async (): Promise<void> => {
      await Promise.all(queries.map((q: { refetch: () => Promise<unknown> }) => q.refetch()));
    },
  };
};

export const useCocktailDetail = (id: string | undefined) =>
  useQuery({
    queryKey: ["cocktails", "detail", id] as const,
    queryFn: () =>
      cocktailClient.lookupById(id!).then((res) => res.drinks?.[0] ?? null),
    staleTime: STALE_TIME,
    enabled: id !== undefined,
  });

export const useCocktailIngredientsList = () =>
  useQuery({
    queryKey: ["cocktails", "ingredients"] as const,
    queryFn: () =>
      cocktailClient
        .listAllIngredients()
        .then((res) =>
          (res.drinks ?? []).map((item) => item.strIngredient1),
        ),
    staleTime: STALE_TIME,
  });
