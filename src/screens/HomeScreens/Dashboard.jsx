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

  const renderCardContainer = (BgColor) => {
    return (
      <View
        style={[styles.CardContainer, { backgroundColor: BgColor}]}
      >
        <Text style={{ fontSize: hp(3), alignSelf: "center" }}>0</Text>
        <Text className="text-center font-gsemibold text-lg" style={{ alignSelf: "center" }}>Today Sales</Text>
      </View>
    );
  };

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
            <View style={styles.gradiant}>
              <View>
                <Text style={styles.gradiantText}>{item.title}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.SaleContainer}>
        <Text style={styles.SaleText}>Sale</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={() => renderCardContainer("#F9F9F9")}
          data={[
            {
              id: 1,
              title: "Sales",
            }
          ]}
        />
      </View>
      <View style={styles.PurchaseContainer}>
        <Text style={styles.PurchaseText}>Purchase</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={() => renderCardContainer("#F9F9F9")}
          data={[
            {
              id: 1,
              title: "Sales",
            },
            {
              id: 2,
              title: "Purchase",
            },
            {
              id: 3,
              title: "Job Work",
            },
            {
              id: 4,
              title: "Account",
            },
          ]}
        />
      </View>
      <View style={styles.JobworkContainer}>
        <Text style={styles.JobworkText}>Job Work</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={()=>renderCardContainer("#F9F9F9")}
          data={[
            {
              id: 1,
              title: "Sales",
            },
            {
              id: 2,
              title: "Purchase",
            },
            {
              id: 3,
              title: "Job Work",
            },
            {
              id: 4,
              title: "Account",
            },
          ]}
        />
      </View>
      <View style={styles.AccountContainer}>
        <Text style={styles.AccountText}>Account</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={()=>renderCardContainer("#F9F9F9")}
          data={[
            {
              id: 1,
              title: "Sales",
            },
            {
              id: 2,
              title: "Purchase",
            },
            {
              id: 3,
              title: "Job Work",
            },
            {
              id: 4,
              title: "Account",
            },
          ]}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  DashboardContainer: {
    flex: 1,
  },  
  gradiant: {
    flex: 1,
    borderRadius: 20,
    margin: hp(2),
    backgroundColor: "#0252A7",
  },
  gradiantText: {
    color: "white",
    fontSize: hp(3),
    fontWeight: "bold",
    textAlign: "center",
    margin: hp(1),
    padding: hp(8),
  },
  CardContainer: {
    height: hp(15),
    width: wp(45),
    backgroundColor: "#F9F9F9",
    borderRadius: 20,
    borderWidth: 1,
    margin: hp(1),  
    justifyContent: "center",
    alignItems: "center",
    elevation: 7,
  },
  SaleContainer:{
  },
  SaleText: {
    fontSize: hp(2.5),
    fontWeight: "600",
    color: themePrimaryColor,
    marginHorizontal: hp(3),
  },
  PurchaseText: {
    fontSize: hp(2.5),
    fontWeight: "600",
    color: themePrimaryColor,
    marginHorizontal: hp(3),
  },
  JobworkText: {
    fontSize: hp(2.5),
    fontWeight: "600",
    color: themePrimaryColor,
    marginHorizontal: hp(3),
  },
  AccountText: {
    fontSize: hp(2.5),
    fontWeight: "600",
    color: themePrimaryColor,
    marginHorizontal: hp(3),
  },
});

export default Dashboard;
