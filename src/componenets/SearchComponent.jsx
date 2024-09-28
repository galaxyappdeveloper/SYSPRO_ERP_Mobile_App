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
import { Icon } from "./../constants/Icon";
import { Image } from "expo-image";

const SearchComponent = forwardRef(
  (
    {
      icon,
      placeholder,
      onChangeText,
      customStyle,
      rightIcon,
      textInputwrapperStyle,
      onPress,
      ...props
    },
    ref
  ) => {
    return (
      <View style={[styles.inputContainer, customStyle]}>
        <TextInput
          {...props}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9397A8"
          textAlign="start"
          onChangeText={onChangeText}
        />
        {rightIcon && (
          <TouchableOpacity style={styles.searchContainer} onPress={onPress}>
            <Image
              style={styles.searchIcon}
              source={Icon.searchIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: 4,
    paddingLeft: 13,
    fontFamily: "Gilroy-Medium",
    marginLeft: wp(4),
    color: "#9397A8",
    fontSize: hp("2%"),
    alignSelf: "center",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    marginTop: hp(2.5),
    borderRadius: 20,
    padding: 5,
    textAlign: "center",
    paddingRight: 10,
    flexDirection: "row",
    alignSelf: "center",
    width: wp("90%"),
    height: hp(8),
    elevation: 5,
  },
  searchContainer: {
    alignSelf: "center",
    marginRight: hp("1.3%"),
  },
  searchIcon: {
    width: hp("3%"),
    height: hp("3%"),
  },
});
export default SearchComponent;
