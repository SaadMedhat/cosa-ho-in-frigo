"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { SuggestionsList } from "./suggestions-list";
import { INGREDIENT_CATEGORIES } from "@/lib/constants";
import { normalizeIngredient } from "@/lib/utils/ingredients";

type IngredientInputProps = {
  readonly onAdd: (ingredient: string) => void;
  readonly hasIngredient: (ingredient: string) => boolean;
  readonly disabled?: boolean;
  readonly ingredientsList?: ReadonlyArray<string>;
  readonly placeholder?: string;
};

const ALL_MEAL_INGREDIENTS: ReadonlyArray<string> = Object.values(
  INGREDIENT_CATEGORIES,
).flatMap((category) => [...category.items]);

const MAX_SUGGESTIONS = 6;

export const IngredientInput = ({
  onAdd,
  hasIngredient,
  disabled = false,
  ingredientsList = ALL_MEAL_INGREDIENTS,
  placeholder = "Type an ingredient...",
}: IngredientInputProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo((): ReadonlyArray<string> => {
    if (query.trim().length < 1) return [];
    const normalized = normalizeIngredient(query);
    return ingredientsList
      .filter(
        (ingredient) =>
          normalizeIngredient(ingredient).includes(normalized) &&
          !hasIngredient(ingredient),
      )
      .slice(0, MAX_SUGGESTIONS);
  }, [query, hasIngredient, ingredientsList]);

  const handleAdd = useCallback(
    (ingredient: string) => {
      onAdd(ingredient);
      setQuery("");
      inputRef.current?.focus();
    },
    [onAdd],
  );

  const handleSubmit = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Enter") return;
      const trimmed = query.trim();
      if (trimmed.length === 0 || hasIngredient(trimmed)) return;
      handleAdd(trimmed);
    },
    [query, hasIngredient, handleAdd],
  );

  return (
    <div className="relative z-10">
      <div
        className={`flex items-center rounded-card border bg-card px-4 transition-colors ${
          isFocused ? "border-primary ring-2 ring-primary/20" : "border-input"
        }`}
      >
        <span className="mr-2 text-lg">🔍</span>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleSubmit}
          placeholder={placeholder}
          disabled={disabled}
          aria-label="Ingredient search input"
          className="flex-1 bg-transparent py-3.5 text-base text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
        {query.length > 0 && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear input"
            className="ml-2 rounded-full p-1 text-sm text-muted-foreground hover:text-foreground"
          >
            &times;
          </button>
        )}
      </div>
      <SuggestionsList
        suggestions={suggestions}
        onSelect={handleAdd}
        visible={isFocused && suggestions.length > 0}
      />
    </div>
  );
};
