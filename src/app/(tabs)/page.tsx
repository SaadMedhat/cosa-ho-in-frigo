"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { IngredientInput, IngredientChips, QuickAdd } from "@/components/ingredients";
import { ResultsList, mealToCardItem } from "@/components/results";
import { SurpriseButton, ConfettiOverlay } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { useIngredients } from "@/hooks/use-ingredients";
import { useMealSearch } from "@/hooks/use-search";
import { fadeIn, fadeInDown } from "@/lib/motion";

const MAX_INGREDIENTS = 10;

export default function RecipesPage() {
  const {
    ingredients,
    addIngredient,
    removeIngredient,
    clearIngredients,
    hasIngredient,
  } = useIngredients();

  const [showConfetti, setShowConfetti] = useState(false);
  const [searchIngredients, setSearchIngredients] = useState<ReadonlyArray<string>>([]);
  const { results, isLoading, isError, isEmpty, hasIngredients, refetch } =
    useMealSearch(searchIngredients);

  const cardItems = useMemo(() => results.map(mealToCardItem), [results]);

  const handleAdd = useCallback(
    (ingredient: string) => {
      if (ingredients.length >= MAX_INGREDIENTS) return;
      addIngredient(ingredient);
    },
    [ingredients.length, addIngredient],
  );

  const handleSearch = useCallback(() => {
    setSearchIngredients([...ingredients]);
  }, [ingredients]);

  const handleClear = useCallback(() => {
    clearIngredients();
    setSearchIngredients([]);
  }, [clearIngredients]);

  return (
    <>
      <div className="px-5 pb-6 pt-4">
        <motion.div variants={fadeIn} initial="initial" animate="animate">
          <h1 className="mb-1 font-display-bold text-3xl text-foreground">
            Cosa ho in frigo?
          </h1>
          <p className="mb-5 text-base text-muted-foreground">
            Add ingredients you have and find recipes
          </p>
        </motion.div>

        <IngredientInput
          onAdd={handleAdd}
          hasIngredient={hasIngredient}
          disabled={ingredients.length >= MAX_INGREDIENTS}
        />

        {ingredients.length >= MAX_INGREDIENTS && (
          <p className="mt-1 text-xs text-muted-foreground">
            Max {MAX_INGREDIENTS} ingredients reached
          </p>
        )}

        <IngredientChips ingredients={ingredients} onRemove={removeIngredient} />

        {ingredients.length > 0 && (
          <motion.div
            variants={fadeInDown}
            initial="initial"
            animate="animate"
            className="mt-2 flex gap-3"
          >
            <Button onClick={handleSearch} className="flex-1">
              Search recipes
            </Button>
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
          </motion.div>
        )}

        <ResultsList
          results={cardItems}
          isLoading={isLoading}
          isError={isError}
          isEmpty={isEmpty}
          hasIngredients={hasIngredients}
          onRetry={refetch}
          routePrefix="/recipe"
          itemLabel="recipe"
        />

        {ingredients.length === 0 && !hasIngredients && (
          <>
            <SurpriseButton variant="meals" onSurprise={() => setShowConfetti(true)} />
            <QuickAdd onAdd={handleAdd} hasIngredient={hasIngredient} />
          </>
        )}
      </div>
      {showConfetti && <ConfettiOverlay onComplete={() => setShowConfetti(false)} />}
    </>
  );
}
