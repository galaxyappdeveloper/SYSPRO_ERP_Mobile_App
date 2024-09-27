import {
  FlatList,
  Image,
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

const Dashboard = ({ navigation }) => {
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

  const renderCardContainer = (item) => {
    return (
      <View style={[styles.CardContainer]}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenName.dashboardSummery)}
        >
          <Text style={{ fontSize: hp(3), alignSelf: "center" }}>
            {getTotalNumber(item)}
          </Text>
          <Text
            className="text-center mt-2 font-gsemibold"
            style={styles.cardInnerTitle}
          >
            {item.Caption}
          </Text>
        </TouchableOpacity>
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
      <View>
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
      </View>
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
});

export default Dashboard;
