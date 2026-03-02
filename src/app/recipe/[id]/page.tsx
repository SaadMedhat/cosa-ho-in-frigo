"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useMealDetail } from "@/lib/api/queries";
import { parseMealIngredients } from "@/lib/utils/ingredients";
import { useIngredients } from "@/hooks/use-ingredients";
import { RecipeHero } from "@/components/recipe/recipe-hero";
import { IngredientCheckList } from "@/components/recipe/ingredient-checklist";
import { InstructionSteps } from "@/components/recipe/instruction-steps";
import { RecipeDetailSkeleton } from "@/components/recipe/recipe-detail-skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { fadeInDown } from "@/lib/motion";

export default function RecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();
  const { data: meal, isLoading, isError } = useMealDetail(id);
  const { ingredients: userIngredients } = useIngredients();

  if (isLoading) return <RecipeDetailSkeleton />;

  if (isError || !meal) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <EmptyState
          icon="😵"
          title="Recipe not found"
          description="We couldn't load this recipe. It may have been removed or there's a connection issue."
        />
        <motion.div variants={fadeInDown} initial="initial" animate="animate" className="mt-4">
          <Button onClick={() => router.back()}>Go back</Button>
        </motion.div>
      </div>
    );
  }

  const parsedIngredients = parseMealIngredients(meal);

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute right-4 top-4 z-50">
        <ThemeToggle />
      </div>
      <div className="mx-auto max-w-2xl pb-10">
        <RecipeHero
          name={meal.strMeal}
          imageUri={meal.strMealThumb}
          badges={[meal.strCategory, meal.strArea]}
        />

        <IngredientCheckList
          ingredients={parsedIngredients}
          userIngredients={userIngredients}
        />

        {meal.strInstructions ? (
          <InstructionSteps
            instructions={meal.strInstructions}
            youtubeUrl={meal.strYoutube ?? null}
          />
        ) : null}

        {meal.strTags ? (
          <motion.div
            variants={fadeInDown}
            initial="initial"
            animate="animate"
            className="px-5 pb-4"
          >
            <div className="flex flex-wrap gap-2">
              {meal.strTags.split(",").map((tag) => (
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
