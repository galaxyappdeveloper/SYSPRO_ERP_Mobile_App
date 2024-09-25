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
      <View>
        <View>
          {DashboardPermissionData.map((dashItem, index) => {
            return (
              <View key={index}>
                <Text style={styles.cardsContainerTitle}>{dashItem.Title}</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(ScreenName.dashboardSummery)
                  }
                >
                  <FlatList
                    data={dashItem.Data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => renderCardContainer(item)}
                  />
                </TouchableOpacity>
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
