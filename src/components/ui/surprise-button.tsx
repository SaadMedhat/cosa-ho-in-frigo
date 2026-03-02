"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { mealClient } from "@/lib/api/meal-client";
import { cocktailClient } from "@/lib/api/cocktail-client";
import { fadeInDown } from "@/lib/motion";

type SurpriseButtonProps = {
  readonly variant: "meals" | "cocktails";
  readonly onSurprise?: () => void;
};

export const SurpriseButton = ({
  variant,
  onSurprise,
}: SurpriseButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handlePress = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (variant === "meals") {
        const res = await mealClient.getRandomMeal();
        const meal = res.meals?.[0];
        if (meal) {
          queryClient.setQueryData(["meals", "detail", meal.idMeal], meal);
          onSurprise?.();
          router.push(`/recipe/${meal.idMeal}`);
        }
      }
      if (variant === "cocktails") {
        const res = await cocktailClient.getRandomCocktail();
        const drink = res.drinks?.[0];
        if (drink) {
          queryClient.setQueryData(["cocktails", "detail", drink.idDrink], drink);
          onSurprise?.();
          router.push(`/cocktail/${drink.idDrink}`);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, variant, queryClient, onSurprise, router]);

  return (
    <motion.div
      variants={fadeInDown}
      initial="initial"
      animate="animate"
      className="mt-6 flex justify-center"
    >
      <motion.button
        onClick={handlePress}
        disabled={isLoading}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        animate={
          isLoading
            ? {}
            : {
                rotate: [0, -6, 6, -4, 4, 0],
                transition: { duration: 0.5, ease: "easeInOut" },
              }
        }
        aria-label={`Get a random ${variant === "meals" ? "recipe" : "cocktail"}`}
        className="inline-flex cursor-pointer items-center rounded-button bg-primary/15 px-6 py-3.5 text-base font-semibold text-primary hover:bg-primary/25 disabled:opacity-60"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <span className="mr-2 text-lg">🎲</span>
        )}
        Sorprendimi!
      </motion.button>
    </motion.div>
  );
};
