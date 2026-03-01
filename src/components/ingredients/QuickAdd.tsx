import { View, Text, ScrollView } from "react-native";
import Animated from "react-native-reanimated";
import { Chip } from "@/components/ui/Chip";
import { INGREDIENT_CATEGORIES, COCKTAIL_INGREDIENT_CATEGORIES } from "@/lib/constants";
import { fadeInDownDelayed } from "@/lib/motion";

type QuickAddProps = {
  readonly onAdd: (ingredient: string) => void;
  readonly hasIngredient: (ingredient: string) => boolean;
  readonly variant?: "meals" | "cocktails";
};

const MEAL_ICONS: Readonly<Record<string, string>> = {
  proteins: "🥩",
  vegetables: "🥬",
  dairy: "🧀",
  grains: "🌾",
  spices: "🌿",
  pantry: "🫙",
};

const COCKTAIL_ICONS: Readonly<Record<string, string>> = {
  spirits: "🥃",
  liqueurs: "🍸",
  mixers: "🧊",
  fresh: "🍋",
  wine: "🍷",
};

const QUICK_ADD_LIMIT = 6;

export const QuickAdd = ({
  onAdd,
  hasIngredient,
  variant = "meals",
}: QuickAddProps): React.JSX.Element => {
  const categories = variant === "cocktails" ? COCKTAIL_INGREDIENT_CATEGORIES : INGREDIENT_CATEGORIES;
  const icons = variant === "cocktails" ? COCKTAIL_ICONS : MEAL_ICONS;

  return (
    <View className="mt-4">
      <Text className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground-muted dark:text-foreground-on-dark-muted">
        Quick add
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.entries(categories).map(
          ([key, category], categoryIndex) => {
            const icon = icons[key] ?? "";
            const availableItems = category.items
              .filter((item: string) => !hasIngredient(item))
              .slice(0, QUICK_ADD_LIMIT);

            if (availableItems.length === 0) {
              return null;
            }

            return (
              <Animated.View
                key={key}
                entering={fadeInDownDelayed(categoryIndex * 60)}
                className="mb-4"
              >
                <Text className="mb-2 text-sm text-foreground-secondary dark:text-foreground-on-dark-secondary">
                  {icon} {category.label}
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {availableItems.map((item: string) => (
                    <Chip
                      key={item}
                      label={item}
                      onPress={() => onAdd(item)}
                    />
                  ))}
                </View>
              </Animated.View>
            );
          },
        )}
      </ScrollView>
    </View>
  );
};
