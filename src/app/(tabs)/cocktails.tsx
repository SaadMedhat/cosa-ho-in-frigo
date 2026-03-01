import { useState, useCallback, useMemo } from "react";
import { View, Text, Pressable, ScrollView, Keyboard, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import { ENTERING } from "@/lib/motion";
import * as Haptics from "expo-haptics";
import { IngredientInput, IngredientChips, QuickAdd } from "@/components/ingredients";
import { ResultsList, cocktailToCardItem } from "@/components/results";
import { SurpriseButton, ConfettiOverlay } from "@/components/ui";
import { useCocktailIngredients } from "@/hooks/use-ingredients";
import { useCocktailSearch } from "@/hooks/use-search";
import { COCKTAIL_INGREDIENT_CATEGORIES } from "@/lib/constants";

const MAX_INGREDIENTS = 10;

const ALL_COCKTAIL_INGREDIENTS: ReadonlyArray<string> = Object.values(
  COCKTAIL_INGREDIENT_CATEGORIES,
).flatMap((category) => [...category.items]);

export default function CocktailsScreen(): React.JSX.Element {
  const {
    ingredients,
    addIngredient,
    removeIngredient,
    clearIngredients,
    hasIngredient,
  } = useCocktailIngredients();

  const [showConfetti, setShowConfetti] = useState(false);
  const [searchIngredients, setSearchIngredients] = useState<ReadonlyArray<string>>([]);
  const { results, isLoading, isError, isEmpty, hasIngredients, refetch, isRefreshing, handleRefresh } =
    useCocktailSearch(searchIngredients);

  const cardItems = useMemo(
    () => results.map(cocktailToCardItem),
    [results],
  );

  const handleAdd = useCallback(
    (ingredient: string): void => {
      if (ingredients.length >= MAX_INGREDIENTS) {
        return;
      }
      addIngredient(ingredient);
    },
    [ingredients.length, addIngredient],
  );

  const handleSearch = useCallback((): void => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Keyboard.dismiss();
    setSearchIngredients([...ingredients]);
  }, [ingredients]);

  const handleClear = useCallback((): void => {
    clearIngredients();
    setSearchIngredients([]);
  }, [clearIngredients]);

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark" edges={["top"]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1"
        refreshControl={
          hasIngredients ? (
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor="#C4653A" />
          ) : undefined
        }
      >
        <View className="px-5 pb-6 pt-4">
          <Animated.View entering={ENTERING.fadeIn}>
            <Text className="mb-1 font-display-bold text-3xl text-foreground dark:text-foreground-on-dark">
              Mix it up
            </Text>
            <Text className="mb-5 text-base text-foreground-secondary dark:text-foreground-on-dark-secondary">
              Add what you have and discover cocktails
            </Text>
          </Animated.View>

          <IngredientInput
            onAdd={handleAdd}
            hasIngredient={hasIngredient}
            disabled={ingredients.length >= MAX_INGREDIENTS}
            ingredientsList={ALL_COCKTAIL_INGREDIENTS}
            placeholder="Type a spirit, mixer..."
          />

          {ingredients.length >= MAX_INGREDIENTS && (
            <Text className="mt-1 text-xs text-foreground-muted dark:text-foreground-on-dark-muted">
              Max {MAX_INGREDIENTS} ingredients reached
            </Text>
          )}

          <IngredientChips
            ingredients={ingredients}
            onRemove={removeIngredient}
          />

          {ingredients.length > 0 && (
            <Animated.View
              entering={ENTERING.fadeInDown}
              className="mt-2 flex-row gap-3"
            >
              <Pressable
                onPress={handleSearch}
                accessibilityRole="button"
                accessibilityLabel="Search cocktails"
                accessibilityHint={`Search cocktails with ${ingredients.length} ingredient${ingredients.length !== 1 ? "s" : ""}`}
                className="flex-1 items-center rounded-button bg-accent py-3.5 active:bg-accent-dark dark:bg-accent-on-dark dark:active:bg-accent"
              >
                <Text className="text-base font-semibold text-white">
                  Search cocktails
                </Text>
              </Pressable>
              <Pressable
                onPress={handleClear}
                accessibilityRole="button"
                accessibilityLabel="Clear all ingredients"
                className="items-center justify-center rounded-button border border-border px-4 active:bg-background-secondary dark:border-border-dark dark:active:bg-background-dark-secondary"
              >
                <Text className="text-sm text-foreground-muted dark:text-foreground-on-dark-muted">Clear</Text>
              </Pressable>
            </Animated.View>
          )}

          <ResultsList
            results={cardItems}
            isLoading={isLoading}
            isError={isError}
            isEmpty={isEmpty}
            hasIngredients={hasIngredients}
            onRetry={refetch}
            routePrefix="/cocktail"
            itemLabel="cocktail"
          />

          {ingredients.length === 0 && !hasIngredients && (
            <>
              <SurpriseButton variant="cocktails" onSurprise={() => setShowConfetti(true)} />
              <QuickAdd onAdd={handleAdd} hasIngredient={hasIngredient} variant="cocktails" />
            </>
          )}
        </View>
      </ScrollView>
      {showConfetti && <ConfettiOverlay onComplete={() => setShowConfetti(false)} />}
    </SafeAreaView>
  );
}
