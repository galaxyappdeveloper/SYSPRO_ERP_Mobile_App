import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { themePrimaryColor } from "../constants/constant";

const CustomBtn = ({
  title,
  onPressHandler,
  isLoading,
  disabled,
  Customstyle,
  titleStyle,
}) => {
  return (
    <TouchableOpacity
      // className="bg-secondary"
      activeOpacity={0.7}
      onPress={onPressHandler}
      disabled={isLoading || disabled}
      style={[styles.main, Customstyle]}
    >
      {isLoading ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="small" color="white" />
          <Text style={{ color: "white", marginLeft: 6, fontSize: 16 }}>
            Loading..
          </Text>
        </View>
      ) : (
        <Text className="font-gregular" style={[styles.BtnTitle, titleStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    padding: 15,
    width: wp("90%"),
    height: hp(8.5),
    backgroundColor: themePrimaryColor,
  },

  BtnTitle: {
    color: "white",
    fontSize: hp(2.7),
    textAlign: "center",
  },
});

export default CustomBtn;
