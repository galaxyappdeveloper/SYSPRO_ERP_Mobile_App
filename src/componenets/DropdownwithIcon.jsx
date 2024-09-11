import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Icons } from "../constants/Icons";

const DropdownwithIcon = ({
  LeftIcon,
  rightIcon,
  label,
  renderData,
  customStyle,
}) => {
  const [selectedItem, setSelectedItem] = useState("Select");
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <View style={[styles.inputContainer, customStyle]}>
        <Image style={styles.leftIcon} source={LeftIcon} resizeMode="contain" />

        <View className="bg-white" style={styles.label}>
          <Text style={styles.labeltext}>{label}</Text>
        </View>

        <TouchableOpacity
          style={styles.selectBox}
          onPress={() => setIsClicked(!isClicked)}
        >
          <Text
            style={styles.inputText}
            numberOfLines={1}
            className="font-gmedium "
          >
            {selectedItem}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rightIconContainer}
          onPress={() => setIsClicked(!isClicked)}
        >
          <Image
            source={Icons.dropDownIcon}
            style={styles.Righticon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {isClicked ? (
        <View style={styles.dropDownArea}>
          <FlatList
            data={renderData}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={styles.companyItem}
                  onPress={() => {
                    setSelectedItem(item.Company_name);
                    setIsClicked(!isClicked);
                  }}
                >
                  <Text className="font-gmedium text-[#5C658C]">
                    {item.Company_name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
    </>
  );
};

export default DropdownwithIcon;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 15,
    borderColor: "#555555",
    borderRadius: 15,
    padding: 5,
    borderWidth: 0.5,
    textAlign: "center",
    paddingRight: 10,
    flexDirection: "row",
    alignSelf: "center",
    width: wp("90%"),
    height: hp(8.5),
  },
  leftIcon: {
    width: wp("7%"),
    height: hp("5%"),
    marginLeft: hp("2.5%"),
    alignSelf: "center",
  },
  label: {
    position: "absolute",
    paddingHorizontal: wp(1.9),
    top: hp(-1.4),
    left: wp(6),
    backgroundColor: "white",
    color: "#5C658C",
  },
  labeltext: {
    fontSize: hp("1.8%"),
    color: "#5C658C",
    textAlign: "center",
  },
  selectBox: {
    flex: 1,
    padding: 4,
    paddingLeft: 13,
    fontFamily: "Gilroy-Medium",
    marginLeft: wp(4),
    color: "#5C658C",
    fontSize: hp("2%"),
    alignSelf: "center",
    borderLeftWidth: 0.5,
    borderColor: "#555555",
    height: hp(4),
  },
  inputText: {
    fontSize: hp(2),
  },
  rightIconContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: hp(4),
    height: hp(4),
  },
  dropDownSelector: {
    borderWidth: 1,
    width: wp(90),
    height: hp(8),
    borderRadius: 16,
    alignSelf: "center",
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
  Righticon: {
    width: wp(5),
    height: hp(3),
  },
  dropDownArea: {
    maxHeight: hp(40),
    width: wp(90),
    borderRadius: 20,
    borderColor: "#E7EAF3",
    marginTop: hp(2),
    alignSelf: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    position: "absolute",
    zIndex: 6,
    top: hp(9),
  },
  companyItem: {
    width: wp(80),
    height: hp(7),
    borderBottomWidth: 0.5,
    borderBottomColor: "#78819D",
    alignSelf: "center",
    justifyContent: "center",
  },
  companySecondContainer: {
    bottom: hp(14),
  },
});
