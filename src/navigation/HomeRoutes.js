import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { ScreenName } from "../constants/screenName";
import Dashboard from "../screens/HomeScreens/Dashboard";
import Profile, { DrawerProfile } from "../screens/HomeScreens/Profile";
import { Image, StyleSheet, Text, View } from "react-native";
import CompanyConfig from "../screens/HomeScreens/CompanyConfig";

const Drawer = createDrawerNavigator();

const HomeRoutes = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {},
        statusBarColor: "red",
      }}
      drawerContent={(props) => <DrawerProfile {...props} />}
    >
      <Drawer.Screen
        options={{ headerShown: true }}
        name={ScreenName.dashboard}
        component={Dashboard}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={ScreenName.profile}
        component={Profile}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name={ScreenName.companyConfig}
        component={CompanyConfig}
      />
    </Drawer.Navigator>
  );
};

export default HomeRoutes;

// Styles
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileSection: {
    backgroundColor: "#1E90FF",
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
  },
});
