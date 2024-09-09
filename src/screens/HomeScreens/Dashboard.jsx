import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { commonStyle } from "../../constants/commonStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { userData } from "../../constants/constant";

const Dashboard = ({ navigation }) => {
  const [companyDetails, setCompanyDetails] = useState(null);

  const userdata = useSelector((state) => state.userData);

  useEffect(() => {
    const getUserDataFromStorage = async () => {
      try {
        if (userdata) {
          setCompanyDetails(userdata);
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

  return (
    <View
      style={[
        commonStyle.container,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <Text className="text-black text-xl font-gmedium">
        Welcome, {companyDetails?.CompanyName}👋
      </Text>
    </View>
  );
};

export default Dashboard;
