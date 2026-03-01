import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import { ENTERING } from "@/lib/motion";

type RecipeHeroProps = {
  readonly name: string;
  readonly imageUri: string;
  readonly badges: ReadonlyArray<string>;
};

export const RecipeHero = ({
  name,
  imageUri,
  badges,
}: RecipeHeroProps): React.JSX.Element => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <Animated.View entering={ENTERING.fadeIn} className="relative">
      <Image
        source={{ uri: imageUri }}
        style={{ width: "100%", height: 340 }}
        contentFit="cover"
        transition={300}
        placeholder={{ blurhash: "LKO2?U%2Tw=w]~RBVZRi};RPxuwH" }}
        accessibilityLabel={`Photo of ${name}`}
      />

      <View
        style={{ paddingTop: insets.top }}
        className="absolute left-0 right-0 top-0 h-24 bg-black/40"
      >
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="ml-4 mt-2 h-10 w-10 items-center justify-center rounded-full bg-black/30"
        >
          <Text className="text-lg text-white">←</Text>
        </Pressable>
      </View>

      <View className="absolute bottom-0 left-0 right-0 justify-end bg-black/50 p-5 pt-16">
        <View className="mb-2 flex-row flex-wrap gap-2">
          {badges
            .filter((badge) => badge.length > 0)
            .map((badge) => (
              <View key={badge} className="rounded-chip bg-white/20 px-3 py-1">
                <Text className="text-xs font-semibold text-white">
                  {badge}
                </Text>
              </View>
            ))}
        </View>
        <Text
          className="font-display-bold text-2xl text-white"
          accessibilityRole="header"
        >
          {name}
        </Text>
      </View>
    </Animated.View>
  );
};
