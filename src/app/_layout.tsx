import "@/styles/global.css";

import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { IngredientsProvider, CocktailIngredientsProvider } from "@/hooks/use-ingredients";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 30,
    },
  },
});

export default function RootLayout(): React.JSX.Element | null {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    PlayfairDisplay: require("../../assets/fonts/PlayfairDisplay.ttf"),
    "PlayfairDisplay-Bold": require("../../assets/fonts/PlayfairDisplay-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} className={colorScheme === "dark" ? "dark" : ""}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <IngredientsProvider>
            <CocktailIngredientsProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
            </CocktailIngredientsProvider>
          </IngredientsProvider>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
