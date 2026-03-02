"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { ReactNode } from "react";
import { normalizeIngredient } from "@/lib/utils/ingredients";

type IngredientsContextValue = {
  readonly ingredients: ReadonlyArray<string>;
  readonly addIngredient: (ingredient: string) => void;
  readonly removeIngredient: (ingredient: string) => void;
  readonly clearIngredients: () => void;
  readonly hasIngredient: (ingredient: string) => boolean;
};

type ProviderProps = {
  readonly children: ReactNode;
};

const createIngredientsStore = () => {
  const Context = createContext<IngredientsContextValue | null>(null);

  const Provider = ({ children }: ProviderProps): React.JSX.Element => {
    const [ingredients, setIngredients] = useState<ReadonlyArray<string>>([]);

    const normalizedSet = useMemo(
      () => new Set(ingredients.map(normalizeIngredient)),
      [ingredients],
    );

    const addIngredient = useCallback((ingredient: string): void => {
      const normalized = normalizeIngredient(ingredient);
      setIngredients((prev) => {
        if (prev.some((i) => normalizeIngredient(i) === normalized)) {
          return prev;
        }
        return [...prev, ingredient.trim()];
      });
    }, []);

    const removeIngredient = useCallback((ingredient: string): void => {
      const normalized = normalizeIngredient(ingredient);
      setIngredients((prev) =>
        prev.filter((i) => normalizeIngredient(i) !== normalized),
      );
    }, []);

    const clearIngredients = useCallback((): void => {
      setIngredients([]);
    }, []);

    const hasIngredient = useCallback(
      (ingredient: string): boolean =>
        normalizedSet.has(normalizeIngredient(ingredient)),
      [normalizedSet],
    );

    const value = useMemo(
      (): IngredientsContextValue => ({
        ingredients,
        addIngredient,
        removeIngredient,
        clearIngredients,
        hasIngredient,
      }),
      [ingredients, addIngredient, removeIngredient, clearIngredients, hasIngredient],
    );

    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    );
  };

  const useStore = (): IngredientsContextValue => {
    const context = useContext(Context);
    if (context === null) {
      throw new Error("useIngredients must be used within its Provider");
    }
    return context;
  };

  return { Provider, useStore };
};

const mealStore = createIngredientsStore();
const cocktailStore = createIngredientsStore();

export const MealIngredientsProvider = mealStore.Provider;
export const useMealIngredients = mealStore.useStore;

export const CocktailIngredientsProvider = cocktailStore.Provider;
export const useCocktailIngredients = cocktailStore.useStore;

export const IngredientsProvider = MealIngredientsProvider;
export const useIngredients = useMealIngredients;
