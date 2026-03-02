"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCocktailDetail } from "@/lib/api/queries";
import { parseCocktailIngredients } from "@/lib/utils/ingredients";
import { useCocktailIngredients } from "@/hooks/use-ingredients";
import { RecipeHero } from "@/components/recipe/recipe-hero";
import { IngredientCheckList } from "@/components/recipe/ingredient-checklist";
import { InstructionSteps } from "@/components/recipe/instruction-steps";
import { RecipeDetailSkeleton } from "@/components/recipe/recipe-detail-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { fadeInDown } from "@/lib/motion";

export default function CocktailDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: cocktail, isLoading, isError } = useCocktailDetail(id);
  const { ingredients: userIngredients } = useCocktailIngredients();

  if (isLoading) return <RecipeDetailSkeleton />;

  if (isError || !cocktail) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <EmptyState
          icon="😵"
          title="Cocktail not found"
          description="We couldn't load this cocktail. It may have been removed or there's a connection issue."
        />
        <motion.div variants={fadeInDown} initial="initial" animate="animate" className="mt-4">
          <Button onClick={() => router.back()}>Go back</Button>
        </motion.div>
      </div>
    );
  }

  const parsedIngredients = parseCocktailIngredients(cocktail);

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute right-4 top-4 z-50">
        <ThemeToggle />
      </div>
      <div className="mx-auto max-w-2xl pb-10">
        <RecipeHero
          name={cocktail.strDrink}
          imageUri={cocktail.strDrinkThumb}
          badges={[cocktail.strCategory, cocktail.strGlass, cocktail.strAlcoholic]}
        />

        <IngredientCheckList
          ingredients={parsedIngredients}
          userIngredients={userIngredients}
        />

        {cocktail.strInstructions ? (
          <InstructionSteps instructions={cocktail.strInstructions} youtubeUrl={null} />
        ) : null}

        {cocktail.strTags ? (
          <motion.div
            variants={fadeInDown}
            initial="initial"
            animate="animate"
            className="px-5 pb-4"
          >
            <div className="flex flex-wrap gap-2">
              {cocktail.strTags.split(",").map((tag: string) => (
                <span
                  key={tag.trim()}
                  className="rounded-chip bg-secondary px-3 py-1.5 text-xs text-muted-foreground"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
