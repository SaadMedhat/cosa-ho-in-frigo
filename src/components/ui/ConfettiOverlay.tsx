import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from "react-native-reanimated";

type ConfettiOverlayProps = {
  readonly onComplete?: () => void;
};

const PIECE_COUNT = 30;
const DURATION = 1800;
const COLORS = ["#C4653A", "#E8956A", "#D4764A", "#FFB088", "#FF8C5A", "#FFC857", "#5CB85C"];
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type PieceConfig = {
  readonly startX: number;
  readonly startY: number;
  readonly endY: number;
  readonly drift: number;
  readonly rotation: number;
  readonly color: string;
  readonly size: number;
  readonly delay: number;
};

const generatePieces = (): ReadonlyArray<PieceConfig> =>
  Array.from({ length: PIECE_COUNT }, () => ({
    startX: Math.random() * SCREEN_WIDTH,
    startY: -20 - Math.random() * 40,
    endY: SCREEN_HEIGHT + 20,
    drift: (Math.random() - 0.5) * 120,
    rotation: (Math.random() - 0.5) * 720,
    color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#C4653A",
    size: 6 + Math.random() * 6,
    delay: Math.random() * 300,
  }));

const ConfettiPiece = ({ config }: { readonly config: PieceConfig }): React.JSX.Element => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      config.delay,
      withTiming(1, { duration: DURATION, easing: Easing.out(Easing.quad) }),
    );
  }, [config.delay, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute" as const,
    left: config.startX + config.drift * progress.value,
    top: config.startY + (config.endY - config.startY) * progress.value,
    width: config.size,
    height: config.size * 0.6,
    borderRadius: 2,
    backgroundColor: config.color,
    transform: [{ rotate: `${config.rotation * progress.value}deg` }],
    opacity: progress.value < 0.8 ? 1 : 1 - (progress.value - 0.8) * 5,
  }));

  return <Animated.View style={animatedStyle} />;
};

export const ConfettiOverlay = ({
  onComplete,
}: ConfettiOverlayProps): React.JSX.Element => {
  const pieces = generatePieces();
  const containerOpacity = useSharedValue(1);

  useEffect(() => {
    const cleanup = (): void => {
      onComplete?.();
    };

    containerOpacity.value = withDelay(
      DURATION + 200,
      withTiming(0, { duration: 300 }, () => {
        runOnJS(cleanup)();
      }),
    );
  }, [containerOpacity, onComplete]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, containerStyle]} pointerEvents="none">
      {pieces.map((config, idx) => (
        <ConfettiPiece key={`confetti-${idx}`} config={config} />
      ))}
    </Animated.View>
  );
};
