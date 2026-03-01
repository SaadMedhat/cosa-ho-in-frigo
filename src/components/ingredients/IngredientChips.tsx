import Animated from "react-native-reanimated";
import { SwipeableChip } from "./SwipeableChip";
import { LAYOUT_ANIMATION } from "@/lib/motion";

type IngredientChipsProps = {
  readonly ingredients: ReadonlyArray<string>;
  readonly onRemove: (ingredient: string) => void;
};

export const IngredientChips = ({
  ingredients,
  onRemove,
}: IngredientChipsProps): React.JSX.Element | null => {
  if (ingredients.length === 0) {
    return null;
  }

  return (
    <Animated.View
      layout={LAYOUT_ANIMATION}
      className="flex-row flex-wrap gap-2 py-3"
    >
      {ingredients.map((ingredient) => (
        <SwipeableChip
          key={ingredient}
          label={ingredient}
          onRemove={() => onRemove(ingredient)}
        />
      ))}
    </Animated.View>
  );
};
