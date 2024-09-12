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
import { Loader } from "../../componenets/Loading";
import CustomBtn from "../../componenets/CustomBtn";
import { ScreenName } from "../../constants/screenName";
import { Icon } from "../../constants/Icon";

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

  useEffect(() => {
    dispatch(getCompany());
    dispatch(getYearDuration());
    dispatch(getPremise());
    dispatch(getLocation());
  }, []);

  const handleConfigSubmit = async () => {
    await dispatch(
      saveCompanyConfig(userData, company, duration, premise, location)
    );
    await navigation.navigate(ScreenName.dashboard);
    setCompany("");
    setPremise("");
    setDuration("");
    setLocation("");
  };

  // const companyList = [
  //   {
  //     Company_ID: 1,
  //     Company_name: "JANANI DESIGNER",
  //   },
  //   {
  //     Company_ID: 3,
  //     Company_name: "JANANI DREAMS TEXFAB PVT LTD",
  //   },
  //   {
  //     Company_ID: 2,
  //     Company_name: "NATION TRENDZ",
  //   },
  // ];

  // const yearDurationList = [
  //   {
  //     Year_ID: 6,
  //     Year: "01-04-2024 - 31-03-2025",
  //   },
  //   {
  //     Year_ID: 5,
  //     Year: "01-04-2023 - 31-03-2024",
  //   },
  //   {
  //     Year_ID: 4,
  //     Year: "01-04-2022 - 31-03-2023",
  //   },
  //   {
  //     Year_ID: 3,
  //     Year: "01-04-2021 - 31-03-2022",
  //   },
  //   {
  //     Year_ID: 2,
  //     Year: "01-04-2020 - 31-03-2021",
  //   },
  // ];

  // const premiseList = [
  //   {
  //     Premise_Id: 1,
  //     Premise_Name: "SURAT",
  //   },
  // ];

  // const locationList = [
  //   {
  //     dept_id: 1,
  //     dept_name: "M4",
  //   },
  //   {
  //     dept_id: 2,
  //     dept_name: "SALES OFFICE",
  //   },
  // ];

  return (
    <>
      {loading && <Loader />}
      <SafeAreaView style={styles.container}>
        <ScrollView nestedScrollEnabled>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.IconContainer}
              onPress={() => navigation.goBack()}
            >
              <Image source={Icon.arrowRound} style={styles.backIcon} />
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
              DisplayField="Company_name"
              valueField="Company_ID"
              renderData={companyList}
              LeftIcon={Icon.companyIcon}
              label="Company"
              onchangeValue={(value) => {
                setCompany(value);
                console.log("Company value :", value);
              }}
            />
            <DropdownwithIcon
              DisplayField="Premise_Name"
              valueField="Premise_Id"
              renderData={premiseList}
              LeftIcon={Icon.primiseIcon}
              label="Premise"
              onchangeValue={(value) => {
                setPremise(value);
                console.log("Premise value :", value);
              }}
            />
            <DropdownwithIcon
              DisplayField="Year"
              valueField="Year_ID"
              renderData={yearDurationList}
              LeftIcon={Icon.yearIcon}
              label="Year"
              onchangeValue={(value) => {
                setDuration(value);
                console.log("year value :", value);
              }}
            />
            <DropdownwithIcon
              DisplayField="dept_name"
              valueField="dept_id"
              renderData={locationList}
              LeftIcon={Icon.departmentIcon}
              label="Department"
              onchangeValue={(value) => {
                setLocation(value);
                console.log("Department value :", value);
              }}
            />
          </View>
        </ScrollView>
        <CustomBtn
          Customstyle={{
            position: "absolute",
            alignSelf: "center",
            bottom: hp(3),
          }}
          title="Save Configuration"
          onPressHandler={handleConfigSubmit}
        />
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
    gap: hp(4),
  },
});
