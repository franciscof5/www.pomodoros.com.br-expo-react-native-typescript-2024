import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

// Garante que ao abrir o app a primeira rota será (tabs)
export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />

      <Stack screenOptions={{ headerShown: true }}>
        {/* TABS — tela principal */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* PÁGINAS SOLTAS (FORA DAS TABS) */}
        <Stack.Screen name="pages/Login" options={{ title: "Login", headerShown: true }} />
        <Stack.Screen name="pages/Focus" options={{ title: "Focus", headerShown: true }} />

        {/* MODAL opcional */}
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
