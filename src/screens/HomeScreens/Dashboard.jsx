import {
  FlatList,
  Text,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Carousel from "react-native-reanimated-carousel";
import { images } from "./../../constants/images";
import { colors, themePrimaryColor } from "../../constants/constant";
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

  // if (loading) {
  //   return <Loader />;
  // }

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

  const renderCardContainer = (item, dashItem) => {
    const type = item?.SYSType;
    const container = item?.Container;
    return (
      <View>
        <ImageBackground
          imageStyle={styles.image}
          source={images.backgroundShiny}
          style={[
            styles.card,
            item.length === 1 ? styles.fullWidthCard : styles.halfWidthCard,
          ]}
        >
          <View style={styles.accountIconContainer}>
            <Image source={Icon.accountIcon} style={styles.accountIcon} />
            <View>
              <Text
                // numberOfLines={1}
                className="font-gsemibold"
                style={{
                  height: hp(3.6),
                  fontSize: hp(2),
                  width: hp(15),
                  lineHeight: hp(3.6),
                  left: wp(1.8),
                }}
              >
                {/* {dashItem.Title} */}
                {item.Caption}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.totalcount} className="font-gbold text-center">
              {getTotalNumber(item)}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ScreenName.dashboardSummery, {
                  type,
                  container,
                })
              }
              style={styles.ExploreTextContainer}
            >
              <View style={styles.ExploreTextBtn}>
                <Text numberOfLines={1} style={styles.ExploreText}>
                  Explore
                </Text>
              </View>
              <View style={styles.sendIconButtonContainer}>
                <Image style={styles.sendIcon} source={Icon.sendIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
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
          {DashboardPermissionData?.map((dashItem, index) => {
            return (
              <View key={index}>
                <Text style={styles.cardsContainerTitle}>{dashItem.Title}</Text>
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
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  DashboardContainer: {
    flex: 1,
  },
  cardsContainerTitle: {
    fontSize: hp(2.5),
    fontWeight: "600",
    color: themePrimaryColor,
    marginHorizontal: hp(3),
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: hp(0),
  },
  totalcount: {
    fontSize: hp(2.5),
  },
  SecondCardcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: hp(0),
  },
  card: {
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    padding: wp(2),
    margin: hp(1),
    borderRadius: 26,
    height: hp(22),
    borderWidth:2,
    
  },
  image: {
    borderRadius: 22,
    borderWidth: 1,
  },
  Secondcard: {
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6E6E6",
    padding: wp(2),
    margin: hp(1),
    borderRadius: 26,
    height: hp(22),
    elevation: 5,
  },
  halfWidthCard: {
    width: wp("45%"), // Two cards in a row
  },
  fullWidthCard: {
    width: wp("95%"), // Full width if only one card
  },

  ExploreTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  ExploreTextBtn: {
    backgroundColor: "#F5F8FB",
    borderRadius: 50,
    borderColor: "#E6E6E6",
    borderWidth: 1,
    paddingHorizontal: hp(1),
    flex: 1,
    elevation: 1,
  },
  ExploreText: {
    color: "#021121",
    marginVertical: hp(1.5),
    textAlign: "center",
    fontSize: hp(1.5),
    fontWeight: "gilroy-bold",
  },
  sendIconButtonContainer: {
    borderRadius: 50,
    backgroundColor: "#fff",
    padding: hp(1.5),
    elevation: 5,
    position: "absolute",
    right: 0,
  },
  sendIcon: {
    width: wp(5),
    height: wp(5),
  },
  accountIconContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  accountIcon: {
    height: hp(4.5),
    width: hp(4.5),
    tintColor: themePrimaryColor,
    marginRight: wp(1),
    borderWidth: 1,
    borderRadius: 50,
    // borderColor: "grey",
    backgroundColor: colors.themebackgroundColor,
  },
});

export default Dashboard;
