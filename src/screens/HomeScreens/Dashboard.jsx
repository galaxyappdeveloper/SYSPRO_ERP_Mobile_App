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
  const [cards, setCards] = useState([1, 2, 3]);
  const [secondCard, setSecondCard] = useState([1]);
  const deleteCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };
  const dispatch = useDispatch();
  const DashboardPermissionData = useSelector(
    (state) => state?.dashboard?.DashboardPermissionData
  );
  const dashboardTotal = useSelector(
    (state) => state?.dashboard?.dashboardTotal
  );

  // console.log(
  //   "DashboardPermissionData : ",
  //   JSON.stringify(DashboardPermissionData)
  // );
  // console.log("dashboardTotal : ", JSON.stringify(dashboardTotal));
  if (loading) {
    return <Loader />;
  }

  if (DashboardPermissionData === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Data not found.</Text>
      </View>
    );
  }
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
    if (DashboardPermissionData?.length > 0) {
      DashboardPermissionData.forEach((dashItem) => {
        dashItem.Data.forEach((item) => {
          dispatch(getDashboardTotal(item.SYSKey));
        });
      });
    }
  }, [DashboardPermissionData, dispatch]);

  // useEffect(() => {
  //   dispatch(getDashboardTotal(1));
  // }, [dispatch]);

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

  // const renderCardContainer = (item) => {
  //   return (
  //     <View style={[styles.CardContainer]}>
  //       <TouchableOpacity
  //         onPress={() => navigation.navigate(ScreenName.dashboardSummery)}
  //       >
  //         <Text style={{ fontSize: hp(3), alignSelf: "center" }}>
  //           {getTotalNumber(item)}
  //         </Text>
  //         <Text
  //           className="text-center mt-2 font-gsemibold"
  //           style={styles.cardInnerTitle}
  //         >
  //           {item.Caption}
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  const renderCardContainer = (item, dashItem) => {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.card,
            cards.length === 1 ? styles.fullWidthCard : styles.halfWidthCard,
          ]}
        >
          <View style={styles.accountIconContainer}>
            <Image source={Icon.accountIcon} style={styles.accountIcon} />
            <View>
              <Text
                className="font-gsemibold text-lg"
                style={{
                  height: hp(3.6),
                  width: hp(13),
                  lineHeight: hp(3.6),
                  left: wp(2.6),
                }}
              >
                {dashItem.Title}
              </Text>
            </View>
          </View>
          <View>
            <Text className="font-gbold text-xl text-center">
              {" "}
              {getTotalNumber(item)}
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
              <Text numberOfLines={1} style={styles.todaySaleText}>
                {item.Caption}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(ScreenName.dashboardSummery)}
                style={styles.sendIconButton}
              >
                <Image style={styles.sendIcon} source={Icon.sendIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const getTotalNumber = (item) => {
    const totaldata = dashboardTotal.find((e, i) => e.Widget == item.Widget);
    return totaldata?.Total ?? 0;
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

                {/* <FlatList
                  data={dashItem.Data}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => renderCardContainer(item)}
                /> */}
                <FlatList
                  data={dashItem.Data}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  // numColumns={3}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) =>
                    renderCardContainer(item, dashItem)
                  }
                />
              </View>
            );
          })}
        </View>

        {/* This is for third card */}
        {/* <FlatList
          data={secondCard}
          showsHorizontalScrollIndicator={false}
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
            </>
          )}
        /> */}
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
    width: wp(24),
    backgroundColor: "#F5F8FB",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  todaySaleText: {
    color: "#021121",
    textAlign: "center",
    fontSize: hp(1.5),
    fontWeight: "gilroy-bold",
    top: hp(2.5),
    right: hp(3),
  },
  sendIconButton: {
    padding: hp(1.5),
    width: hp(5),
    height: hp(5),
    backgroundColor: "#F5F8FB",
    borderRadius: 50,
    left: hp(13),
    top: hp(-1),
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
