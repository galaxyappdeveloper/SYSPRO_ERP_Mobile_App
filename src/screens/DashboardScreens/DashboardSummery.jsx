import {
  RefreshControl,
  Button,
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
import { commonStyle } from "../../constants/commonStyle";
import Modal from "react-native-modal";
import FilterModal from "./FilterModal";

const renderClientSummery = ({ loading, item, type, navigation }) => {
  const accountId = item?.Account_Id;
  // if (item.length === 0) {
  //   return (
  //     <View style={{ justifyContent: "center", alignItems: "center" }}>
  //       <Text
  //         style={{ fontSize: hp(2), marginVertical: hp(50), color: "blue" }}
  //       >
  //         No Data
  //       </Text>
  //     </View>
  //   );
  // } else {

  const maxLength = 40;

  const trimmedTitle =
    item?.Account_Name.length > maxLength
      ? `${item?.Account_Name.slice(0, maxLength)}...`
      : item?.Account_Name;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(ScreenName.summeryDetails, { type, accountId })
      }
      style={{
        flex: 1,
      }}
    >
      <View style={styles.Container}>
        <View style={styles.TitleContainer}>
          <Text
            numberOfLines={1}
            style={styles.Tilte}
            className="font-gsemibold"
          >
            {trimmedTitle}
          </Text>
          <View style={styles.CountingContainer}>
            <Text style={styles.OrderQuantity}>{item?.NoOfOrder}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginLeft: wp(6), gap: wp(10) }}>
          <View style={styles.QuantityContainer}>
            <Text style={styles.Quantity}>Quantity</Text>
            <Text style={styles.QuantityNumber}>{item.Pcs}</Text>
          </View>
          <View style={styles.AmountContainer}>
            <Text style={styles.Amount}>Amount</Text>
            <Text style={styles.AmountNumber}>₹ {item.TtlAmt}</Text>
          </View>
          <View style={styles.arrowRightContainer}>
            <Image
              contentFit="contain"
              source={Icon.arrowright}
              style={styles.arrowRightIcon}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
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

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getDashboardSummary(type));
    setRefreshing(false);
  };

  useEffect(() => {
    if (route.params?.type || route.params?.container) {
      setType(route.params.type);
      setContainer(route.params.container);
    }
  }, [route.params?.type || route.params?.container]);

  useEffect(() => {
    dispatch(getDashboardSummary(type));
  }, [dispatch, type]);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };
  return (
    <SafeAreaView style={[commonStyle.container]}>
      {loading && <Loader />}
      <View style={styles.Header}>
        <View style={styles.backIconContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={Icon.arrowRound}
              style={styles.backIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.HeaderTitleContainer}>
          <Text className="font-gsemibold  " style={styles.HeaderTitle}>
            Sales
          </Text>
        </View>
        <View style={styles.filterIconContainer}>
          <TouchableOpacity onPress={() => toggleModal()}>
            <Image
              source={Icon.filterIcon}
              style={styles.filterIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginBottom: hp(0.9) }}>
        <SearchComponent placeholder="Search" rightIcon />
      </View>
      <ScrollView
        style={{ marginBottom: hp(1), color: "transparent" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
      >
        {dashboardSummaryData?.Table &&
        dashboardSummaryData?.Table?.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            data={dashboardSummaryData?.Table}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) =>
              renderClientSummery({ loading, item, type, navigation })
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

        {/* <TouchableOpacity
          onPress={() => navigation.navigate(ScreenName.summeryDetails)}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: hp(2.5),
            marginTop: hp(10),
          }}
        ></TouchableOpacity> */}
      </ScrollView>
      <View style={{ flex: 1 }}>
        <Modal isVisible={isModalVisible}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              top: 40,
            }}
          >
            <FilterModal toggle={toggleModal} />
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default DashboardSummery;

const styles = StyleSheet.create({
  Header: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: hp(2),
  },
  backIconContainer: {
    borderRadius: 50,
    backgroundColor: "#fff",
    padding: hp(1),
    elevation: 5,
  },
  backIcon: {
    width: wp(5),
    height: wp(5),
  },
  HeaderTitleContainer: {
    width: wp(30),
    height: wp(5),
  },
  HeaderTitle: {
    color: "#021121",
    fontSize: hp(2),
    alignSelf: "center",
  },
  filterIconContainer: {
    borderRadius: 50,
    backgroundColor: "#fff",
    padding: hp(1),
    elevation: 5,
  },
  filterIcon: {
    width: wp(5),
    height: wp(5),
  },
  CountingContainer: {
    height: hp(3),
    width: hp(3),
    borderRadius: 50,
    backgroundColor: "#0252A7",
  },
  OrderQuantity: {
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    fontSize: hp(2),
  },
  Tilte: {
    fontSize: hp(2),
  },
  Container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: hp(2.5),
    width: wp(90),
    borderRadius: 20,
    marginHorizontal: wp(5),
    cursor: "pointer",
    borderWidth: 0.5,
    borderColor: "#9397A8",
  },
  TitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(1),
    borderBottomWidth: 1,
    borderBottomColor: "#E7EAF3",
    padding: 20,
  },
  QuantityContainer: {
    padding: 15,
    right: wp(4),
  },
  Quantity: {
    color: "#9397A8",
    fontSize: hp(2),
  },
  QuantityNumber: {
    fontSize: hp(2),
    marginTop: hp(0.5),
  },
  AmountContainer: {
    padding: 15,
    right: wp(14),
  },
  Amount: {
    color: "#9397A8",
    fontSize: hp(2),
  },
  AmountNumber: {
    fontSize: hp(2),
    marginTop: hp(0.5),
  },
  arrowRightContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    marginLeft: wp(5),
  },
  arrowRightIcon: {
    height: hp(2.5),
    width: hp(2.5),
    tintColor: "#9397A8",
  },
});
