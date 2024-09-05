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
      <View className="bg-white" style={styles.label}>
        <Text style={styles.labeltext}>MPin</Text>
      </View>
      <TextInput
        {...props}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#5C658C"
        textAlign="start"
        onChangeText={onChangeText}
        cursorColor="#5C658C"
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
  label: {
    position: "absolute",
    width: wp("12%"),
    top: hp(-1.4),
    left: wp(6),
    backgroundColor: "white",
  },
  labeltext: {
    fontSize: hp("1.8%"),
    color: "#5C658C",
    textAlign: "center",
  },
  input: {
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
    width: wp("7%"),
    height: hp("5%"),
    marginLeft: hp("2.5%"),
    alignSelf: "center",
  },
});
export default TextInputwithLogo;
