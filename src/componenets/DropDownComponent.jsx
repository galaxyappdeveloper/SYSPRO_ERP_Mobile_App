import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const DropdownComponent = ({
  LeftIcon,
  rightIcon,
  label,
  renderData,
  DisplayField,
  valueField,
  customStyle,
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && { color: "blue" }]}>{label}</Text>
    );
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown,customStyle, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={renderData}
        labelField={DisplayField}
        valueField={valueField}
        placeholder={!isFocus ? "Select" : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Image
            style={styles.icon}
            source={LeftIcon}
            color={isFocus ? "blue" : "black"}
            name="Safety"
            contentFit="contain"
          />
        )}
        renderRightIcon={() => (
          <Image
            style={styles.icon}
            source={rightIcon}
            color={isFocus ? "blue" : "black"}
            name="Safety"
            contentFit="contain"
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    top: hp(-2),
    backgroundColor: "white",
    padding: 16,
  },

  dropdown: {
    width: wp(90),
    height: hp(8.5),
    borderColor: "#E7EAF3",
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 8,
  },
  icon: {
    width: wp(7),
    height: hp(5),
    marginLeft: hp(2),
    marginRight: hp(1.5),
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    position: "absolute",
    paddingHorizontal: wp(1.9),
    top: hp(0.5),
    zIndex: 999,
    left: wp(10),
    backgroundColor: "white",
    color: "#5C658C",
  },
  placeholderStyle: {
    padding: hp(1.5),
    fontFamily: "Gilroy-Medium",
    borderColor: "#E7EAF3",
    color: "#5C658C",
    fontSize: hp("2%"),
    borderLeftWidth: 1,
    alignSelf: "center",
  },
  selectedTextStyle: {
    padding: hp(1.5),
    fontFamily: "Gilroy-Medium",
    borderColor: "#E7EAF3",
    color: "#5C658C",
    fontSize: hp("2%"),
    borderLeftWidth: 1,
    alignSelf: "center",
  },
});
