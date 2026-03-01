import { useState, useCallback } from "react";
import { useMealsByIngredients, useCocktailsByIngredients } from "@/lib/api/queries";

export const useMealSearch = (ingredients: ReadonlyArray<string>) => {
  const { data, isLoading, isError, refetch } = useMealsByIngredients(ingredients);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async (): Promise<void> => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  return {
    results: data,
    isLoading: ingredients.length > 0 && isLoading,
    isError,
    isEmpty: ingredients.length > 0 && !isLoading && data.length === 0,
    hasIngredients: ingredients.length > 0,
    refetch,
    isRefreshing,
    handleRefresh,
  };
};

export const useCocktailSearch = (ingredients: ReadonlyArray<string>) => {
  const { data, isLoading, isError, refetch } = useCocktailsByIngredients(ingredients);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async (): Promise<void> => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  return {
    results: data,
    isLoading: ingredients.length > 0 && isLoading,
    isError,
    isEmpty: ingredients.length > 0 && !isLoading && data.length === 0,
    hasIngredients: ingredients.length > 0,
    refetch,
    isRefreshing,
    handleRefresh,
  };
};
