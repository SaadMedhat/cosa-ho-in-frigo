import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { SPRING_CONFIGS, PRESS_SCALE, fadeInDownDelayed } from "@/lib/motion";
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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ItemCard = ({
  item,
  index,
  variant,
  routePrefix,
}: ItemCardProps): React.JSX.Element => {
  const router = useRouter();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = (): void => {
    scale.value = withSpring(PRESS_SCALE, SPRING_CONFIGS.snappy);
  };

  const handlePressOut = (): void => {
    scale.value = withSpring(1, SPRING_CONFIGS.snappy);
  };

  const handlePress = (): void => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`${routePrefix}/${item.id}`);
  };

  if (variant === "featured") {
    return (
      <AnimatedPressable
        entering={fadeInDownDelayed(index * 80)}
        style={animatedStyle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={`${item.name}, ${item.matchCount} of ${item.totalSearched} ingredients match`}
        className="mb-4 overflow-hidden rounded-card bg-surface dark:bg-surface-dark"
      >
        <Image
          source={{ uri: item.imageUri }}
          style={{ height: 220 }}
          contentFit="cover"
          transition={200}
          placeholder={{ blurhash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH" }}
          accessibilityLabel={`Photo of ${item.name}`}
        />
        <View className="p-4">
          <View className="mb-2 flex-row items-center justify-between">
            <Text
              className="flex-1 font-display-bold text-xl text-foreground dark:text-foreground-on-dark"
              numberOfLines={2}
            >
              {item.name}
            </Text>
          </View>
          <View className="self-start rounded-chip bg-accent/15 px-3 py-1">
            <Text className="text-sm font-semibold text-accent dark:text-accent-on-dark">
              {item.matchCount}/{item.totalSearched} ingredients
            </Text>
          </View>
        </View>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      entering={fadeInDownDelayed(index * 80)}
      style={animatedStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, ${item.matchCount} of ${item.totalSearched} ingredients match`}
      className="mb-3 flex-row overflow-hidden rounded-card bg-surface dark:bg-surface-dark"
    >
      <Image
        source={{ uri: item.imageUri }}
        style={{ width: 100, height: 100 }}
        contentFit="cover"
        transition={200}
        placeholder={{ blurhash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH" }}
        accessibilityLabel={`Photo of ${item.name}`}
      />
      <View className="flex-1 justify-center p-3">
        <Text
          className="mb-1 font-display text-base text-foreground dark:text-foreground-on-dark"
          numberOfLines={2}
        >
          {item.name}
        </Text>
        <View className="self-start rounded-chip bg-accent/15 px-2.5 py-0.5">
          <Text className="text-xs font-semibold text-accent dark:text-accent-on-dark">
            {item.matchCount}/{item.totalSearched}
          </Text>
        </View>
      </View>
    </AnimatedPressable>
  );
};
