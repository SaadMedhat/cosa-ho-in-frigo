import { View, Text, Pressable, Linking } from "react-native";
import Animated from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { fadeInDownDelayed } from "@/lib/motion";

type InstructionStepsProps = {
  readonly instructions: string;
  readonly youtubeUrl: string | null;
};

const STEP_PATTERN = /(?:^|\n)\s*(?:step\s*)?(\d+)[.):\s]/i;
const NEWLINE_PATTERN = /\r?\n/;

const parseInstructions = (raw: string): ReadonlyArray<string> => {
  const trimmed = raw.trim();

  if (STEP_PATTERN.test(trimmed)) {
    return trimmed
      .split(/\r?\n/)
      .map((line) => line.replace(/^\s*(?:step\s*)?\d+[.):\s]\s*/i, "").trim())
      .filter((line) => line.length > 0);
  }

  const byNewline = trimmed
    .split(NEWLINE_PATTERN)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (byNewline.length > 1) {
    return byNewline;
  }

  return trimmed
    .split(/\.\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 10)
    .map((sentence) => (sentence.endsWith(".") ? sentence : `${sentence}.`));
};

const handleYoutubePress = (url: string): void => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  Linking.openURL(url);
};

export const InstructionSteps = ({
  instructions,
  youtubeUrl,
}: InstructionStepsProps): React.JSX.Element => {
  const steps = parseInstructions(instructions);

  return (
    <Animated.View
      entering={fadeInDownDelayed(400)}
      className="px-5 py-4"
    >
      <Text
        className="mb-4 font-display-bold text-xl text-foreground dark:text-foreground-on-dark"
        accessibilityRole="header"
      >
        Instructions
      </Text>

      {steps.map((step, idx) => (
        <Animated.View
          key={`step-${idx}`}
          entering={fadeInDownDelayed(480 + idx * 50)}
          className="mb-4 flex-row"
        >
          <View className="mr-3 mt-0.5 h-7 w-7 items-center justify-center rounded-full bg-accent/15">
            <Text className="text-xs font-bold text-accent dark:text-accent-on-dark">{idx + 1}</Text>
          </View>
          <Text className="flex-1 text-base leading-6 text-foreground-secondary dark:text-foreground-on-dark-secondary">
            {step}
          </Text>
        </Animated.View>
      ))}

      {youtubeUrl ? (
        <Animated.View
          entering={fadeInDownDelayed(600)}
          className="mt-2"
        >
          <Pressable
            onPress={() => handleYoutubePress(youtubeUrl)}
            accessibilityRole="link"
            accessibilityLabel="Watch video tutorial on YouTube"
            className="flex-row items-center justify-center rounded-button bg-[#FF0000] py-3.5 active:opacity-80"
          >
            <Text className="mr-2 text-lg">▶</Text>
            <Text className="font-semibold text-white">Watch on YouTube</Text>
          </Pressable>
        </Animated.View>
      ) : null}
    </Animated.View>
  );
};
