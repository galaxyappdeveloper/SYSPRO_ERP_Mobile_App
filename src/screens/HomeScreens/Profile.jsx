import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Icon } from "react-native-elements";
import { themePrimaryColor, userData } from "../../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/authSlices/AuthSlice";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { images } from "../../constants/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { ScreenName } from "../../constants/screenName";
import { CommonActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { handleLogout } from "../../Actions/authActions/AuthAction";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [companyDetails, setCompanyDetails] = useState(null);
  const userdata = useSelector((state) => state.auth.userData);

  const userId = userdata?.Data?.UserID;
  useEffect(() => {
    const getUserDataFromStorage = async () => {
      try {
        if (userdata) {
          setCompanyDetails(userdata?.Data);
        } else {
          const jsonValue = await AsyncStorage.getItem(userData);
          const parsedData = jsonValue != null ? JSON.parse(jsonValue) : null;
          setCompanyDetails(parsedData);
        }
      } catch (e) {
        console.error("Error fetching company details:", e);
      }
    };

    getUserDataFromStorage();
  }, [userdata]);

  const navigate = (screenname) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: screenname }],
      })
    );
  };

  const handleSignOut = async () => {
    await dispatch(handleLogout(userId));
    await dispatch(logOut());
    navigate(ScreenName.mpin);
    AsyncStorage.clear();
  };

  const handleAllDeviceSignOut = async () => {
    await dispatch(handleLogout(userId));
    await dispatch(logOut());
    navigate(ScreenName.mpin);
    AsyncStorage.clear();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={images.companyLogo} style={styles.avatar} />
          <Text style={styles.name}>{companyDetails?.CompanyName}</Text>
          <Text style={styles.email}>{companyDetails?.DepartmentName}</Text>
        </View>

        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.infoBox}>
            <Icon
              name="location-pin"
              type="material"
              size={30}
              color={themePrimaryColor}
            />
            <Text style={styles.infoText}>Company Name : </Text>
            <Text style={styles.detailText}>{companyDetails?.CompanyName}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoBox}>
            <Icon
              name="badge"
              type="material"
              size={30}
              color={themePrimaryColor}
            />
            <Text style={styles.infoText}>Username : </Text>
            <Text style={styles.detailText}>{companyDetails?.UserName}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoBox}>
            <Icon
              name="business"
              type="material"
              size={30}
              color={themePrimaryColor}
            />
            <Text style={styles.infoText}>Type : </Text>
            <Text style={styles.detailText}>{companyDetails?.Access_Type}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleAllDeviceSignOut}
          style={styles.logoutAllButton}
        >
          <Text style={styles.logoutAllButtonText}>Logout All Devices</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export const DrawerProfile = (props) => {
  const user = {
    name: "Janani Designer",
    email: "M4",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  };

  const handleViewProfile = () => {
    props.navigation.navigate(ScreenName.profile);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileSection}>
        <Image source={images.companyLogo} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <TouchableOpacity onPress={handleViewProfile}>
          <Text className="p-2 rounded-lg" style={styles.viewProfile}>
            View Profile
          </Text>
        </TouchableOpacity>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: themePrimaryColor,
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "white",
  },
  name: {
    fontSize: hp(2.5),
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    fontSize: hp(1.8),
    color: "#fff",
    marginBottom: 10,
  },
  infoContainer: {
    padding: 20,
  },
  infoBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: hp(2),
    marginLeft: 10,
    fontWeight: "bold",
    color: "#333",
  },
  detailText: {
    fontSize: hp(1.8),
    marginLeft: "auto",
    color: "#666",
  },
  logoutButton: {
    backgroundColor: "tomato",
    padding: 15,
    borderRadius: 30,
    margin: 20,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: hp(2),
    fontWeight: "bold",
  },
  logoutAllButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 30,
    marginHorizontal: 20,
    alignItems: "center",
  },
  logoutAllButtonText: {
    color: "#fff",
    fontSize: hp(2),
    fontWeight: "bold",
  },
  screenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

export default Profile;
