import React from "react";
import { View, StyleSheet } from "react-native";
import LoaderKit from "react-native-loader-kit";
import { themePrimaryColor } from "../../constants/constant";

const DotLoader = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.loaderContainer}>
        <LoaderKit
          style={{ width: 50, height: 50 }}
          name={"BallPulse"}
          color={themePrimaryColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Light white transparent background
    zIndex: 10, // Ensure it appears on top of other elements
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 100, // Adjust as necessary
    height: 100, // Adjust as necessary
  },
});

export default DotLoader;
