import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { Icon } from "../../constants/Icon";
import { themePrimaryColor } from "../../constants/constant";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchComponent from "../../componenets/SearchComponent";
import { ScreenName } from "../../constants/screenName";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardSummary } from "../../Actions/Dashboard/dashboardAction";
import { useRoute } from "@react-navigation/native";
import { Loader } from "../../componenets/Loading";

const renderClientSummery = ({ item, navigation }) => {
  const accountId = item.Account_Id;
  if (item.length === 0) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ fontSize: hp(2), marginVertical: hp(50), color: "blue" }}
        >
          No Data
        </Text>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 0.5,
          paddingBottom: hp(1),
          marginTop: hp(1),
        }}
      >
        <View>
          <Text className="font-gsemibold text-sm ml-6">
            {item.Account_Name}
          </Text>
          <View
            style={{ flexDirection: "row", marginLeft: wp(6), gap: wp(10) }}
          >
            <Text className="text-gray-500 text-sm">{item.Pcs}</Text>
            <Text className="text-gray-500 text-sm">Amt. {item.TtlAmt}</Text>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: wp(28),
                alignSelf: "center",
              }}
            >
              <Text style={styles.CountingPage}>{item.NoOfOrder}</Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ScreenName.summeryDetails, { accountId })
            }
          >
            <Image
              source={Icon.arrowright}
              style={styles.ArrowRightIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const DashboardSummery = ({ navigation }) => {
  const [searchVisible, setSearchVisible] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterType, setFilterType] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const route = useRoute();
  const [type, setType] = useState(route.params?.type || "");
  const [container, setContainer] = useState(route.params?.container || "");

  const dashboardSummaryData = useSelector(
    (state) => state.dashboard.dashboardSummary
  );
  const loading = useSelector((state) => state.dashboard.loading);

  useEffect(() => {
    if (route.params?.type || route.params?.container) {
      setType(route.params.type);
      setContainer(route.params.container);
    }
  }, [route.params?.type || route.params?.container]);

  useEffect(() => {
    dispatch(getDashboardSummary(type));
  }, [dispatch, type]);

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getDashboardSummary(type));
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />
      }
    >
      <SafeAreaView>
        <View
          style={{
            marginHorizontal: wp(2),
            justifyContent: "space-evenly",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={styles.backIconContainer}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={Icon.arrowRound}
              style={styles.backIcon}
              contentFit="contain"
            />
          </TouchableOpacity>

          <Text
            className="font-gsemibold text-lg"
            style={styles.SalesOrderPage}
          >
            {container} Activity
          </Text>
          <View>
            <SearchComponent />
          </View>
          <Image
            source={Icon.filterIcon}
            style={styles.filterIcon}
            contentFit="contain"
          />
        </View>
        {loading && <Loader />}
        <ScrollView style={{ marginBottom: hp(6) }}>
          {dashboardSummaryData?.Table &&
          dashboardSummaryData?.Table?.length > 0 ? (
            <FlatList
              scrollEnabled={false}
              data={dashboardSummaryData?.Table}
              // data={[1, 2, 3, 4, 5]}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) =>
                renderClientSummery({ item, navigation })
              }
            />
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: hp(2),
                  marginTop: hp(40),
                  color: themePrimaryColor,
                }}
              >
                No Record Found for Today
              </Text>
              <Text
                style={{
                  fontSize: hp(1.5),
                  color: themePrimaryColor,
                }}
              >
                Please Apply Filter
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default DashboardSummery;

const styles = StyleSheet.create({
  backIcon: {
    width: hp(2.5),
    height: hp(2.5),
    margin: wp(2),
    right: wp(5),
    top: hp(1),
    tintColor: themePrimaryColor,
  },
  backIconContainer: {
    position: "absolute",
    left: wp(5),
  },
  filterIcon: {
    width: hp(2.5),
    height: hp(2.5),
    margin: wp(2),
    top: hp(1),
    tintColor: themePrimaryColor,
    zIndex: -9999,
    left: wp(9),
  },
  SalesOrderPage: {
    left: wp(20),
    height: hp(4),
    margin: wp(2),
    top: hp(0.5),
    color: themePrimaryColor,
  },
  ArrowRightIcon: {
    width: hp(2),
    height: hp(2),
    right: wp(25),
    margin: wp(2),
  },
  CountingPage: {
    color: themePrimaryColor,
    alignSelf: "center",
    textAlign: "center",
    height: hp(2.5),
    width: hp(2.5),
    borderRadius: 50,
    bottom: hp(1.2),
    backgroundColor: "#E7EAF3",
  },
});
