import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated from "react-native-reanimated";
import { fadeInDownDelayed } from "@/lib/motion";
import { useCocktailDetail } from "@/lib/api/queries";
import { parseCocktailIngredients } from "@/lib/utils/ingredients";
import { useCocktailIngredients } from "@/hooks/use-ingredients";
import { RecipeHero } from "@/components/recipe/RecipeHero";
import { IngredientCheckList } from "@/components/recipe/IngredientCheckList";
import { InstructionSteps } from "@/components/recipe/InstructionSteps";
import { RecipeDetailSkeleton } from "@/components/recipe/RecipeDetailSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";

export default function CocktailDetailScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams<{ readonly id: string }>();
  const router = useRouter();
  const { data: cocktail, isLoading, isError } = useCocktailDetail(id);
  const { ingredients: userIngredients } = useCocktailIngredients();

  if (isLoading) {
    return <RecipeDetailSkeleton />;
  }

  if (isError || !cocktail) {
    return (
      <View className="flex-1 bg-background items-center justify-center dark:bg-background-dark">
        <EmptyState
          icon="😵"
          title="Cocktail not found"
          description="We couldn't load this cocktail. It may have been removed or there's a connection issue."
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

  const parsedIngredients = parseCocktailIngredients(cocktail);

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces
        contentContainerStyle={{ paddingBottom: 40 }}
      >
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
          <InstructionSteps
            instructions={cocktail.strInstructions}
            youtubeUrl={null}
          />
        ) : null}

        {cocktail.strTags ? (
          <Animated.View
            entering={fadeInDownDelayed(600)}
            className="px-5 pb-4"
          >
            <View className="flex-row flex-wrap gap-2">
              {cocktail.strTags.split(",").map((tag: string) => (
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
