import { Pressable, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { cn } from "@/lib/utils/cn";
import { SPRING_CONFIGS, PRESS_SCALE, ENTERING, EXITING } from "@/lib/motion";

type ChipProps = {
  readonly label: string;
  readonly isSelected?: boolean;
  readonly onPress?: () => void;
  readonly onRemove?: () => void;
  readonly variant?: "default" | "accent";
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Chip = ({
  label,
  isSelected = false,
  onPress,
  onRemove,
  variant = "default",
}: ChipProps): React.JSX.Element => {
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
    if (onRemove && isSelected) {
      onRemove();
      return;
    }
    onPress?.();
  };

  return (
    <AnimatedPressable
      entering={ENTERING.fadeIn}
      exiting={EXITING.fadeOut}
      style={animatedStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${label}${isSelected ? ", selected" : ""}`}
      accessibilityHint={isSelected ? "Double tap to remove" : "Double tap to add"}
      className={cn(
        "flex-row items-center rounded-chip px-4 py-2",
        variant === "accent" && !isSelected && "bg-accent/10",
        variant === "default" && !isSelected && "bg-surface border border-border dark:bg-surface-dark dark:border-border-dark",
        isSelected && "bg-accent",
      )}
    >
      <Text
        className={cn(
          "text-sm font-medium",
          isSelected ? "text-white" : "text-foreground dark:text-foreground-on-dark",
        )}
      >
        {label}
      </Text>
      {isSelected && (
        <Text className="ml-2 text-xs text-white/80">✕</Text>
      )}
    </AnimatedPressable>
  );
};
