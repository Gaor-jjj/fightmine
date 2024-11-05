import { Stack, SplashScreen } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "PixelifySans-Bold": require("../assets/fonts/PixelifySans-Bold.ttf"),
    "PixelifySans-Medium": require("../assets/fonts/PixelifySans-Medium.ttf"),
    "PixelifySans-Regular": require("../assets/fonts/PixelifySans-Regular.ttf"),
    "PixelifySans-SemiBold": require("../assets/fonts/PixelifySans-SemiBold.ttf")
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="(auth)" options={{headerShown: false}}/>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    </Stack>
  )
}

export default RootLayout