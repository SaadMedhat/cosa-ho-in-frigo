import { useState, useMemo, useCallback, useRef } from "react";
import { View, TextInput, Pressable, Text, useColorScheme, type TextInput as TextInputType } from "react-native";
import * as Haptics from "expo-haptics";
import { SuggestionsList } from "./SuggestionsList";
import { INGREDIENT_CATEGORIES } from "@/lib/constants";
import { normalizeIngredient } from "@/lib/utils/ingredients";

type IngredientInputProps = {
  readonly onAdd: (ingredient: string) => void;
  readonly hasIngredient: (ingredient: string) => boolean;
  readonly disabled?: boolean;
  readonly ingredientsList?: ReadonlyArray<string>;
  readonly placeholder?: string;
};

const ALL_MEAL_INGREDIENTS: ReadonlyArray<string> = Object.values(INGREDIENT_CATEGORIES)
  .flatMap((category) => [...category.items]);

const MAX_SUGGESTIONS = 6;

export const IngredientInput = ({
  onAdd,
  hasIngredient,
  disabled = false,
  ingredientsList = ALL_MEAL_INGREDIENTS,
  placeholder = "Type an ingredient...",
}: IngredientInputProps): React.JSX.Element => {
  const colorScheme = useColorScheme();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInputType>(null);

  const suggestions = useMemo((): ReadonlyArray<string> => {
    if (query.trim().length < 1) {
      return [];
    }

    const normalized = normalizeIngredient(query);

    return ingredientsList
      .filter(
        (ingredient) =>
          normalizeIngredient(ingredient).includes(normalized) &&
          !hasIngredient(ingredient),
      )
      .slice(0, MAX_SUGGESTIONS);
  }, [query, hasIngredient, ingredientsList]);

  const handleAdd = useCallback(
    (ingredient: string): void => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onAdd(ingredient);
      setQuery("");
      inputRef.current?.focus();
    },
    [onAdd],
  );

  const handleSubmit = useCallback((): void => {
    const trimmed = query.trim();

    if (trimmed.length === 0) {
      return;
    }

    if (hasIngredient(trimmed)) {
      return;
    }

    handleAdd(trimmed);
  }, [query, hasIngredient, handleAdd]);

  return (
    <View className="relative z-10">
      <View
        className={`flex-row items-center rounded-card border bg-surface px-4 dark:bg-surface-dark ${
          isFocused ? "border-accent dark:border-accent-on-dark" : "border-border dark:border-border-dark"
        }`}
      >
        <Text className="mr-2 text-lg">🔍</Text>
        <TextInput
          ref={inputRef}
          value={query}
          onChangeText={setQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onSubmitEditing={handleSubmit}
          placeholder={placeholder}
          placeholderTextColor={colorScheme === "dark" ? "#8A7B6D" : "#9B8B7D"}
          returnKeyType="done"
          autoCapitalize="words"
          autoCorrect={false}
          editable={!disabled}
          accessibilityLabel="Ingredient search input"
          accessibilityHint="Type an ingredient name to search"
          className="flex-1 py-3.5 text-base text-foreground dark:text-foreground-on-dark"
        />
        {query.length > 0 && (
          <Pressable
            onPress={() => setQuery("")}
            accessibilityLabel="Clear input"
            className="ml-2 rounded-full p-1"
          >
            <Text className="text-sm text-foreground-muted dark:text-foreground-on-dark-muted">✕</Text>
          </Pressable>
        )}
      </View>
      <SuggestionsList
        suggestions={suggestions}
        onSelect={handleAdd}
        visible={isFocused && suggestions.length > 0}
      />
    </View>
  );
};
