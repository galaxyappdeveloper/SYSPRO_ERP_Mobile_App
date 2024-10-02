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

  const maxLength = 40;

  const trimmedTitle =
    item?.Account_Name.length > maxLength
      ? `${item?.Account_Name.slice(0, maxLength)}...`
      : item?.Account_Name;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(ScreenName.pdfReader, { type, accountId })
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
            #1811
            {/* {trimmedTitle} */}
            {/* {item?.Account_Name} */}
          </Text>

          <View style={styles.QuantityContainer}>
            <View>
              <Text style={styles.bill}>
                Bill No. -<Text style={styles.billno}> {item.BillNo}</Text>
              </Text>
              <Text style={styles.Quantity}>
                Qty -<Text style={styles.QuantityNumber}> {item.Pcs}</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.CountingContainer}>
          <View style={styles.BillContainer}>
            <Text style={styles.Bill}>
              Bill date -
              <Text style={styles.BillDate}>
                {/* ₹{item.TtlAmt} */} 14 Aug, 2024
              </Text>
            </Text>
            <Text style={styles.Amount}>
              Amt -<Text style={styles.AmountNumber}> ₹ {item.TtlAmt}</Text>
            </Text>
          </View>
          <View style={styles.arrowRightContainer}>
            <Image
              contentFit="contain"
              source={Icon.printerIcon}
              style={styles.arrowRightIcon}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SummaryDetails = ({ navigation }) => {
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
      {searchVisible ? (
        <View style={styles.searchContainer}>
          <SearchComponent toggleSearchBar={() => toggleSearchBar()} />
        </View>
      ) : (
        <View style={styles.Header}>
          <View style={styles.backIconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(ScreenName.dashboardSummery)}>
              <Image
                source={Icon.arrowRound}
                style={styles.backIcon}
                contentFit="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.HeaderTitleContainer}>
            <Text className="font-gsemibold  " style={styles.HeaderTitle}>
              9XN DESIGNER
            </Text>
          </View>

          <View style={styles.search_filterIconContainer}>
            <View style={styles.searchIconContainer}>
              <TouchableOpacity onPress={() => toggleSearchBar()}>
                <Image
                  source={Icon.searchIcon}
                  style={styles.searchIcon}
                  contentFit="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

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
          ></View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default SummaryDetails;

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: wp(1),
  },
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: hp(7),
    width: wp(100),
    padding: hp(1),
  },
  backIconContainer: {
    paddingLeft: wp(3),

    alignSelf: "center",
  },
  backIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: themePrimaryColor,
    alignSelf: "center",
  },
  HeaderTitleContainer: {
    alignSelf: "center",
  },
  HeaderTitle: {
    color: themePrimaryColor,
    fontSize: hp(2),
  },
  search_filterIconContainer: {
    flexDirection: "row",
    gap: wp(5),
    borderRadius: 50,
    padding: hp(1),
    right: wp(2),
  },
  searchIconContainer: {
    alignSelf: "center",
  },
  searchIcon: {
    width: wp(6),
    height: wp(6),
    tintColor: themePrimaryColor,
  },
  CountingContainer: {
    flexDirection: "row",
    gap: wp(3),
  },
  OrderQuantityContainer: {
    height: hp(3),
    width: hp(3),
    borderRadius: 50,
    backgroundColor: themePrimaryColor,
    alignSelf: "center",
  },
  OrderQuantity: {
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    fontSize: hp(2),
  },
  Tilte: {},
  Container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    width: wp(100),
    borderBottomWidth: 1,
    borderColor: "#9397A8",
  },
  TitleContainer: {
    padding: 8,
    marginLeft: hp(1.5),
  },
  QuantityContainer: {
    flexDirection: "row",
    gap: hp(5),
  },
  bill: {
    color: "#9397A8",
  },

  billno: {
    fontWeight: "semibold",
    color: "#000000",
  },
  Quantity: {
    color: "#9397A8",
  },
  QuantityNumber: {
    // marginTop: hp(0.1),
    fontWeight: "semibold",
    color: "#000000",
  },
  BillContainer: {
    alignSelf: "center",
    top: hp(1),
  },
  Bill: {
    color: "#9397A8",
  },
  BillDate: {
    color: "#000000",
  },
  Amount: {
    color: "#9397A8",
  },
  AmountNumber: {
    color: "#000000",
  },
  arrowRightContainer: {
    alignSelf: "center",
    marginRight: hp(1.5),
    borderRadius: 50,
    padding: hp(0.5),
    backgroundColor: "#E7EAF3",
  },
  arrowRightIcon: {
    height: hp(3.5),
    width: hp(3.5),
  },
});
