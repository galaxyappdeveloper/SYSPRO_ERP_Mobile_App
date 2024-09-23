import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { forwardRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { Icon } from "./../constants/Icon";

const TextInputwithLogo = forwardRef(
  (
    {
      icon,
      placeholder,
      onChangeText,
      value,
      label,
      customStyle,
      rightIcon,
      textInputwrapperStyle,
      onPress,
      showPassword,
      errorMessage,
      ...props
    },
    ref
  ) => {
    return (
      <View style={[styles.inputContainer, customStyle]}>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <Image style={styles.usernamelogo} source={icon} contentFit="contain" />
        <View className="bg-white" style={styles.label}>
          <Text style={styles.labeltext}>{label}</Text>
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
          secureTextEntry={showPassword}
          ref={ref}
        />
        {rightIcon && (
          <TouchableOpacity style={styles.eyeContainer} onPress={onPress}>
            <Image
              style={styles.eyelogo}
              source={
                !showPassword ? Icon.showPasswordIcon : Icon.hidePasswordIcon
              }
              contentFit="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#004787",
  },
  errorText: {
    color: "red",
    fontSize: hp(1.5),
    position: "absolute",
    paddingHorizontal: wp(1.9),
    top: hp(-3.3),
    zIndex: 999,
    left: wp(2),
  },
  label: {
    position: "absolute",
    paddingHorizontal: wp(1.9),
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
  eyeContainer: {
    alignSelf: "center",
    marginRight: hp("1.3%"),
  },
  eyelogo: {
    width: hp("3%"),
    height: hp("3%"),
  },
});
export default TextInputwithLogo;
