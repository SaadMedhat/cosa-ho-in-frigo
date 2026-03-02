"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { staggerItem, PRESS_SCALE } from "@/lib/motion";
import type { ScoredMeal } from "@/types/meal";
import type { ScoredCocktail } from "@/types/cocktail";

export type CardItem = {
  readonly id: string;
  readonly name: string;
  readonly imageUri: string;
  readonly matchCount: number;
  readonly totalSearched: number;
};

type ItemCardProps = {
  readonly item: CardItem;
  readonly index: number;
  readonly variant: "featured" | "compact";
  readonly routePrefix: "/recipe" | "/cocktail";
};

export const mealToCardItem = (meal: ScoredMeal): CardItem => ({
  id: meal.idMeal,
  name: meal.strMeal,
  imageUri: meal.strMealThumb,
  matchCount: meal.matchCount,
  totalSearched: meal.totalSearched,
});

export const cocktailToCardItem = (cocktail: ScoredCocktail): CardItem => ({
  id: cocktail.idDrink,
  name: cocktail.strDrink,
  imageUri: cocktail.strDrinkThumb,
  matchCount: cocktail.matchCount,
  totalSearched: cocktail.totalSearched,
});

export const ItemCard = ({ item, index, variant, routePrefix }: ItemCardProps) => {
  if (variant === "featured") {
    return (
      <motion.div
        variants={staggerItem}
        whileTap={{ scale: PRESS_SCALE }}
      >
        <Link
          href={`${routePrefix}/${item.id}`}
          aria-label={`${item.name}, ${item.matchCount} of ${item.totalSearched} ingredients match`}
          className="mb-4 block overflow-hidden rounded-card bg-card transition-shadow hover:shadow-md"
        >
          <div className="relative h-[220px] w-full">
            <Image
              src={item.imageUri}
              alt={`Photo of ${item.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 560px"
            />
          </div>
          <div className="p-4">
            <h3 className="mb-2 line-clamp-2 font-display-bold text-xl text-card-foreground">
              {item.name}
            </h3>
            <Badge>
              {item.matchCount}/{item.totalSearched} ingredients
            </Badge>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerItem}
      whileTap={{ scale: PRESS_SCALE }}
    >
      <Link
        href={`${routePrefix}/${item.id}`}
        aria-label={`${item.name}, ${item.matchCount} of ${item.totalSearched} ingredients match`}
        className="mb-3 flex overflow-hidden rounded-card bg-card transition-shadow hover:shadow-md"
      >
        <div className="relative h-[100px] w-[100px] flex-shrink-0">
          <Image
            src={item.imageUri}
            alt={`Photo of ${item.name}`}
            fill
            className="object-cover"
            sizes="100px"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center p-3">
          <p className="mb-1 line-clamp-2 font-display text-base text-card-foreground">
            {item.name}
          </p>
          <Badge className="self-start">
            {item.matchCount}/{item.totalSearched}
          </Badge>
        </div>
      </Link>
    </motion.div>
  );
};
