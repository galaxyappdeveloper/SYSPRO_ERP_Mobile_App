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

const renderClientSummery = ({ navigation }) => {
  return (
    <View>
      {/* Sales No Data Found */}
      {/* <View style={{justifyContent: "center", alignItems: "center"}}>
      <Text style={{fontSize: hp(2), marginVertical: hp(50)}}>No Data</Text>
    </View> */}

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
          <Text className="font-gsemibold text-sm ml-6">#196</Text>
          <View
            style={{
              flexDirection: "column",
              marginHorizontal: wp(6),
            }}
          >
            <Text className="text-gray-500 text-sm">Bill No-0</Text>

            <Text className="text-gray-500 text-sm">Qty-2</Text>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: wp(20),
                alignSelf: "center",
              }}
            ></View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignSelf: "center",
            marginLeft: wp(-10),
          }}
        >
          <Text className="text-gray-500 text-sm">
            Bill Date-
            <Text className="text-black text-sm font-gbold">20-05-2022</Text>
          </Text>

          <Text className="text-gray-500 text-sm">
            Amt.<Text className="text-black text-sm font-gbold">-210.00</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenName.pdfReader)}
          style={{ alignSelf: "center" }}
        >
          <View>
            <Image
              source={Icon.printerIcon}
              style={styles.printIcon}
              contentFit="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SummreyDetails = ({ navigation }) => {
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
          onPress={() => navigation.navigate(ScreenName.dashboardSummery)}
        >
          <Image
            source={Icon.arrowRound}
            style={styles.backIcon}
            contentFit="contain"
          />
        </TouchableOpacity>

        <Text className="font-gsemibold text-lg  " style={styles.ClientName}>
          Client Name
        </Text>
        <View style={{ position: "static", right: wp(8) }}>
          <SearchComponent />
        </View>
      </View>
      <ScrollView>
        <FlatList
          scrollEnabled={false}
          data={[1, 2, 3]}
          showsHorizontalScrollIndicator={false}
          renderItem={() => renderClientSummery({ navigation })}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SummreyDetails;

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
    zIndex: -1,
    left: wp(9),
  },
  ClientName: {
    left: wp(20),
    height: hp(4),
    margin: wp(2),
    top: hp(0.5),
    color: themePrimaryColor,
  },
  printIcon: {
    width: hp(4),
    height: hp(4),
    marginRight: wp(6),
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
