import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { CommonActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../constants/images";
import TextInputwithLogo from "../../componenets/TextInputwithLogo";
import CustomBtn from "../../componenets/CustomBtn";
import { login, setUserData } from "../../redux/authSlices/AuthSlice";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userMpinData = useSelector((state) => state.auth.mpinData);
  const ServerBaseUrl = userMpinData?.Data?.ServerBaseUrl;
  const mPin = userMpinData?.Data?.mPin;

  const navigate = (tab) => {
    return navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: tab }],
      })
    );
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await dispatch(
        login({
          username,
          password,
          mPin,
          ServerBaseUrl,
          navigate,
          dispatch,
          setUserData,
        })
      );
      setIsLoading(false);
    } catch (error) {
      console.log("Login error:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.main} keyboardVerticalOffset={60}>
      <View>
        <Image
          style={styles.logo}
          source={images.companyLogo}
          resizeMethod="contain"
        />
      </View>
      <TextInputwithLogo
        placeholder="Enter username"
        icon={images.userIcon}
        onChangeText={(e) => setUsername(e)}
        value={username}
      />
      <TextInputwithLogo
        placeholder="Enter Password"
        icon={images.passwordIcon}
        secureTextEntry
        onChangeText={(e) => setPassword(e)}
        value={password}
      />
      <CustomBtn
        onPressHandler={handleLogin}
        title="Login"
        isLoading={isLoading}
      />
      <View style={styles.footer}>
        <Text style={styles.footer1}>Powered By</Text>
        <Text style={styles.footer2}>SYSPRO ERP</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 220,
    height: 220,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#004787",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "gray",
  },
  input: {
    flex: 1,
    marginLeft: 7,
  },
  inputContainer: {
    backgroundColor: "#E6F1F9",
    marginTop: 15,
    borderRadius: 15,
    padding: 5,
    paddingLeft: 10,
    textAlign: "center",
    paddingRight: 10,
    width: 350,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  submitBtn: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    backgroundColor: "#004787",
    marginTop: 20,
    borderRadius: 15,
    padding: 15,
    paddingLeft: 10,
    paddingRight: 10,
    width: 350,
    marginLeft: 10,
    marginRight: 10,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "col",
    justifyContent: "center",
    alignItems: "center",
  },
  footer1: {
    fontSize: 12,
    fontWeight: "600",
    color: "gray",
  },
  footer2: {
    fontSize: 15,
    fontWeight: "900",
    color: "#004787",
  },
  usernamelogo: {
    width: 25,
    tintColor: "#004787",
    height: 25,
    marginLeft: 5,
    marginBottom: 5,
    // tintColor: 'gray',
  },
});

export default Login;
