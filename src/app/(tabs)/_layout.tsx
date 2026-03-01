import { Tabs } from "expo-router";
import { TabBar } from "@/components/ui/TabBar";
import type { TabBarProps } from "@/components/ui/TabBar";

export default function TabLayout(): React.JSX.Element {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props as TabBarProps} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="cocktails" />
    </Tabs>
  );
}
