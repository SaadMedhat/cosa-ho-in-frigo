"use client";

import { motion } from "framer-motion";
import { Chip } from "@/components/ui/chip";
import {
  INGREDIENT_CATEGORIES,
  COCKTAIL_INGREDIENT_CATEGORIES,
} from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/motion";

type QuickAddProps = {
  readonly onAdd: (ingredient: string) => void;
  readonly hasIngredient: (ingredient: string) => boolean;
  readonly variant?: "meals" | "cocktails";
};

const MEAL_ICONS: Record<string, string> = {
  proteins: "🥩",
  vegetables: "🥬",
  dairy: "🧀",
  grains: "🌾",
  spices: "🌿",
  pantry: "🫙",
};

const COCKTAIL_ICONS: Record<string, string> = {
  spirits: "🥃",
  liqueurs: "🍸",
  mixers: "🧊",
  fresh: "🍋",
  wine: "🍷",
};

const QUICK_ADD_LIMIT = 6;

export const QuickAdd = ({
  onAdd,
  hasIngredient,
  variant = "meals",
}: QuickAddProps) => {
  const categories =
    variant === "cocktails"
      ? COCKTAIL_INGREDIENT_CATEGORIES
      : INGREDIENT_CATEGORIES;
  const icons = variant === "cocktails" ? COCKTAIL_ICONS : MEAL_ICONS;

  return (
    <div className="mt-4">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Quick add
      </p>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {Object.entries(categories).map(([key, category]) => {
          const icon = icons[key] ?? "";
          const availableItems = category.items
            .filter((item: string) => !hasIngredient(item))
            .slice(0, QUICK_ADD_LIMIT);

          if (availableItems.length === 0) return null;

          return (
            <motion.div key={key} variants={staggerItem} className="mb-4">
              <p className="mb-2 text-sm text-muted-foreground">
                {icon} {category.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {availableItems.map((item: string) => (
                  <Chip key={item} label={item} onPress={() => onAdd(item)} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
