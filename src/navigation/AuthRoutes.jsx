import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/AuthScreen/Login";
import MpinAuth from "../screens/AuthScreen/MpinAuth";
import { ScreenName } from "../constants/screenName";
import Dashboard from "../screens/Dashboard";

const Auth = createNativeStackNavigator();
const AuthRoutes = () => {
  return (
    <Auth.Navigator
      initialRouteName={ScreenName.mpin}
      screenOptions={{ headerShown: false }}
    >
      <Auth.Screen name={ScreenName.mpin} component={MpinAuth} />
      <Auth.Screen name={ScreenName.login} component={Login} />
      <Auth.Screen name={ScreenName.dashboard} component={Dashboard} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
