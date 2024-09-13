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
import DropdownComponent from "../../componenets/DropDownComponent";

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
    dispatch(saveCompanyConfig(userData, company, duration, premise, location));
    await navigation.navigate(ScreenName.dashboard);
    setCompany("");
    setPremise("");
    setDuration("");
    setLocation("");
  };

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
            <DropdownComponent
              DisplayField="Company_name"
              valueField="Company_ID"
              renderData={companyList}
              LeftIcon={Icon.companyIcon}
              rightIcon={Icon.dropDownIcon}
              label="Company"
              onChangeValue={(value) => {
                setCompany(value);
                console.log("Company value :", value);
              }}
            />
            <DropdownComponent
              DisplayField="Premise_Name"
              valueField="Premise_Id"
              renderData={premiseList}
              LeftIcon={Icon.primiseIcon}
              rightIcon={Icon.dropDownIcon}
              label="Premise"
              onChangeValue={(value) => {
                setPremise(value);
                console.log("Premise value :", value);
              }}
            />
            <DropdownComponent
              DisplayField="Year"
              valueField="Year_ID"
              renderData={yearDurationList}
              LeftIcon={Icon.yearIcon}
              rightIcon={Icon.dropDownIcon}
              label="Year"
              onChangeValue={(value) => {
                setDuration(value);
                console.log("year value :", value);
              }}
            />
            <DropdownComponent
              DisplayField="dept_name"
              valueField="dept_id"
              renderData={locationList}
              LeftIcon={Icon.departmentIcon}
              rightIcon={Icon.dropDownIcon}
              label="Department"
              onChangeValue={(value) => {
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
  },
});
