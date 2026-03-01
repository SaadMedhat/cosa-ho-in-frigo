import { View, Text } from "react-native";
import Animated from "react-native-reanimated";
import type { ParsedIngredient } from "@/types/meal";
import { normalizeIngredient } from "@/lib/utils/ingredients";
import { fadeInDownDelayed } from "@/lib/motion";

type IngredientCheckListProps = {
  readonly ingredients: ReadonlyArray<ParsedIngredient>;
  readonly userIngredients: ReadonlyArray<string>;
};

export const IngredientCheckList = ({
  ingredients,
  userIngredients,
}: IngredientCheckListProps): React.JSX.Element => {
  const normalizedUserSet = new Set(
    userIngredients.map(normalizeIngredient),
  );

  const matchCount = ingredients.filter((ing) =>
    normalizedUserSet.has(normalizeIngredient(ing.name)),
  ).length;

  return (
    <Animated.View
      entering={fadeInDownDelayed(200)}
      className="px-5 py-4"
    >
      <Text
        className="mb-3 font-display-bold text-xl text-foreground dark:text-foreground-on-dark"
        accessibilityRole="header"
      >
        Ingredients
      </Text>

      <View className="mb-4 rounded-card bg-accent/10 px-4 py-3">
        <Text className="text-sm font-semibold text-accent dark:text-accent-on-dark">
          You have {matchCount} of {ingredients.length} ingredients
        </Text>
      </View>

      {ingredients.map((ingredient, idx) => {
        const isAvailable = normalizedUserSet.has(
          normalizeIngredient(ingredient.name),
        );

        return (
          <Animated.View
            key={`${ingredient.name}-${idx}`}
            entering={fadeInDownDelayed(280 + idx * 40)}
            className="flex-row items-center border-b border-border py-3 dark:border-border-dark"
          >
            <Text className="mr-3 text-base">
              {isAvailable ? "✅" : "❌"}
            </Text>
            <View className="flex-1">
              <Text
                className={`text-base ${
                  isAvailable
                    ? "font-semibold text-foreground dark:text-foreground-on-dark"
                    : "text-foreground-secondary dark:text-foreground-on-dark-secondary"
                }`}
              >
                {ingredient.name}
              </Text>
              {ingredient.measure ? (
                <Text className="mt-0.5 text-sm text-foreground-muted dark:text-foreground-on-dark-muted">
                  {ingredient.measure}
                </Text>
              ) : null}
            </View>
          </Animated.View>
        );
      })}
    </Animated.View>
  );
};
