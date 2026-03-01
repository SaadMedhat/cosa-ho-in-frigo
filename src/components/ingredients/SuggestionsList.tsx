import { View, Text, Pressable, ScrollView } from "react-native";
import Animated from "react-native-reanimated";
import { ENTERING, EXITING } from "@/lib/motion";

type SuggestionsListProps = {
  readonly suggestions: ReadonlyArray<string>;
  readonly onSelect: (ingredient: string) => void;
  readonly visible: boolean;
};

export const SuggestionsList = ({
  suggestions,
  onSelect,
  visible,
}: SuggestionsListProps): React.JSX.Element | null => {
  if (!visible || suggestions.length === 0) {
    return null;
  }

  return (
    <Animated.View
      entering={ENTERING.fadeIn}
      exiting={EXITING.fadeOut}
      className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 rounded-card border border-border bg-surface shadow-lg dark:border-border-dark dark:bg-surface-dark"
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {suggestions.map((suggestion, idx) => (
          <Pressable
            key={suggestion}
            onPress={() => onSelect(suggestion)}
            accessibilityRole="button"
            accessibilityLabel={`Add ${suggestion}`}
            className={`px-4 py-3 active:bg-background-secondary dark:active:bg-background-dark-secondary ${
              idx < suggestions.length - 1 ? "border-b border-border dark:border-border-dark" : ""
            }`}
          >
            <Text className="text-base text-foreground dark:text-foreground-on-dark">{suggestion}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </Animated.View>
  );
};
