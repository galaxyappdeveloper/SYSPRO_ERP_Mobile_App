import {
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Carousel from "react-native-reanimated-carousel";
import { images } from "./../../constants/images";
import { LinearGradient } from "expo-linear-gradient";
import { themePrimaryColor } from "../../constants/constant";
import { useDispatch } from "react-redux";
import { getDashboardPermission } from "../../Actions/Dashboard/dashboardAction";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardPermission());
  }, [dispatch]);

  const screenWidth = Dimensions.get("screen").width;
  const imageData = [
    {
      id: 1,
      images: images.creditCard,
      title: "Sales",
    },
    {
      id: 2,
      images: images.creditCard,
      tilte: "purchases",
    },
    {
      id: 3,
      images: images.creditCard,
      tilte: "Orders",
    },
    {
      id: 4,
      images: images.creditCard,
      tilte: "Total",
    },
    {
      id: 5,
      images: images.creditCard,
      title: "Amount",
    },
  ];

  return (
    <ScrollView style={styles.DashboardContainer}>
      <View style={styles.carouselContainer}>
        <Carousel
          loop
          width={screenWidth}
          height={hp(30)}
          autoPlay={true}
          data={imageData}
          scrollAnimationDuration={3000}
          renderItem={({ item, index }) => (
            <LinearGradient
              style={styles.gradiant}
              colors={["#7a70ba", "#000000"]}
            >
              <View>
                <Text style={styles.gradiantText}>{item.title}</Text>
              </View>
            </LinearGradient>
          )}
        />
      </View>

      {/* <Pagination data={imageData} paginationIndex /> */}
      <View style={styles.BoxContainerSale}>
        <View>
          <Text
            style={{
              marginLeft: hp(5),
              fontWeight: "600",
              fontSize: hp(3),
              color: themePrimaryColor,
            }}
          >
            Sales
          </Text>
        </View>
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
                    // marginTop: hp(2),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LinearGradient
                    colors={["#7a70ba", "#000000"]}
                    style={styles.Box1}
                    className=" rounded-xl"
                  >
                    <Text style={styles.BoxText}>0</Text>
                    <View>
                      <Text style={styles.BoxTextOrder}>Today Order</Text>
                      <Text style={styles.BoxTextOrderOne}>More</Text>
                    </View>
                    <LinearGradient
                      colors={["#7a70ba", "#000000"]}
                      style={styles.Box2}
                      className=" rounded-xl"
                    >
                      <Text style={styles.BoxText}>1</Text>
                      <View>
                        <Text style={styles.BoxTextOrder}>Today Sales</Text>
                        <Text style={styles.BoxTextOrderOne}>More</Text>
                      </View>
                    </LinearGradient>
                  </LinearGradient>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </View>

      <View style={styles.BoxContainerOne}>
        <View>
          <Text
            style={{
              marginLeft: hp(5),
              fontWeight: "600",
              fontSize: hp(3),
              color: themePrimaryColor,
            }}
          >
            Purchases
          </Text>
        </View>
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
                    // marginTop: hp(2),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LinearGradient
                    colors={["#7a70ba", "#000000"]}
                    style={styles.Box3}
                    className=" rounded-xl"
                  >
                    <Text style={styles.BoxText}>2</Text>
                    <View>
                      <Text style={styles.BoxTextOrder}>Today Order</Text>
                      <Text style={styles.BoxTextOrderOne}>More</Text>
                    </View>
                    <LinearGradient
                      colors={["#7a70ba", "#000000"]}
                      style={styles.Box4}
                      className=" rounded-xl"
                    >
                      <Text style={styles.BoxText}>3</Text>
                      <View>
                        <Text style={styles.BoxTextOrder}>Today Sales</Text>
                        <Text style={styles.BoxTextOrderOne}>More</Text>
                      </View>
                    </LinearGradient>
                  </LinearGradient>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </View>
      <View style={styles.BoxContainerSale}>
        <View>
          <Text
            style={{
              marginLeft: hp(5),
              fontWeight: "600",
              fontSize: hp(3),
              color: themePrimaryColor,
            }}
          >
            Job Work
          </Text>
        </View>
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
                    // marginTop: hp(2),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LinearGradient
                    colors={["#7a70ba", "#000000"]}
                    style={styles.Box1}
                    className=" rounded-xl"
                  >
                    <Text style={styles.BoxText}>0</Text>
                    <View>
                      <Text style={styles.BoxTextOrder}>Today Order</Text>
                      <Text style={styles.BoxTextOrderOne}>More</Text>
                    </View>
                    <LinearGradient
                      colors={["#7a70ba", "#000000"]}
                      style={styles.Box2}
                      className=" rounded-xl"
                    >
                      <Text style={styles.BoxText}>1</Text>
                      <View>
                        <Text style={styles.BoxTextOrder}>Today Sales</Text>
                        <Text style={styles.BoxTextOrderOne}>More</Text>
                      </View>
                    </LinearGradient>
                  </LinearGradient>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </View>
      <View style={styles.BoxContainerSale}>
        <View>
          <Text
            style={{
              marginLeft: hp(5),
              fontWeight: "600",
              fontSize: hp(3),
              color: themePrimaryColor,
            }}
          >
            Accounts
          </Text>
        </View>
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
                    // marginTop: hp(2),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LinearGradient
                    colors={["#7a70ba", "#000000"]}
                    style={styles.Box1}
                    className=" rounded-xl"
                  >
                    <Text style={styles.BoxText}>0</Text>
                    <View>
                      <Text style={styles.BoxTextOrder}>Today Order</Text>
                      <Text style={styles.BoxTextOrderOne}>More</Text>
                    </View>
                    <LinearGradient
                      colors={["#7a70ba", "#000000"]}
                      style={styles.Box2}
                      className=" rounded-xl"
                    >
                      <Text style={styles.BoxText}>1</Text>
                      <View>
                        <Text style={styles.BoxTextOrder}>Today Sales</Text>
                        <Text style={styles.BoxTextOrderOne}>More</Text>
                      </View>
                    </LinearGradient>
                  </LinearGradient>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </ScrollView>
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
    fontSize: hp(3),
    fontWeight: "semibold",
    textAlign: "center",
    padding: hp(2),
    color: "white",
  },
  BoxTextOrder: {
    fontSize: hp(2),
    fontWeight: "semibold",
    textAlign: "center",
    marginTop: hp(0),
    color: "white",
  },
  BoxTextOrderOne: {
    fontSize: hp(2),
    textAlign: "center",
    marginTop: hp(3),
    color: "white",
  },
  Box1: {
    margin: 10,
    marginLeft: wp(-45),
    width: wp(40),
    height: hp(20),
    backgroundColor: "#F4F7F9",
  },
  Box2: {
    margin: 10,
    marginLeft: wp(45),
    marginTop: hp(-16.4),
    width: wp(40),
    height: hp(20),
  },
  Box3: {
    margin: 10,
    marginLeft: wp(-45),
    width: wp(40),
    height: hp(20),
  },
  Box4: {
    margin: 10,
    marginLeft: wp(45),
    marginTop: hp(-16.4),
    width: wp(40),
    height: hp(20),
  },

  gradiant: {
    flex: 1,
    borderRadius: 20,
    margin: hp(2),
  },
  gradiantText: {
    color: "white",
    fontSize: hp(3),
    fontWeight: "bold",
    textAlign: "center",
    margin: hp(1),
    padding: hp(8),
  },
  headerContainerLable: {
    marginHorizontal: hp(2),
    marginVertical: hp(1),
    flex: 1,
    alignItems: "start",
    justifyContent: "center",
    // backgroundColor: "#239fe4",
    borderRadius: 20,
    marginLeft: hp(5),
  },
  headerText: {
    fontSize: hp(3),
  },
  headerText2: {
    fontSize: hp(3),
    paddingLeft: hp(4),
  },
});

export default Dashboard;
