import { View, Text, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { ItemCard, type CardItem } from "./ItemCard";
import { ResultsSkeleton } from "./ResultsSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { fadeInDownDelayed } from "@/lib/motion";

type ResultsListProps = {
  readonly results: ReadonlyArray<CardItem>;
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly isEmpty: boolean;
  readonly hasIngredients: boolean;
  readonly onRetry: () => void;
  readonly routePrefix: "/recipe" | "/cocktail";
  readonly itemLabel?: string;
};

export const ResultsList = ({
  results,
  isLoading,
  isError,
  isEmpty,
  hasIngredients,
  onRetry,
  routePrefix,
  itemLabel = "recipe",
}: ResultsListProps): React.JSX.Element | null => {
  if (!hasIngredients) {
    return null;
  }

  if (isLoading) {
    return <ResultsSkeleton />;
  }

  if (isError) {
    return (
      <View className="py-8">
        <EmptyState
          icon="😵"
          title="Something went wrong"
          description={`We couldn't fetch ${itemLabel}s right now. Check your connection and try again.`}
        />
        <Animated.View
          entering={fadeInDownDelayed(200)}
          className="items-center"
        >
          <Pressable
            onPress={onRetry}
            accessibilityRole="button"
            accessibilityLabel="Retry search"
            className="rounded-button bg-accent px-6 py-3 active:bg-accent-dark"
          >
            <Text className="font-semibold text-white">Try again</Text>
          </Pressable>
        </Animated.View>
      </View>
    );
  }

  if (isEmpty) {
    return (
      <EmptyState
        icon={routePrefix === "/cocktail" ? "🍹" : "🍽️"}
        title={`No ${itemLabel}s found`}
        description="Try different ingredients or remove some to broaden your search."
      />
    );
  }

  const [featured, ...rest] = results;

  return (
    <View className="py-4">
      <Text className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground-muted dark:text-foreground-on-dark-muted">
        {results.length} {itemLabel}{results.length !== 1 ? "s" : ""} found
      </Text>

      {featured && (
        <ItemCard item={featured} index={0} variant="featured" routePrefix={routePrefix} />
      )}

      {rest.map((item, idx) => (
        <ItemCard
          key={item.id}
          item={item}
          index={idx + 1}
          variant="compact"
          routePrefix={routePrefix}
        />
      ))}
    </View>
  );
};
