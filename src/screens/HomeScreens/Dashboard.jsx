import {
  FlatList,
  Text,
  View,
  Dimensions,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Carousel from "react-native-reanimated-carousel";
import { images } from "./../../constants/images";
import { themePrimaryColor } from "../../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardPermission,
  getDashboardTotal,
} from "../../Actions/Dashboard/dashboardAction";
import { commonStyle } from "../../constants/commonStyle";
import { Loader } from "../../componenets/Loading";
import { ScreenName } from "../../constants/screenName";
import { Image } from "expo-image";
import { Icon } from "../../constants/Icon";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = ({ navigation }) => {
  const [cards, setCards] = useState([1, 2,3]);
  const [secondCard, setSecondCard] = useState([1]);
  const deleteCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };
  const dispatch = useDispatch();
  const DashboardPermissionData = useSelector(
    (state) => state?.dashboard?.DashboardPermissionData
  );
  const DashboardSaleTotal = useSelector(
    (state) => state?.dashboard?.DashboardSaleTotal
  );

  // console.log("DashboardTotalData : ", DashboardSaleTotal);

  const loading = useSelector((state) => state.dashboard.loading);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getDashboardPermission());
    setRefreshing(false);
  };

  useEffect(() => {
    dispatch(getDashboardPermission());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDashboardTotal(1));
  }, [dispatch]);

  // useEffect(() => {
  //   if (DashboardPermissionData !== null) {
  //     const DashboardPermissionKeys = Object.keys(DashboardPermissionData);

  //     if (DashboardPermissionKeys.length > 0) {
  //       const menuMap = {};

  //       DashboardPermissionKeys.map((item) => {
  //         DashboardPermissionData[item]?.map((item2) => {
  //           if (item2.Menu === "DashBoardSaleContainer") {
  //             let obje = {};

  //             if (!menuMap[item2.Menu]) {
  //               obje["title"] = "Sales";
  //               obje["data"] = [];
  //               menuMap[item2.Menu] = obje;
  //             }

  //             menuMap[item2.Menu]["data"].push(item2);
  //           }
  //           if (item2.Menu === "DashBoardPurchaseContainer") {
  //             let obje = {};

  //             if (!menuMap[item2.Menu]) {
  //               obje["title"] = "Purchase";
  //               obje["data"] = [];
  //               menuMap[item2.Menu] = obje;
  //             }

  //             menuMap[item2.Menu]["data"].push(item2);
  //           }
  //           if (item2.Menu === "DashBoardJobWorkContainer") {
  //             let obje = {};

  //             if (!menuMap[item2.Menu]) {
  //               obje["title"] = "Job Work";
  //               obje["data"] = [];
  //               menuMap[item2.Menu] = obje;
  //             }

  //             menuMap[item2.Menu]["data"].push(item2);
  //           }
  //           if (item2.Menu === "DashBoardAccountContainer") {
  //             let obje = {};

  //             if (!menuMap[item2.Menu]) {
  //               obje["title"] = "Accounts";
  //               obje["data"] = [];
  //               menuMap[item2.Menu] = obje;
  //             }
  //             menuMap[item2.Menu]["data"].push(item2);
  //           }
  //         });
  //       });
  //       const structuredData = Object.values(menuMap);
  //       setDashboardFilter(structuredData);
  //       setDashboardFilter(data);
  //     }
  //   }
  // }, [DashboardPermissionData]);

  const renderCardContainer = (item) => {
    return (
      <View style={[styles.CardContainer]}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenName.dashboardSummery)}
        >
          <Text style={{ fontSize: hp(3), alignSelf: "center" }}>
            {DashboardSaleTotal.Table[0].TtlSale}
          </Text>
          <Text
            className="text-center mt-2 font-gsemibold"
            style={styles.cardInnerTitle}
          >
            {item.Widget}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView
      style={[commonStyle.container, styles.DashboardContainer]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />
      }
    >
      {loading && <Loader />}
      <SafeAreaView>
        <View>
          {DashboardPermissionData.map((dashItem, index) => {
            return (
              <View key={index}>
                <Text style={styles.cardsContainerTitle}>{dashItem.Title}</Text>

                <FlatList
                  data={dashItem.Data}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => renderCardContainer(item)}
                />
              </View>
            );
          })}
        </View>
        <FlatList
          data={cards}
          horizontal
          showsHorizontalScrollIndicator={false}
          // numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <>
              <View style={styles.container}>
                <View
                  style={[
                    styles.card,
                    cards.length === 1
                      ? styles.fullWidthCard
                      : styles.halfWidthCard,
                  ]}
                >
                  <View style={styles.accountIconContainer}>
                    <Image
                      source={Icon.accountIcon}
                      style={styles.accountIcon}
                    />
                    <View>
                      <Text
                        className="font-gsemibold text-lg"
                        style={{
                          height: hp(3.6),
                          width: hp(10),
                          lineHeight: hp(3.6),
                          left: wp(2.6),
                        }}
                      >
                        Sales O/S
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text className="font-gbold text-xl text-center">
                      72854652
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={styles.todaySaleButton}>
                      <Text style={styles.todaySaleText}>Today Sale</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => deleteCard(index)}
                      style={styles.sendIconButton}
                    >
                      <Image style={styles.sendIcon} source={Icon.sendIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          )}
        />

        {/* This is for third card */}
        <FlatList
          data={secondCard}
          showsHorizontalScrollIndicator={false}
          // numColumns={}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <>
              <View style={styles.SecondCardcontainer}>
                <View style={[styles.Secondcard, styles.fullWidthCard]}>
                  <View style={styles.accountIconContainer}>
                    <Image
                      source={Icon.accountIcon}
                      style={styles.accountIcon}
                    />
                    <View>
                      <Text
                        className="font-gsemibold text-lg"
                        style={{
                          height: hp(3.6),
                          width: hp(10),
                          lineHeight: hp(3.6),
                          left: wp(2.6),
                        }}
                      >
                        Sales O/S
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text className="font-gbold text-xl text-center">
                      72854652
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={styles.todaySaleButton}>
                      <Text style={styles.todaySaleText}>Today Sale</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => deleteCard(index)}
                      style={styles.sendIconButton}
                    >
                      <Image style={styles.sendIcon} source={Icon.sendIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* This is for third card */}
            </>
          )}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  DashboardContainer: {
    flex: 1,
  },
  CardContainer: {
    height: hp(15),
    width: wp(45),
    backgroundColor: "#00b894",
    borderRadius: 10,
    borderWidth: 1,
    margin: hp(1),
    margin: hp(1),
    justifyContent: "center",
    alignItems: "center",
  },
  cardInnerTitle: {
    alignSelf: "center",
  },
  cardsContainerTitle: {
    fontSize: hp(2.5),
    fontWeight: "600",
    color: themePrimaryColor,
    marginHorizontal: hp(3),
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: hp(0),
  },
  SecondCardcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: hp(0),
  },
  card: {
    justifyContent: "space-between",
    backgroundColor: "#e4eafa",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    padding: wp(2),
    margin: hp(1),
    borderRadius: 26,
    height: hp(22),
    elevation: 5,
  },
  Secondcard: {
    justifyContent: "space-between",
    backgroundColor: "#e4eafa",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    padding: wp(2),
    margin: hp(1),
    borderRadius: 26,
    height: hp(22),
    elevation: 5,
    // marginHorizontal: hp(-30.5),
  },
  halfWidthCard: {
    width: wp("45%"), // Two cards in a row
  },
  fullWidthCard: {
    width: wp("95%"), // Full width if only one card
  },
  todaySaleButton: {
    flex: 1,
    marginTop: hp(1),
    paddingHorizontal: hp(2),
    paddingVertical: hp(2),
    width: wp(24),
    backgroundColor: "#F5F8FB",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  todaySaleText: {
    color: "#021121",
    textAlign: "center",
    fontWeight: "gilroy-bold",
  },
  sendIconButton: {
    padding: hp(2),
    width: hp(6),
    height: hp(6),
    backgroundColor: "#F5F8FB",
    borderRadius: 50,
    left: hp(0.5),
    top: hp(0.5),
    borderWidth: 1,
    borderColor: "#E6E6E6",
    cursor: "pointer",
  },
  sendIcon: {
    height: hp(2),
    width: hp(2),
    borderRadius: 50,
    alignSelf: "center",
  },
  accountIconContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  accountIcon: {
    height: hp(4.5),
    width: hp(4.5),
    tintColor: themePrimaryColor,
  },
});

export default Dashboard;
