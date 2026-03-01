import { View, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { cn } from "@/lib/utils/cn";

type SkeletonProps = {
  readonly className?: string;
  readonly width?: number | string;
  readonly height?: number | string;
  readonly borderRadius?: number;
};

const buildStyle = (
  width: number | string | undefined,
  height: number | string | undefined,
  borderRadius: number,
): ViewStyle => {
  const style: ViewStyle = { borderRadius, overflow: "hidden" };

  if (width !== undefined) {
    style.width = width as ViewStyle["width"];
  }
  if (height !== undefined) {
    style.height = height as ViewStyle["height"];
  }

  return style;
};

export const Skeleton = ({
  className,
  width,
  height,
  borderRadius = 8,
}: SkeletonProps): React.JSX.Element => {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 800 }),
        withTiming(0.4, { duration: 800 }),
      ),
      -1,
      false,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View
      style={buildStyle(width, height, borderRadius)}
      className={cn("overflow-hidden", className)}
    >
      <Animated.View
        style={animatedStyle}
        className="h-full w-full bg-background-secondary dark:bg-background-dark-secondary"
      />
    </View>
  );
};
