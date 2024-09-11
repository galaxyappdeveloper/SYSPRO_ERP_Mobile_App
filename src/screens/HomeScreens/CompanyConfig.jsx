import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icons } from "../../constants/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompany,
  getLocation,
  getPremise,
  getYearDuration,
  saveCompanyConfig,
} from "../../Actions/configuration/configAction";
import DropdownwithIcon from "../../componenets/DropdownwithIcon";
import { Image } from "expo-image";

const CompanyConfig = ({ navigation }) => {
  const [company, setCompany] = useState("");
  const [duration, setDuration] = useState("");
  const [premise, setPremise] = useState("");
  const [location, setLocation] = useState("");

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.config.loading);
  const companyList = useSelector((state) => state.config.company);
  const yearDurationList = useSelector((state) => state.config.yearDuration);
  const premiseList = useSelector((state) => state.config.premise);
  const locationList = useSelector((state) => state.config.location);
  const userData = useSelector((state) => state.auth.userData);

  // console.log("Company Data : ", companyList);
  // console.log("year Data : ", yearDurationList);
  // console.log("premise Data : ", premiseList);
  // console.log("location Data : ", locationList);
  // console.log("user Data : ", userData);

  // useEffect(() => {
  //   dispatch(getCompany());
  //   dispatch(getYearDuration());
  //   dispatch(getPremise());
  //   dispatch(getLocation());
  // }, []);

  // const handleConfigSubmit = () => {
  //   dispatch(saveCompanyConfig(userData, company, duration, premise, location));
  //   setCompany("");
  //   setPremise("");
  //   setDuration("");
  //   setLocation("");
  // };

  const [selectedCompany, setSelectedCompany] = useState("Select");
  const [isClicked, setIsClicked] = useState(false);
  const [data, SetData] = useState("Company Name");

  const companyData = [
    {
      Company_ID: 1,
      Company_name: "JANANI DESIGNER",
    },
    {
      Company_ID: 3,
      Company_name: "JANANI DREAMS TEXFAB PVT LTD",
    },
    {
      Company_ID: 2,
      Company_name: "NATION TRENDZ",
    },
    {
      Company_ID: 3,
      Company_name: "JANANI DREAMS TEXFAB PVT LTD",
    },
    {
      Company_ID: 2,
      Company_name: "NATION TRENDZ",
    },
    {
      Company_ID: 3,
      Company_name: "JANANI DREAMS TEXFAB PVT LTD",
    },
    {
      Company_ID: 2,
      Company_name: "NATION TRENDZ",
    },
    {
      Company_ID: 3,
      Company_name: "JANANI DREAMS TEXFAB PVT LTD",
    },
    {
      Company_ID: 2,
      Company_name: "NATION TRENDZ",
    },
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView nestedScrollEnabled>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.IconContainer}
              onPress={() => navigation.goBack()}
            >
              <Image source={Icons.arrowRound} style={styles.backIcon} />
            </TouchableOpacity>

            <Text className="font-gregular" style={styles.headerConfigruation}>
              Configuration
            </Text>
          </View>

          <Text className="font-gsemibold" style={styles.CompanyConfigHeader}>
            Company Configuration Setting
          </Text>
          <View style={styles.dropDownSelectors}>
            <DropdownwithIcon
              renderData={companyData}
              LeftIcon={Icons.companyIcon}
              rightIcon={Icons.dropDownIcon}
              label="Company"
            />
            <DropdownwithIcon
              renderData={companyData}
              LeftIcon={Icons.companyIcon}
              rightIcon={Icons.dropDownIcon}
              label="Premise"
            />
            <DropdownwithIcon
              renderData={companyData}
              LeftIcon={Icons.companyIcon}
              rightIcon={Icons.dropDownIcon}
              label="Year"
            />
            <DropdownwithIcon
              renderData={companyData}
              LeftIcon={Icons.companyIcon}
              rightIcon={Icons.dropDownIcon}
              label="Department"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CompanyConfig;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  header: {
    flexDirection: "row",
    margin: 18,
    height: hp(7),
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: hp(7),
    height: hp(7),
    borderWidth: 1,
    borderRadius: 50,
    position: "absolute",
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  IconContainer: {
    position: "absolute",
    left: 0,
  },
  backIcon: {
    width: hp(7),
    height: hp(7),
  },
  headerConfigruation: {
    fontSize: hp(3),
    fontWeight: "400",
  },
  CompanyConfigHeader: {
    fontSize: hp(2.5),
    alignSelf: "center",
    color: "#021121",
    marginTop: hp(6),
  },
  dropDownSelectors: {
    marginTop: hp(4),
    gap: hp(2),
  },
});
