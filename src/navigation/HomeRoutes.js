import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { ScreenName } from "../constants/screenName";
import Dashboard from "../screens/HomeScreens/Dashboard";
import Profile, { DrawerProfile } from "../screens/HomeScreens/Profile";
import { StyleSheet } from "react-native";
import CompanyConfig from "../screens/HomeScreens/CompanyConfig";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { Icon } from "../constants/Icon";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Greeting } from "../functions/Greeting";
import CustomDrawerContent from "./CustomDrawerContent";
import DashboardSummery from "../screens/DashboardScreens/DashboardSummery";
import SummeryDetails from "../screens/DashboardScreens/SummeryDetails";
import PdfReader from "../screens/DashboardScreens/PdfReader";

const Drawer = createDrawerNavigator();

const HomeRoutes = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "white",
        },
      }}
      // drawerContent={(props) => <DrawerProfile {...props} />
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        options={({ navigation, route }) => ({
          headerShown: true,
          headerStyle: { backgroundColor: "#e4eafa" },
          headerTitle: () => (
            <View>
              <Greeting customtextStyle={{ fontSize: hp(2) }} />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.settingContainer}
              onPress={() => navigation.navigate(ScreenName.companyConfig)}
            >
              <Image
                style={styles.settingIcon}
                source={Icon.settingIcon}
                contentFit="contain"
              />
            </TouchableOpacity>
          ),
        })}
        name={ScreenName.dashboard}
        component={Dashboard}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerLabel: () => null,
        }}
        name={ScreenName.profile}
        component={Profile}
      />
      <Drawer.Screen
        options={{ headerShown: false, drawerLabel: () => null }}
        name={ScreenName.companyConfig}
        component={CompanyConfig}
      />
      <Drawer.Screen
        options={{ headerShown: false, drawerLabel: () => null }}
        name={ScreenName.dashboardSummery}
        component={DashboardSummery}
      />
      <Drawer.Screen
        options={{ headerShown: false, drawerLabel: () => null }}
        name={ScreenName.summeryDetails}
        component={SummeryDetails}
      />
      <Drawer.Screen
        options={{ headerShown: false, drawerLabel: () => null }}
        name={ScreenName.pdfReader}
        component={PdfReader}
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
  settingContainer: {
    marginRight: wp(3.5),
  },
  settingIcon: {
    alignSelf: "center",
    width: hp(3),
    height: hp(3),
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
