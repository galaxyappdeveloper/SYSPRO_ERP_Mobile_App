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
import {
  getDashboardSummary,
  getDashboardSummaryDetail,
} from "../../Actions/Dashboard/dashboardAction";
import { useRoute } from "@react-navigation/native";
import { Loader } from "../../componenets/Loading";
import { commonStyle } from "../../constants/commonStyle";
import Modal from "react-native-modal";
import FilterModal from "./FilterModal";
import {
  setDashboardSummary,
  setDashboardSummaryDetail,
} from "../../redux/dashboardSlices/DashboardSlice";

const renderClientSummery = ({ loading, item, type, navigation }) => {
  const accountId = item?.Account_Id;

  const maxLength = 30;
  const trimmedTitle =
    item?.Account_Name.length > maxLength
      ? `${item?.Account_Name.slice(0, maxLength)}...`
      : item?.Account_Name;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate(ScreenName.summaryDetails, { type, accountId })
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

          <View style={styles.QuantityContainer}>
            <View>
              <Text style={styles.Quantity}>
                Qty -<Text style={styles.QuantityNumber}> {item.Pcs}</Text>
              </Text>
            </View>
            <View style={styles.AmountContainer}>
              <Text style={styles.Amount}>
                Amt -<Text style={styles.AmountNumber}> ₹{item.TtlAmt}</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.CountingContainer}>
          <View style={styles.OrderQuantityContainer}>
            <Text style={styles.OrderQuantity}>{item?.NoOfOrder}</Text>
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
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const route = useRoute();
  const [type, setType] = useState(route.params?.type || "");
  const [container, setContainer] = useState(route.params?.container || "");

  const dashboardSummaryData = useSelector(
    (state) => state.dashboard.dashboardSummary
  );

  const [searchData, setSearchData] = useState(
    dashboardSummaryData?.Table || []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const loading = useSelector((state) => state.dashboard.loading);

  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  //   if (query) {
  //     const filtered = dashboardSummaryData?.Table.filter((item) =>
  //       item.Account_Name.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setSearchData(filtered);
  //   } else {
  //     setSearchData(dashboardSummaryData?.Table);
  //   }
  // };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // useEffect(() => {
  //   if (dashboardSummaryData?.Table) {
  //     setSearchData(dashboardSummaryData.Table);
  //   }
  // }, [dashboardSummaryData?.Table]);

  // useEffect(() => {
  //   if (dashboardSummaryData?.Table && searchQuery === "") {
  //     setSearchData(dashboardSummaryData?.Table);
  //   }
  // }, [dashboardSummaryData, searchQuery]);

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     handleSearch(searchQuery);
  //   }, 300);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchQuery]);

  useEffect(() => {
    if (dashboardSummaryData?.Table && searchQuery === "") {
      setSearchData(dashboardSummaryData.Table);
    }
  }, [dashboardSummaryData]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const filtered = dashboardSummaryData?.Table?.filter((item) =>
          item.Account_Name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchData(filtered);
      } else {
        setSearchData(dashboardSummaryData?.Table || []);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

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
  }, [route.params]);

  useEffect(() => {
    dispatch(getDashboardSummary(type));
  }, [dispatch, type]);

  // useEffect(() => {
  //   dispatch(setDashboardSummaryDetail());
  // }, []);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    if (!isModalVisible) {
      dispatch(getDashboardSummary(type));
    }
  };

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) {
      setSearchQuery("");
    }
  };

  const handleBack = async () => {
    await navigation.goBack();
    dispatch(setDashboardSummary([]));
  };

  return (
    <SafeAreaView style={[commonStyle.container]}>
      {loading && <Loader />}

      {searchVisible ? (
        <View style={styles.searchContainer}>
          <SearchComponent
            searchQuery={searchQuery}
            // setSearchQuery={handleSearch}
            setSearchQuery={setSearchQuery}
            toggleSearchBar={toggleSearchBar}
          />
        </View>
      ) : (
        <View style={styles.Header}>
          <View style={styles.backIconContainer}>
            <TouchableOpacity onPress={() => handleBack()}>
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
            {!searchVisible && (
              <View style={styles.filterIconContainer}>
                <TouchableOpacity onPress={() => toggleModal()}>
                  <Image
                    source={Icon.filterIcon}
                    style={styles.filterIcon}
                    contentFit="contain"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}

      <ScrollView style={{ marginBottom: hp(1), color: "transparent" }}>
        {searchData?.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            data={searchData}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) =>
              renderClientSummery({ loading, item, type, navigation })
            }
            ListEmptyComponent={() => (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: hp(2),
                    marginTop: hp(40),
                    color: themePrimaryColor,
                  }}
                >
                  No Record Found
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
              No Record Found
            </Text>
            <TouchableOpacity activeOpacity={0.6} onPress={() => toggleModal()}>
              <Text
                style={{
                  fontSize: hp(1.5),
                  color: themePrimaryColor,
                }}
              >
                Please Apply Filter
              </Text>
            </TouchableOpacity>
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
          >
            <FilterModal
              dropdownOptions={dashboardSummaryData?.Table1 || []}
              toggle={toggleModal}
              type={type}
            />
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default DashboardSummery;

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
    width: wp(6),
    height: wp(6),
    tintColor: themePrimaryColor,
    alignSelf: "center",
  },
  HeaderTitleContainer: {
    left: wp(5),
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
    // backgroundColor: "#fff",
    padding: hp(1),
    right: wp(2),

    // elevation: 5,
  },
  searchIconContainer: {
    alignSelf: "center",
    left: wp(3),
  },

  searchIcon: {
    width: wp(5.5),
    height: wp(5.5),
    tintColor: themePrimaryColor,
  },
  filterIconContainer: {
    alignSelf: "center",
    left: wp(3),
  },
  filterIcon: {
    width: wp(5.5),
    height: wp(5.5),
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
    paddingBottom: hp(1),
  },
  TitleContainer: {
    padding: 8,
    marginLeft: hp(1.5),
  },
  QuantityContainer: {
    flexDirection: "row",
    gap: hp(5),
  },
  Quantity: {
    color: "#9397A8",
    // fontSize: hp(2),
  },
  QuantityNumber: {
    // fontSize: hp(2),
    marginTop: hp(0.1),
  },
  AmountContainer: {
    // marginTop: hp(-2),
    // padding: 15,
    // right: wp(14),
  },
  Amount: {
    color: "#9397A8",
    // fontSize: hp(2),
  },
  AmountNumber: {
    // fontSize: hp(2),
    marginTop: hp(0.1),
  },
  arrowRightContainer: {
    alignSelf: "center",
    marginRight: hp(1.5),
  },
  arrowRightIcon: {
    height: hp(2.5),
    width: hp(2.5),
    tintColor: "#9397A8",
    alignSelf: "center",
  },
});
