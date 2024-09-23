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
import {
  constant,
  mPinData,
  themePrimaryColor,
  urls,
} from "../../constants/constant";
import { notifyMessage } from "../../functions/toastMessage";
import { ScreenName } from "../../constants/screenName";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInputwithLogo from "../../componenets/TextInputwithLogo";
import { commonStyle } from "../../constants/commonStyle";
import { Icon } from "../../constants/Icon";
import { images } from "../../constants/images";

const MpinAuth = ({ navigation }) => {
  const [mPin, setMPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    mpin: null,
  });
  const dispatch = useDispatch();
  const handleMpinChange = (e) => {
    setMPin(e.trim().toUpperCase());
  };

  const checkTextInputValidation = () => {
    if (!mPin.trim()) {
      alert("Please Enter Mpin");
      return;
    }
  };

  const handleMpinAuth = async () => {
    const newErrors = {
      mpin: mPin ? null : "Mpin is required",
    };
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== null);

    const mpinapi = `${urls.mPin}${mPin}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer your_token_here",
      "x-api-key": mPin,
    };

    if (!hasErrors) {
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
    }
  };

  return (
    <SafeAreaView style={[commonStyle.container, { backgroundColor: "white" }]}>
      <StatusBar
        backgroundColor={themePrimaryColor}
        barStyle={"light-content"}
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* top container */}
        <View style={styles.topContainer}>
          <View style={styles.Imagecontainer}>
            <Image
              resizeMode="contain"
              source={images.companyLogo}
              style={styles.Companylogo}
            />
          </View>
          <View>
            <Text
              className="text-black text-center font-gbold"
              style={{ fontSize: hp(5) }}
            >
              {constant.mpinScreenTitle1}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="text-[#9397A8] text-center font-glight   mt-3"
            >
              {constant.mpinScreenTitle2}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="text-[#9397A8]  text-center font-glight"
            >
              {constant.mpinScreenTitle3}
            </Text>
          </View>
        </View>
        {/* White Container */}
        <View
          style={[
            commonStyle.innerContainer,
            {
              height: hp(30),
              backgroundColor: "white",
              justifyContent: "space-between",
            },
          ]}
          // className="w-[100%] mt-14 bg-white rounded-t-[26px]"
        >
          <View className="flex-1 ">
            {/* <Text className="font-gsemibold text-2xl ml-[-10]">MPin</Text> */}
            <View className="mt-2">
              <TextInputwithLogo
                placeholder="Enter your mpin "
                icon={Icon.mpinIcon}
                label="Mpin"
                value={mPin}
                errorMessage={errors.mpin}
                onChangeText={handleMpinChange}
                customStyle={{ alignSelf: "center" }}
                returnKeyType="done"
                onSubmitEditing={() => handleMpinAuth()}
              />
            </View>
          </View>
          <CustomBtn
            disabled={!mPin}
            isLoading={isLoading}
            Customstyle={{
              position: "absolute",
              alignSelf: "center",
              bottom: hp(5),
            }}
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
  topContainer: {
    marginTop: hp(4),
  },
  Imagecontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Companylogo: {
    width: hp(46),
    height: hp(22),
  },
});
