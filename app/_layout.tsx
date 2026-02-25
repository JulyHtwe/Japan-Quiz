import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { QuizResultProvider } from "../components/quizResultContext";

// export const unstable_settings = {
//   anchor: "(tabs)",
// };

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QuizResultProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login"/> 
          <Stack.Screen name="index"/>
          <Stack.Screen name="categories" options={{ presentation: "modal" }} />
          <Stack.Screen name="question" options={{ presentation: "modal" }} />
          <Stack.Screen name="correct" options={{ presentation: "modal" }} />
          <Stack.Screen name="incorrect" options={{ presentation: "modal" }} />
          <Stack.Screen name="complete" options={{ presentation: "modal" }} />
          <Stack.Screen name="result" options={{ presentation: "modal" }} />
        </Stack>

        <StatusBar style="auto" />
      </ThemeProvider>
    </QuizResultProvider>
  );
}
