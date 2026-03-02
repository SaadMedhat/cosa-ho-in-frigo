"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Chip } from "@/components/ui/chip";

type IngredientChipsProps = {
  readonly ingredients: ReadonlyArray<string>;
  readonly onRemove: (ingredient: string) => void;
};

export const IngredientChips = ({
  ingredients,
  onRemove,
}: IngredientChipsProps) => {
  if (ingredients.length === 0) return null;

  return (
    <motion.div layout className="flex flex-wrap gap-2 py-3">
      <AnimatePresence mode="popLayout">
        {ingredients.map((ingredient) => (
          <Chip
            key={ingredient}
            label={ingredient}
            isSelected
            onRemove={() => onRemove(ingredient)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
