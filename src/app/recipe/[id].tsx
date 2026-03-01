import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated from "react-native-reanimated";
import { fadeInDownDelayed } from "@/lib/motion";
import { useMealDetail } from "@/lib/api/queries";
import { parseMealIngredients } from "@/lib/utils/ingredients";
import { useIngredients } from "@/hooks/use-ingredients";
import { RecipeHero } from "@/components/recipe/RecipeHero";
import { IngredientCheckList } from "@/components/recipe/IngredientCheckList";
import { InstructionSteps } from "@/components/recipe/InstructionSteps";
import { RecipeDetailSkeleton } from "@/components/recipe/RecipeDetailSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";

export default function RecipeDetailScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams<{ readonly id: string }>();
  const router = useRouter();
  const { data: meal, isLoading, isError } = useMealDetail(id);
  const { ingredients: userIngredients } = useIngredients();

  if (isLoading) {
    return <RecipeDetailSkeleton />;
  }

  if (isError || !meal) {
    return (
      <View className="flex-1 bg-background items-center justify-center dark:bg-background-dark">
        <EmptyState
          icon="😵"
          title="Recipe not found"
          description="We couldn't load this recipe. It may have been removed or there's a connection issue."
        />
        <Animated.View
          entering={fadeInDownDelayed(200)}
          className="mt-4"
        >
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back to results"
            className="rounded-button bg-accent px-6 py-3 active:bg-accent-dark"
          >
            <Text className="font-semibold text-white">Go back</Text>
          </Pressable>
        </Animated.View>
      </View>
    );
  }

  const parsedIngredients = parseMealIngredients(meal);

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces
        contentContainerStyle={{ paddingBottom: 40 }}
      >
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
          <Animated.View
            entering={fadeInDownDelayed(600)}
            className="px-5 pb-4"
          >
            <View className="flex-row flex-wrap gap-2">
              {meal.strTags.split(",").map((tag) => (
                <View
                  key={tag.trim()}
                  className="rounded-chip bg-background-secondary px-3 py-1.5 dark:bg-background-dark-secondary"
                >
                  <Text className="text-xs text-foreground-muted dark:text-foreground-on-dark-muted">
                    {tag.trim()}
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>
        ) : null}
      </ScrollView>
    </View>
  );
}
