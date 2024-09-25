import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
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

const renderClientSummery = ({navigation}) => {
  return (
    <View>
      {/* Sales No Data Found */}
      {/* <View style={{justifyContent: "center", alignItems: "center"}}>
    <Text style={{fontSize: hp(2), marginVertical: hp(50)}}>No Data</Text>
  </View> */}

      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenName.summeryDetails)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 0.5,
          paddingBottom: hp(1),
          marginTop: hp(1),
        }}
      >
        <View>
          <Text className="font-gsemibold text-sm ml-6">A.K.R FABRICS</Text>
          <View
            style={{ flexDirection: "row", marginLeft: wp(6), gap: wp(10) }}
          >
            <Text className="text-gray-500 text-sm">Qty-10</Text>
            <Text className="text-gray-500 text-sm">Amt.-210.00</Text>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: wp(28),
                alignSelf: "center",
              }}
            >
              <Text style={styles.CountingPage}>1</Text>
            </View>
          </View>
        </View>
        <View>
          <Image
            source={Icon.arrowright}
            style={styles.ArrowRightIcon}
            contentFit="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const DashboardSummery = ({ navigation }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };
  return (
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
          className="font-gsemibold text-lg  "
          style={styles.SalesOrderPage}
        >
          Sales Order Activity
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
      <ScrollView style={{ marginBottom: hp(6) }}>
        <FlatList
        scrollEnabled={false}
          data={[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23,
          ]}
          showsHorizontalScrollIndicator={false}
          renderItem={() => renderClientSummery({navigation})}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenName.summeryDetails)}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: hp(2.5),
            marginTop: hp(1),
          }}
        >
          <View>
            <Text className="font-gsemibold text-sm ml-6">Total</Text>
            <View
              style={{ flexDirection: "row", marginLeft: wp(6), gap: wp(10) }}
            >
              <Text className="text-gray-500 text-sm">Qty-10</Text>
              <Text className="text-gray-500 text-sm">Amt.-210.00</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: wp(28),
                  alignSelf: "center",
                }}
              >
                <Text style={styles.CountingPage}>1</Text>
              </View>
            </View>
          </View>
          <View>
            <Image
              source={Icon.arrowright}
              style={styles.ArrowRightIcon}
              contentFit="contain"
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
