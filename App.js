import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthRoutes from "./src/navigation/AuthRoutes";
import { Provider as StoreProvider } from "react-redux";
import store from "./src/redux/store/store";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { font } from "./src/constants/fonts";
import Routes from "./src/navigation/Routes";
import { themePrimaryColor } from "./src/constants/constant";

// SplashScreen.preventAutoHideAsync();
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

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: themePrimaryColor,
      secondary: "green",
    },
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" backgroundColor="" />
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
}
