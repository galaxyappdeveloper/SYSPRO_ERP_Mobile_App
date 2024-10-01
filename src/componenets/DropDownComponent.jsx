import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";

const DropdownComponent = ({
  LeftIcon,
  rightIcon,
  label,
  renderData,
  DisplayField,
  valueField,
  onChangeValue,
  customStyle,
  isRequired,
  requiredLabel,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && { color: "blue" }]}>
        {label} {isRequired && <Text style={styles.requiredLabelstar}>*</Text>}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      {requiredLabel ? (
        <Text style={styles.requiredLabelText}>{requiredLabel}</Text>
      ) : null}
      <Dropdown
        style={[
          styles.dropdown,
          customStyle,
          isFocus && { borderColor: "blue" },
          requiredLabel && { borderColor: "red" },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={renderData}
        labelField={DisplayField}
        valueField={valueField}
        placeholder={!isFocus ? "Select" : "..."}
        value={selectedItem}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          const selectedValue = item?.[valueField];
          setSelectedItem(selectedValue);
          setIsFocus(false);
          if (onChangeValue) {
            onChangeValue(selectedValue);
          }
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
            style={[
              styles.icon,
              { transform: [{ rotate: isFocus ? "180deg" : "0deg" }] },
            ]}
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
    padding: 16,
    paddingBottom: hp(3),
  },
  requiredLabelText: {
    color: "red",
    fontSize: hp(1.5),
    position: "absolute",
    paddingHorizontal: wp(1.9),
    top: hp(10.5),
    marginBottom: hp(1),
    zIndex: 999999,
    left: wp(4),
  },
  dropdown: {
    width: wp(90),
    height: hp(8.5),
    borderColor: "#E7EAF3",
    borderRadius: 16,
    paddingHorizontal: 8,
    elevation: 5, 
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    
  },
  requiredLabelstar: {
    color: "red",
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
