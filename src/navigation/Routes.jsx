import React, { useState, useEffect } from "react";
import AuthRoutes from "./AuthRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeRoutes from "./HomeRoutes";
import * as SplashScreen from "expo-splash-screen";
import { token } from "../constants/constant";
import { Loader } from "../componenets/Loading";
import { loadMpinData, loadUserData } from "../redux/authSlices/AuthSlice";
import { useDispatch } from "react-redux";

SplashScreen.preventAutoHideAsync();
const Routes = () => {
  const dispatch = useDispatch();
  const [isToken, setIsToken] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    dispatch(loadMpinData());
    dispatch(loadUserData());
  }, [dispatch]);

  useEffect(() => {
    const asyncAuth = async () => {
      const Token = await AsyncStorage.getItem(token);
      if (Token) {
        setIsToken(true);
        setIsAppReady(true);
      } else {
        setIsToken(false);
        setIsAppReady(true);
      }
    };
    asyncAuth();
  }, []);

  (async function appReadyChecking() {
    if (isAppReady) {
      SplashScreen.hideAsync();
    }
  })();

  if (!isAppReady) {
    return <Loader />;
  }

  return <>{isToken ? <HomeRoutes /> : <AuthRoutes />}</>;
};

export default Routes;
