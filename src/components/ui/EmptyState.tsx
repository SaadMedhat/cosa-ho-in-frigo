import { View, Text } from "react-native";
import Animated from "react-native-reanimated";
import { ENTERING } from "@/lib/motion";

type EmptyStateProps = {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
};

export const EmptyState = ({
  icon,
  title,
  description,
}: EmptyStateProps): React.JSX.Element => (
  <Animated.View
    entering={ENTERING.fadeInDown}
    className="flex-1 items-center justify-center px-8 py-16"
  >
    <Text className="mb-4 text-5xl">{icon}</Text>
    <Text
      className="mb-2 text-center font-display-bold text-xl text-foreground dark:text-foreground-on-dark"
      accessibilityRole="header"
    >
      {title}
    </Text>
    <Text className="text-center text-base text-foreground-muted leading-6 dark:text-foreground-on-dark-muted">
      {description}
    </Text>
  </Animated.View>
);
