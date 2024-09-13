import React, { useState } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomBtn from "../../componenets/CustomBtn";
import { setMpinData } from "../../redux/authSlices/AuthSlice";
import { mPinData, themePrimaryColor, urls } from "../../constants/constant";
import { notifyMessage } from "../../functions/toastMessage";
import { ScreenName } from "../../constants/screenName";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInputwithLogo from "../../componenets/TextInputwithLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { commonStyle } from "../../constants/commonStyle";
import { Icon } from "../../constants/Icon";

const MpinAuth = ({ navigation }) => {
  const [mPin, setMPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const handleMpinChange = (e) => {
    setMPin(e.trim().toUpperCase());
  };

  const handleMpinAuth = async () => {
    const mpinapi = `${urls.mPin}${mPin}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer your_token_here",
      "x-api-key": "SYSPROERP",
    };

    try {
      setIsLoading(true);
      const response = await axios.post(mpinapi, { mPin }, { headers });
      const apidata = response.data?.Data;
      const apiMpin = apidata?.mPin;
      dispatch(setMpinData(response?.data?.Data));
      const mpinData = JSON.stringify(response?.data?.Data);
      await AsyncStorage.setItem(mPinData, mpinData);
      setIsLoading(false);
      if (apiMpin === mPin) {
        notifyMessage("MPin Verified!");
        navigation.navigate(ScreenName.login);
      } else {
        notifyMessage("Invalid MPin!");
      }
      setMPin("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("API error message", error?.response?.data);
      notifyMessage(error.response?.data?.Message);
    }
  };

  return (
    <SafeAreaView
      style={[commonStyle.container, { backgroundColor: "#1254a5" }]}
    >
      <StatusBar
        backgroundColor={themePrimaryColor}
        barStyle={"light-content"}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* top container */}
        <View style={{ height: hp(27) }}>
          <View className="mt-8">
            <Text
              className="text-white text-center font-gsemibold"
              style={{ fontSize: hp(6) }}
            >
              Let’s connect
            </Text>
            <Text className="text-white text-center font-glight text-base mt-3">
              Please enter info to connect
            </Text>
            <Text className="text-white  text-center font-glight text-[16px]">
              your business
            </Text>
          </View>
        </View>
        <View
          style={[
            commonStyle.innerContainer,
            {
              height: hp(73),
              backgroundColor: "white",
              justifyContent: "space-between",
            },
          ]}
          className="w-[100%] mt-14 bg-white rounded-t-[26px]"
        >
          <View className="flex-1 p-8">
            <Text className="font-gsemibold text-2xl ml-[-10]">MPin</Text>
            <View className="mt-4">
              <TextInputwithLogo
                placeholder="Enter your mpin "
                icon={Icon.mpinIcon}
                label="Mpin"
                value={mPin}
                onChangeText={handleMpinChange}
                customStyle={{ alignSelf: "center" }}
              />
            </View>
          </View>
          <CustomBtn
            isLoading={isLoading}
            Customstyle={{ marginBottom: hp(4) }}
            titleStyle={{ fontWeight: 600 }}
            title="Continue"
            onPressHandler={handleMpinAuth}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MpinAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loginView: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },
  txt: {
    fontSize: scale(16),
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: moderateScale(10),
    marginVertical: moderateScale(15),
    backgroundColor: "#7c549b",
  },
  bottomLineView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateScale(25),
  },
  loginIconBtnView: {
    // flex: 1,
    width: "32%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: moderateScale(6),
    borderRadius: 3,
  },
  loginBtnIcon: {
    width: scale(20),
    height: scale(20),
    marginRight: moderateScale(5),
  },
  lineStyle: {
    borderWidth: 0.2,
    width: scale(110),
    backgroundColor: "#cacaca",
    borderColor: "#cacaca",
  },
  commonTxt: {
    // color: "#cacaca",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
