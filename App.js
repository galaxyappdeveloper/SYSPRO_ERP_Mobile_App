import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthRoutes from "./src/navigation/AuthRoutes";
import { Provider } from "react-redux";
import store from "./src/redux/store/store";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { font } from "./src/constants/fonts";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded, error] = useFonts(font);

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" backgroundColor="" />
      <Provider store={store}>
        <NavigationContainer>
          <AuthRoutes />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
