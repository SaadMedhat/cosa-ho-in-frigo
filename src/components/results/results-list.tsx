"use client";

import { motion } from "framer-motion";
import { ItemCard, type CardItem } from "./item-card";
import { ResultsSkeleton } from "./results-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { fadeInDown, staggerContainer } from "@/lib/motion";

type ResultsListProps = {
  readonly results: ReadonlyArray<CardItem>;
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly isEmpty: boolean;
  readonly hasIngredients: boolean;
  readonly onRetry: () => void;
  readonly routePrefix: "/recipe" | "/cocktail";
  readonly itemLabel?: string;
};

export const ResultsList = ({
  results,
  isLoading,
  isError,
  isEmpty,
  hasIngredients,
  onRetry,
  routePrefix,
  itemLabel = "recipe",
}: ResultsListProps) => {
  if (!hasIngredients) return null;

  if (isLoading) return <ResultsSkeleton />;

  if (isError) {
    return (
      <div className="py-8">
        <EmptyState
          icon="😵"
          title="Something went wrong"
          description={`We couldn't fetch ${itemLabel}s right now. Check your connection and try again.`}
        />
        <motion.div
          variants={fadeInDown}
          initial="initial"
          animate="animate"
          className="flex justify-center"
        >
          <Button onClick={onRetry}>Try again</Button>
        </motion.div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <EmptyState
        icon={routePrefix === "/cocktail" ? "🍹" : "🍽️"}
        title={`No ${itemLabel}s found`}
        description="Try different ingredients or remove some to broaden your search."
      />
    );
  }

  const [featured, ...rest] = results;

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="py-4"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {results.length} {itemLabel}
        {results.length !== 1 ? "s" : ""} found
      </p>

      {featured && (
        <ItemCard
          item={featured}
          index={0}
          variant="featured"
          routePrefix={routePrefix}
        />
      )}

      {rest.map((item, idx) => (
        <ItemCard
          key={item.id}
          item={item}
          index={idx + 1}
          variant="compact"
          routePrefix={routePrefix}
        />
      ))}
    </motion.div>
  );
};
