import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CompanyConfig = () => {
  const [selectedCompany, setSelectedCompany] = useState("Select");
  const [isClicked, setIsClicked] = useState(false);
  const [data, SetData] = useState("Company Name");

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <Image
              resizeMode="contain"
              style={styles.circleImage}
              source={require("../../../assets/images/circle.png")}
            />
          </View>
          <View>
            <Image
              resizeMode="contain"
              style={styles.leftArrow}
              source={require("../../../assets/images/left_arrow.png")}
            />
          </View>
          <Text style={styles.headerConfigruation}>Configuration</Text>
          <Text style={styles.CompanyConfigHeader}>
            Company Configuration Setting
          </Text>
          <View style={styles.companyContainer}>
            <View>
              <Image
                resizeMode="contain"
                style={styles.buliding}
                source={require("../../../assets/images/building.png")}
              />
            </View>
            <View style={styles.lableContainer}>
              <Text style={styles.labelText}>Company</Text>
            </View>
            <TouchableOpacity
              style={styles.dropDownSelector}
              onPress={() => setIsClicked(!isClicked)}
            >
              <Text>{selectedCompany}</Text>
              {isClicked ? (
                <Image
                  source={require("../../../assets/images/drop-down-arrow.png")}
                  style={styles.icon}
                />
              ) : (
                <Image
                  source={require("../../../assets/images/drop-down-arrow.png")}
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>

            {isClicked ? (
              <View style={styles.dropDownArea}>
                <FlatList
                  data={data}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        style={styles.companyItem}
                        onPress={() => {
                          setSelectedCompany(item);
                          setIsClicked(!isClicked);
                        }}
                      >
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            ) : null}
          </View>

          <View style={styles.companySecondContainer}>
            <View>
              <Image
                resizeMode="contain"
                style={styles.buliding}
                source={require("../../../assets/images/building.png")}
              />
            </View>
            <View style={styles.lableContainer}>
              <Text style={styles.labelText}>Company</Text>
            </View>
            <TouchableOpacity
              style={styles.dropDownSelector}
              onPress={() => setIsClicked(!isClicked)}
            >
              <Text>{selectedCompany}</Text>
              {isClicked ? (
                <Image
                  source={require("../../../assets/images/drop-down-arrow.png")}
                  style={styles.icon}
                />
              ) : (
                <Image
                  source={require("../../../assets/images/drop-down-arrow.png")}
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>

            {isClicked ? (
              <View style={styles.dropDownArea}>
                <FlatList
                  data={data}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        style={styles.companyItem}
                        onPress={() => {
                          setSelectedCompany(item);
                          setIsClicked(!isClicked);
                        }}
                      >
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            ) : null}
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
    backgroundColor: "#FFFFFF",
  },
  circleImage: {
    width: wp(20),
    height: hp(7),
    top: hp(5),
    position: "absolute",
    left: wp(2),
  },
  leftArrow: {
    width: wp(15),
    height: hp(2),
    top: hp(7.5),
    position: "absolute",
    left: wp(4.5),
    borderWidth: 5,
  },
  headerConfigruation: {
    alignSelf: "center",
    top: hp(6),
    fontSize: hp(3),
    fontWeight: "400",
  },
  CompanyConfigHeader: {
    fontSize: hp(2),
    fontWeight: "500",
    top: hp(17),
    alignSelf: "center",
    color: "#021121",
  },
  companyContainer:{
    bottom: hp(11),
  },
  buliding: {
    width: wp(7),
    height: hp(5),
    top: hp(34),
    left: wp(10),
    position: "absolute",
    borderRightWidth: 5,
  },

  dropDownSelector: {
    borderWidth: 1,
    width: wp(90),
    height: hp(8),
    borderRadius: 16,
    alignSelf: "center",
    marginTop: hp(30),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: wp(17),
    paddingRight: wp(3),
    borderColor: "#E7EAF3",
  },
  lableContainer: {
    zIndex: 1,
    width: wp(18),
    top: hp(31.2),
    left: wp(12),
    backgroundColor: "white",
  },
  labelText: {
    fontSize: hp(1.8),
    fontWeight: "100",
    color: "5C658C",
    backgroundColor: "white",
    alignSelf: "center",
  },
  icon: {
    width: wp(5),
    height: hp(3),
  },
  dropDownArea: {
    height: hp(40),
    width: wp(90),
    borderRadius: 20,
    borderColor: "#E7EAF3",
    marginTop: hp(2),
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 5,
  },

  companyItem: {
    width: wp(80),
    height: hp(7),
    borderBottomWidth: 0.2,
    borderBottomColor: "#8e8e8e",
    alignSelf: "center",
    justifyContent: "center",
  },
  companySecondContainer:{
    bottom: hp(14),
  },
});
