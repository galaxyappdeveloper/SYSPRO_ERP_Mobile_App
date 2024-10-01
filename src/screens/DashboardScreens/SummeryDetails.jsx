import {
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
import { colors, themePrimaryColor } from "../../constants/constant";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchComponent from "../../componenets/SearchComponent";
import { ScreenName } from "../../constants/screenName";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { commonStyle } from "../../constants/commonStyle";
import CustomBtn from "./../../componenets/CustomBtn";
import Modal from "react-native-modal";
import {
  getDashboardSummaryDetail,
  getDashReportPrint,
} from "../../Actions/Dashboard/dashboardAction";
import { Loader } from "../../componenets/Loading";
import { formatDate } from "../../functions/formatDate";

const renderClientSummery = ({ item, navigation }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenName.summeryDetails)}
        style={{
          flex: 1,
        }}
      >
        <View style={styles.Container}>
          <View style={styles.TitleContainer}>
            <Text style={styles.Tilte} className="font-gsemibold">
              #{item.OrderId}
            </Text>
            <View style={styles.PrinterContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(ScreenName.pdfReader, { item })
                }
              >
                <Image source={Icon.printerIcon} style={styles.printerIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", marginLeft: wp(6), gap: wp(10) }}
          >
            {/* <View style={styles.BillNoConatiner}>
              <Text style={styles.Bill}>Bill No.</Text>
              <Text style={styles.BillDate}>{item.BillNo}</Text>
            </View> */}
            <View style={styles.BillContainer}>
              <Text style={styles.Bill}>Bill Date</Text>
              <Text style={styles.BillDate}>{formatDate(item.BillDt)}</Text>
            </View>
            <View style={styles.QuantityContainer}>
              <Text style={styles.Quantity}>Quantity</Text>
              <Text style={styles.QuantityNumber}>{item.Pcs}</Text>
            </View>
            <View style={styles.AmountContainer}>
              <Text style={styles.Amount}>Amount</Text>
              <Text style={styles.AmountNumber}>₹{item.TtlAmt}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const SummreyDetails = ({ navigation }) => {
  const route = useRoute();
  const [type, setType] = useState(route.params?.type || "");
  const [accountId, setAccountId] = useState(route.params?.accountId || "");

  useEffect(() => {
    if (route.params?.type || route.params?.accountId) {
      setType(route.params.type);
      setAccountId(route.params.accountId);
    }
  }, [route.params?.type || route.params?.accountId]);

  // const reportType = useSelector((state) => state.dashboard.reportType);

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const dashboardSummaryDetailData = useSelector(
    (state) => state.dashboard.dashboardSummaryDetail
  );

  const loading = useSelector((state) => state.dashboard.loading);
  const pdflink = useSelector((state) => state.dashboard.dashboardReportPrint);
  console.log("PDFLink : ", pdflink);
  const dispatch = useDispatch();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };

  useEffect(() => {
    dispatch(getDashboardSummaryDetail(type, accountId));
  }, [accountId]);

  // const handlePrint = async () => {
  //   dispatch(getDashReportPrint());
  //   if (pdflink) {
  //     navigation.navigate(ScreenName.pdfReader, { pdflink });
  //   }
  // };

  return (
    <SafeAreaView style={[commonStyle.container]}>
      <View style={styles.Header}>
        <View style={styles.backIconContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenName.dashboardSummery)}
          >
            <Image
              source={Icon.arrowRound}
              style={styles.backIcon}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.HeaderTitleContainer}>
          <Text
            className="font-gsemibold  "
            numberOfLines={1}
            style={styles.HeaderTitle}
          >
            Summery Details
          </Text>
        </View>
        <View style={styles.filterIconContainer}>
          <Image
            source={Icon.filterIcon}
            style={styles.filterIcon}
            contentFit="contain"
          />
        </View>
      </View>
      <SearchComponent placeholder="Search" rightIcon />
      {loading && <Loader />}
      <ScrollView style={{ marginBottom: hp(6) }}>
        {dashboardSummaryDetailData && (
          <FlatList
            scrollEnabled={false}
            data={dashboardSummaryDetailData}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => renderClientSummery({ item, navigation })}
          />
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
    </SafeAreaView>
  );
};

export default SummreyDetails;

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
    // width: wp(35),
    // height: wp(5),
  },
  HeaderTitle: {
    color: "#021121",
    fontSize: hp(2),
    alignSelf: "center",
  },
  filterIconContainer: {
    borderRadius: 50,
    padding: hp(1),
    display: "hidden",
    backgroundColor: colors.themebackgroundColor,
  },
  filterIcon: {
    width: wp(5),
    height: wp(5),
    tintColor: colors.themebackgroundColor,
  },
  PrinterContainer: {
    borderRadius: 50,
    backgroundColor: "#E6EEF6",
    padding: hp(1),
  },
  printerIcon: {
    textAlign: "center",
    alignSelf: "center",
    fontSize: hp(2),
    color: "#0252A7",
    zIndex: -9999,
    height: hp(3.5),
    width: hp(3.5),
  },
  Tilte: {
    fontSize: hp(2),
    textAlign: "center",
    alignSelf: "center",
    marginLeft: wp(1),
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
    padding: 15,
  },
  // BillNoConatiner: {
  //   padding: 12,
  // },
  BillContainer: {
    padding: 12,
    right: wp(4),
  },
  Bill: {
    color: "#9397A8",
    fontSize: hp(2),
  },
  BillDate: {
    fontSize: hp(2),
    marginTop: hp(0.5),
  },
  QuantityContainer: {
    padding: 12,
    right: wp(14),
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
    padding: 12,
    right: wp(24),
  },
  Amount: {
    color: "#9397A8",
    fontSize: hp(2),
  },
  AmountNumber: {
    fontSize: hp(2),
    marginTop: hp(0.5),
  },
});
