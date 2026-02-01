import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
<<<<<<< HEAD

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

=======
import { useColorScheme } from '@/hooks/use-color-scheme';

>>>>>>> f92cdc1 (json)
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
<<<<<<< HEAD
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
=======
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="categories"
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="question"
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
      </Stack>

>>>>>>> f92cdc1 (json)
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
