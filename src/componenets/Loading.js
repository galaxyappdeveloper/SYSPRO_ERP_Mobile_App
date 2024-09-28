import { View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { themePrimaryColor } from "../constants/constant";

export const Loader = ({ customStyle }) => {
  return (
    <View
      style={[
        {
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 1000,
          transform: [{ translateX: -25 }, { translateY: -25 }],
        },
        customStyle,
      ]}
    >
      <ActivityIndicator size={"large"} color={themePrimaryColor} />
    </View>
  );
};
