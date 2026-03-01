import { View, Text, Pressable, Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { SPRING_CONFIGS, PRESS_SCALE } from "@/lib/motion";

const TAB_ICONS = {
  index: { active: "🍳", inactive: "🍳" },
  cocktails: { active: "🍹", inactive: "🍹" },
} as const;

const TAB_LABELS = {
  index: "Ricette",
  cocktails: "Cocktail",
} as const;

type TabRouteName = keyof typeof TAB_ICONS;

type TabItemProps = {
  readonly isFocused: boolean;
  readonly label: string;
  readonly icon: string;
  readonly onPress: () => void;
  readonly onLongPress: () => void;
};

type RouteEntry = {
  readonly key: string;
  readonly name: string;
};

export type TabBarProps = {
  readonly state: {
    readonly index: number;
    readonly routes: ReadonlyArray<RouteEntry>;
  };
  readonly navigation: {
    readonly emit: (event: {
      readonly type: string;
      readonly target: string;
      readonly canPreventDefault: boolean;
    }) => { readonly defaultPrevented: boolean };
    readonly navigate: (name: string) => void;
  };
  readonly [key: string]: unknown;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TabItem = ({
  isFocused,
  label,
  icon,
  onPress,
  onLongPress,
}: TabItemProps): React.JSX.Element => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const indicatorStyle = useAnimatedStyle(() => ({
    opacity: isFocused ? 1 : 0,
    transform: [{ scaleX: isFocused ? 1 : 0 }],
  }));

  const handlePressIn = (): void => {
    scale.value = withSpring(PRESS_SCALE, SPRING_CONFIGS.snappy);
  };

  const handlePressOut = (): void => {
    scale.value = withSpring(1, SPRING_CONFIGS.snappy);
  };

  const handlePress = (): void => {
    if (!isFocused) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <AnimatedPressable
      style={animatedStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      onLongPress={onLongPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={`${label} tab`}
      className="flex-1 items-center justify-center py-2"
    >
      <Text className="mb-1 text-2xl">{icon}</Text>
      <Text
        className={`text-xs font-semibold ${isFocused ? "text-accent dark:text-accent-on-dark" : "text-foreground-muted dark:text-foreground-on-dark-muted"}`}
      >
        {label}
      </Text>
      <Animated.View
        style={indicatorStyle}
        className="mt-1 h-1 w-6 rounded-full bg-accent dark:bg-accent-on-dark"
      />
    </AnimatedPressable>
  );
};

export const TabBar = ({
  state,
  navigation,
}: TabBarProps): React.JSX.Element => {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, Platform.OS === "android" ? 16 : 8);

  return (
    <View
      style={{ paddingBottom: bottomPadding }}
      className="flex-row border-t border-border bg-surface px-6 pt-2 dark:border-border-dark dark:bg-surface-dark"
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const routeName = route.name as TabRouteName;
        const icons = TAB_ICONS[routeName];
        const label = TAB_LABELS[routeName];

        if (!icons || !label) {
          return null;
        }

        const handlePress = (): void => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const handleLongPress = (): void => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
            canPreventDefault: false,
          });
        };

        return (
          <TabItem
            key={route.key}
            isFocused={isFocused}
            label={label}
            icon={isFocused ? icons.active : icons.inactive}
            onPress={handlePress}
            onLongPress={handleLongPress}
          />
        );
      })}
    </View>
  );
};
