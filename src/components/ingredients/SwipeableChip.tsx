import { Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { SPRING_CONFIGS, ENTERING, EXITING } from "@/lib/motion";

type SwipeableChipProps = {
  readonly label: string;
  readonly onRemove: () => void;
};

const SWIPE_THRESHOLD = -60;

export const SwipeableChip = ({
  label,
  onRemove,
}: SwipeableChipProps): React.JSX.Element => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const triggerRemove = (): void => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onRemove();
  };

  const triggerTapRemove = (): void => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onRemove();
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((event) => {
      translateX.value = Math.min(0, event.translationX);
    })
    .onEnd((event) => {
      if (event.translationX < SWIPE_THRESHOLD) {
        translateX.value = withTiming(-200, { duration: 200 });
        opacity.value = withTiming(0, { duration: 200 }, () => {
          runOnJS(triggerRemove)();
        });
        return;
      }
      translateX.value = withSpring(0, SPRING_CONFIGS.snappy);
    });

  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(triggerTapRemove)();
  });

  const composed = Gesture.Race(panGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        entering={ENTERING.fadeIn}
        exiting={EXITING.fadeOut}
        style={animatedStyle}
        accessibilityRole="button"
        accessibilityLabel={`${label}, selected`}
        accessibilityHint="Swipe left or double tap to remove"
        className="flex-row items-center rounded-chip bg-accent px-4 py-2"
      >
        <Text className="text-sm font-medium text-white">{label}</Text>
        <Text className="ml-2 text-xs text-white/80">✕</Text>
      </Animated.View>
    </GestureDetector>
  );
};
