import { FlatList, Image, Text, View, Dimensions } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { themePrimaryColor } from "../../constants/constant";
import { images } from "../../constants/images";

const Dashboard = () => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={{ top: hp(1) }}>
      <FlatList
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3]}
        renderItem={() => {
          return (
            <View
              style={{
                width: screenWidth,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.Box} className=" rounded-xl">
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      position: "absolute",
                      color: "white",
                      fontSize: hp(2),
                      top: 15,
                      zIndex: 1,
                      paddingLeft: 12,
                    }}
                  >
                    07/09/2024
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      position: "absolute",
                      alignItems: "center",
                      color: "white",
                      fontSize: hp(2),
                      width: wp(90),
                      textAlign: "right",
                      top: 15,
                      paddingRight: 12,
                      zIndex: 1,
                      //   borderWidth: 1,
                    }}
                  >
                    Today's Sale
                  </Text>
                  <Text
                    style={{
                      position: "absolute",
                      color: "white",
                      width: wp(90),
                      fontSize: hp(4),
                      fontWeight: "bold",
                      textAlign: "center",
                      top: 60,
                      zIndex: 1,
                      //   borderWidth: 1,
                    }}
                  >
                    ₹ 200.90
                  </Text>
                  <Text
                    style={{
                      position: "absolute",
                      color: "white",
                      fontSize: 20,
                      textAlign: "center",
                      marginTop: "32%",
                      zIndex: 1,
                      width: wp(90),
                    }}
                  >
                    Total Sale
                  </Text>
                  <Image style={styles.image} source={images.creditCard} />
                </View>
              </View>
            </View>
          );
        }}
      ></FlatList>
      <FlatList
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3]}
        renderItem={() => {
          return (
            <View
              style={{
                width: screenWidth,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  marginTop: hp(2),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={styles.Box1} className=" rounded-xl">
                  <View style={styles.Box2} className=" rounded-xl"></View>
                </View>
              </View>
            </View>
          );
        }}
      ></FlatList>
      <FlatList
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3]}
        renderItem={() => {
          return (
            <View
              style={{
                width: screenWidth,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.Box3} className=" rounded-xl"></View>
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  Box: {
    margin: 10,
    width: wp(90),
    height: hp(25),
    elevation: 15,
  },
  Box1: {
    margin: 10,
    // top: hp(10),
    marginLeft: wp(-45),
    width: wp(40),
    height: hp(25),
    backgroundColor: "gray",
    elevation: 15,
  },
  Box2: {
    margin: 10,
    marginLeft: wp(45),
    marginTop: hp(0),
    width: wp(40),
    height: hp(25),
    backgroundColor: "gray",
    elevation: 15,
  },
  Box3: {
    margin: 25,
    width: wp(90),
    height: hp(25),
    elevation: 15,
    backgroundColor: themePrimaryColor,
  },
  image: {
    width: wp(90),
    height: hp(25),
    borderRadius: 20,
  },
});

export default Dashboard;
