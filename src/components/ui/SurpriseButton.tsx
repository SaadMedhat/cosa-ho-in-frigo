import { useState, useCallback } from "react";
import { Text, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { mealClient } from "@/lib/api/meal-client";
import { cocktailClient } from "@/lib/api/cocktail-client";
import { ENTERING } from "@/lib/motion";

type SurpriseButtonProps = {
  readonly variant: "meals" | "cocktails";
  readonly onSurprise?: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const SurpriseButton = ({
  variant,
  onSurprise,
}: SurpriseButtonProps): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handlePress = useCallback(async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    rotation.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withSpring(10, { damping: 3, stiffness: 300 }),
      withSpring(-8, { damping: 3, stiffness: 300 }),
      withSpring(0, { damping: 5, stiffness: 200 }),
    );

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
  }, [isLoading, variant, queryClient, onSurprise, router, rotation]);

  return (
    <Animated.View entering={ENTERING.fadeInDown} className="mt-6 items-center">
      <AnimatedPressable
        onPress={handlePress}
        disabled={isLoading}
        accessibilityRole="button"
        accessibilityLabel={`Get a random ${variant === "meals" ? "recipe" : "cocktail"}`}
        accessibilityHint="Fetches a random suggestion for you"
        style={animatedStyle}
        className="flex-row items-center rounded-button bg-accent/15 px-6 py-3.5 active:bg-accent/25 dark:bg-accent-on-dark/15 dark:active:bg-accent-on-dark/25"
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#C4653A" className="mr-2" />
        ) : (
          <Text className="mr-2 text-lg">🎲</Text>
        )}
        <Text className="text-base font-semibold text-accent dark:text-accent-on-dark">
          Sorprendimi!
        </Text>
      </AnimatedPressable>
    </Animated.View>
  );
};
