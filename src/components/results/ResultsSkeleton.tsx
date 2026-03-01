import { View } from "react-native";
import Animated from "react-native-reanimated";
import { Skeleton } from "@/components/ui/Skeleton";
import { ENTERING } from "@/lib/motion";

export const ResultsSkeleton = (): React.JSX.Element => (
  <Animated.View entering={ENTERING.fadeIn} className="py-4">
    <View className="mb-4 overflow-hidden rounded-card bg-surface dark:bg-surface-dark">
      <Skeleton height={220} borderRadius={0} />
      <View className="p-4">
        <Skeleton width="70%" height={24} className="mb-2" />
        <Skeleton width={120} height={28} borderRadius={20} />
      </View>
    </View>

    {Array.from({ length: 3 }).map((_, idx) => (
      <View
        key={`skeleton-${idx}`}
        className="mb-3 flex-row overflow-hidden rounded-card bg-surface dark:bg-surface-dark"
      >
        <Skeleton width={100} height={100} borderRadius={0} />
        <View className="flex-1 justify-center p-3">
          <Skeleton width="80%" height={18} className="mb-2" />
          <Skeleton width={60} height={22} borderRadius={20} />
        </View>
      </View>
    ))}
  </Animated.View>
);
