import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { images } from "../../constants/images";

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

const MpinAuth = ({ navigation }) => {
  const [mPin, setMPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const handleMpinChange = (e) => {
    setMPin(e);
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
      dispatch(setMpinData(response?.data));
      const mpinData = JSON.stringify(response.data);
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
    <SafeAreaView className="bg-primary h-full">
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={themePrimaryColor}
      />
      <View className="flex-1 align-top h-[30%] gap-[7px] mt-8">
        <Text className="text-white text-center font-gsemibold text-5xl">
          Let’s connect
        </Text>
        <Text className="text-white text-center font-light text-base mt-3">
          Please enter info to connect
        </Text>
        <Text className="text-white  text-center font-light text-[16px]">
          your business
        </Text>
      </View>
      <View className="h-[70%] w-[100%] bg-white absolute bottom-0 rounded-t-[26px]">
        <View className="flex-1 p-10">
          <Text className="font-gsemibold text-2xl">MPin</Text>
          <TextInputwithLogo
            placeholder="Enter your mpin "
            icon={images.mpinIcon}
            customStyle={{ alignSelf: "center" }}
          />
        </View>
        <View className="mb-6">
          <CustomBtn
            Customstyle={{ alignSelf: "center" }}
            titleStyle={{ fontWeight: 600 }}
            title="Continue"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MpinAuth;
