import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const TextInputwithLogo = ({
  icon,
  placeholder,
  onChangeText,
  value,
  customStyle,
  textInputwrapperStyle,
  ...props
}) => {
  return (
    <View style={[styles.inputContainer, customStyle]}>
      <Image style={styles.usernamelogo} source={icon} resizeMode="contain" />
      <TextInput
        {...props}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="gray"
        textAlign="start"
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#004787",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "gray",
  },
  input: {
    flex: 1,
    padding: 4,
    paddingLeft: 13,
    fontFamily: "Gilroy-Medium",
    marginLeft: 7,
    color: "#5C658C",
    fontSize: hp("2%"),
    alignSelf: "center",
    borderLeftWidth: 0.5,
    height: hp(4),
  },
  inputContainer: {
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
  usernamelogo: {
    width: 25,
    height: 25,
    marginLeft: 5,
    alignSelf: "center",
  },
});
export default TextInputwithLogo;
