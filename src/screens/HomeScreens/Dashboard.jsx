import { FlatList, Image, Text, View, Dimensions } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Carousel from "react-native-reanimated-carousel";
import { images } from "./../../constants/images";
import { LinearGradient } from "expo-linear-gradient";

const Dashboard = () => {
  const screenWidth = Dimensions.get("screen").width;
  const imageData = [
    {
      id: 1,
      images: images.creditCard,
    },
  ];

  return (
    <View style={styles.DashboardContainer}>
      <View style={styles.headerContainerLable}>
        <Text className="font-gregular " style={styles.headerText}>
          Good Morning !,
        </Text>
        <Text className="font-gregular" style={styles.headerText}>
          {" "}
          Janani Designer
        </Text>
      </View>
      <View style={styles.carouselContainer}>
        <Carousel
          loop
          width={screenWidth}
          height={hp(30)}
          autoPlay={true}
          data={[imageData]}
          scrollAnimationDuration={3000}
          renderItem={({ index }) => (
            <LinearGradient
              style={styles.gradiant}
              colors={["#0093E9", "#80D0C7"]}
            >
              <View>
                <Text style={styles.gradiantText}>Hello</Text>
              </View>
            </LinearGradient>
          )}
        />
      </View>
      <View style={styles.BoxContainerSale}>
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={[1, 2]}
          renderItem={() => {
            return (
              <>
                <View style={styles.Box}>
                  <Text style={styles.BoxText}>0</Text>
                  <View>
                    <Text style={styles.BoxTextOrder}>Today Order</Text>
                    <Text style={styles.BoxTextOrderOne}>More</Text>
                  </View>
                </View>

                <View style={styles.Box1}>
                  <Text style={styles.BoxText}>0</Text>
                  <View>
                    <Text style={styles.BoxTextOrder}>Today Sales</Text>
                    <Text style={styles.BoxTextOrderOne}>More</Text>
                  </View>
                </View>
              </>
            );
          }}
        />
      </View>

      <View style={styles.BoxContainerOne}>
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={() => {
            return (
              <>
                <View style={styles.Box2}>
                  <Text style={styles.BoxText}>0</Text>
                  <View>
                    <Text style={styles.BoxTextOrder}>Today PO</Text>
                    <Text style={styles.BoxTextOrderOne}>More</Text>
                  </View>
                </View>
                <View style={styles.Box3}>
                  <Text style={styles.BoxText}>0</Text>
                  <View>
                    <Text style={styles.BoxTextOrder}>Today Purchase</Text>
                    <Text style={styles.BoxTextOrderOne}>More</Text>
                  </View>
                </View>
              </>
            );
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  DashboardContainer: {
    flex: 1,
  },
  carouselContainer: {
    height: hp(30),
  },
  BoxContainerSale: {
    // height: hp(30),
  },
  BoxText: {
    fontSize: 30,
    fontWeight: "semibold",
    textAlign: "center",
    padding: hp(2),
    color: "white",
  },
  BoxTextOrder: {
    fontSize: 22,
    fontWeight: "semibold",
    textAlign: "center",
    marginTop: hp(0),
    color: "white",
  },
  BoxTextOrderOne: {
    fontSize: 20,
    textAlign: "center",
    marginTop: hp(3),
    color: "white",
  },
  Box: {
    height: hp(20),
    width: wp(40),
    margin: 22,
    backgroundColor: "#6AB04A",
    borderRadius: 20,
  },
  Box1: {
    height: hp(20),
    width: wp(40),
    margin: 22,
    backgroundColor: "#EC4849",
    borderRadius: 20,
  },

  Box2: {
    height: hp(20),
    width: wp(40),
    margin: 22,
    backgroundColor: "#6AB04A",
    borderRadius: 20,
  },
  Box3: {
    height: hp(20),
    width: wp(40),
    margin: 22,
    backgroundColor: "#6AB04A",
    borderRadius: 20,
  },
  gradiant: {
    flex: 3,
    borderRadius: 20,
    margin: 20,
  },
  gradiantText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    padding: hp(10),
  },
  headerContainerLable: {
    margin: 10,
    flex: 1,

    height: hp(8),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#239fe4",
    borderRadius: 20,
  },
  headerText: {
    fontSize: hp(3),
  },
});

export default Dashboard;
