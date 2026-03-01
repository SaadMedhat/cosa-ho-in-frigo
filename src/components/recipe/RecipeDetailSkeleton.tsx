import { View } from "react-native";
import Animated from "react-native-reanimated";
import { Skeleton } from "@/components/ui/Skeleton";
import { ENTERING } from "@/lib/motion";

export const RecipeDetailSkeleton = (): React.JSX.Element => (
  <Animated.View entering={ENTERING.fadeIn} className="flex-1 bg-background dark:bg-background-dark">
    <Skeleton height={340} borderRadius={0} />

    <View className="px-5 py-4">
      <Skeleton width="80%" height={28} className="mb-3" />
      <View className="flex-row gap-2 mb-6">
        <Skeleton width={80} height={26} borderRadius={20} />
        <Skeleton width={80} height={26} borderRadius={20} />
      </View>

      <Skeleton width="60%" height={24} className="mb-3" />
      <Skeleton width="100%" height={48} borderRadius={16} className="mb-4" />

      {Array.from({ length: 6 }).map((_, idx) => (
        <View key={`skel-ing-${idx}`} className="flex-row items-center py-3">
          <Skeleton width={24} height={24} borderRadius={12} className="mr-3" />
          <View className="flex-1">
            <Skeleton width="50%" height={18} className="mb-1" />
            <Skeleton width="30%" height={14} />
          </View>
        </View>
      ))}

      <Skeleton width="60%" height={24} className="mt-6 mb-4" />

      {Array.from({ length: 4 }).map((_, idx) => (
        <View key={`skel-step-${idx}`} className="flex-row mb-4">
          <Skeleton width={28} height={28} borderRadius={14} className="mr-3" />
          <View className="flex-1">
            <Skeleton width="100%" height={16} className="mb-1" />
            <Skeleton width="80%" height={16} />
          </View>
        </View>
      ))}
    </View>
  </Animated.View>
);
