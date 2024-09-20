// components/CustomDrawerContent.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { ScreenName } from "../constants/screenName";
import { images } from "../constants/images";
import { themePrimaryColor } from "../constants/constant";
import { useSelector } from "react-redux";

const CustomDrawerContent = (props) => {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    setMenuExpanded(!menuExpanded);
    Animated.timing(animatedHeight, {
      toValue: menuExpanded ? 0 : 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const userdata = useSelector((state) => state.auth.userData);
  const handleViewProfile = () => {
    props.navigation.navigate(ScreenName.profile);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileSection}>
        <Image source={images.companyLogo} style={styles.avatar} />
        <Text numberOfLines={1} style={styles.name}>
          {userdata?.CompanyName}
        </Text>
        <Text numberOfLines={1} style={styles.email}>
          {userdata?.DepartmentName}
        </Text>
        <TouchableOpacity onPress={handleViewProfile}>
          <Text className="p-2 rounded-lg" style={styles.viewProfile}>
            View Profile
          </Text>
        </TouchableOpacity>
      </View>
      <DrawerItem
        label="Dashboard"
        onPress={() => props.navigation.navigate(ScreenName.dashboard)}
      />
      <View>
        <TouchableOpacity onPress={toggleMenu}>
          <Text className="font-gsemibold" style={styles.menuTitle}>
            Reports
          </Text>
        </TouchableOpacity>
        <Animated.View style={{ height: animatedHeight }}>
          <View>
            <DrawerItem
              label="Submenu 1"
              onPress={() => console.log("Submenu 1 clicked")}
            />
            <DrawerItem
              label="Submenu 2"
              onPress={() => console.log("Submenu 2 clicked")}
            />
          </View>
        </Animated.View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  menuTitle: {
    fontSize: 18,
    padding: 10,
    backgroundColor: "#eee",
  },
  profileSection: {
    backgroundColor: themePrimaryColor,
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: "white",
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
  viewProfile: {
    fontSize: 14,
    color: "white",
    borderWidth: 1,
  },
});

export default CustomDrawerContent;
