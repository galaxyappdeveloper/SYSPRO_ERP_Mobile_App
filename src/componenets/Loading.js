import { View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { themePrimaryColor } from "../constants/constant";

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <ActivityIndicator size={"large"} color={themePrimaryColor} />
    </View>
  );
};

export default Loader;
