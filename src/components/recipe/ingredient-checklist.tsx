"use client";

import { motion } from "framer-motion";
import type { ParsedIngredient } from "@/types/meal";
import { normalizeIngredient } from "@/lib/utils/ingredients";
import { fadeInDown, staggerContainer, staggerItem } from "@/lib/motion";

type IngredientCheckListProps = {
  readonly ingredients: ReadonlyArray<ParsedIngredient>;
  readonly userIngredients: ReadonlyArray<string>;
};

export const IngredientCheckList = ({
  ingredients,
  userIngredients,
}: IngredientCheckListProps) => {
  const normalizedUserSet = new Set(userIngredients.map(normalizeIngredient));

  const matchCount = ingredients.filter((ing) =>
    normalizedUserSet.has(normalizeIngredient(ing.name)),
  ).length;

  return (
    <motion.div
      variants={fadeInDown}
      initial="initial"
      animate="animate"
      className="px-5 py-4"
    >
      <h2 className="mb-3 font-display-bold text-xl text-foreground">
        Ingredients
      </h2>

      <div className="mb-4 rounded-card bg-primary/10 px-4 py-3">
        <p className="text-sm font-semibold text-primary">
          You have {matchCount} of {ingredients.length} ingredients
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {ingredients.map((ingredient, idx) => {
          const isAvailable = normalizedUserSet.has(
            normalizeIngredient(ingredient.name),
          );

          return (
            <motion.div
              key={`${ingredient.name}-${idx}`}
              variants={staggerItem}
              className="flex items-center border-b border-border py-3"
            >
              <span className="mr-3 text-base">
                {isAvailable ? "✅" : "❌"}
              </span>
              <div className="flex-1">
                <p
                  className={`text-base ${
                    isAvailable
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {ingredient.name}
                </p>
                {ingredient.measure ? (
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {ingredient.measure}
                  </p>
                ) : null}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
