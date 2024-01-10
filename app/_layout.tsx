import registerNNPushToken from 'native-notify';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Updates from 'expo-updates';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const appId = process.env.EXPO_PUBLIC_APP_ID;
const appToken = process.env.EXPO_PUBLIC_APP_TOKEN;
export default function RootLayout() {
  registerNNPushToken(appId, appToken);
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    async function onFetchUpdateAsync() {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        // You can also add an alert() to see the error message in case of an error when fetching updates.
        console.log(error);
      }
    }
    onFetchUpdateAsync();
  }, []);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const query = new QueryClient();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={query}>
        <ToastProvider>
          <RootLayoutNav />
        </ToastProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <StatusBar barStyle={'dark-content'} />
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="productDetail/[product]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="[printRef]" options={{ headerShown: false }} />
        <Stack.Screen
          name="deliveryDetails/[productId]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="return/[productId]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="map/[communityName]"
          options={{ headerShown: false }}
        />
      </Stack>
    </ThemeProvider>
  );
}
