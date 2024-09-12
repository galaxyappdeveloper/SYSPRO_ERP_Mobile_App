import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { notifyMessage } from "../../functions/toastMessage";
import { mPinData, token, userData } from "../../constants/constant";
import { NavigationNames, ScreenName } from "../../constants/screenName";
import * as Device from "expo-device";

export const login = createAsyncThunk(
  "auth/login",
  async ({
    username,
    password,
    mPin,
    ServerBaseUrl,
    navigate,
    dispatch,
    setUserData,
  }) => {
    const loginUrl = `${ServerBaseUrl}api/Static/UserLogin`;

    const body = {
      UserName: username,
      Password: password,
      IsRemeber: true,
      DeviceId: Device.osBuildId,
    };

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": mPin,
    };

    try {
      const response = await axios.post(loginUrl, body, { headers });
      const userResponse = response?.data?.Data;
      const Token = userResponse?.Token;
      await AsyncStorage.setItem(token, Token);
      await AsyncStorage.setItem(userData, JSON.stringify(userResponse));
      dispatch(setUserData(userResponse));
      navigate(NavigationNames.homeRoutes);
      notifyMessage(response?.data?.Message);
      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.Message || "An error occurred while logging in.";
      console.log("Error logging in:", error);
      notifyMessage(errorMessage);
      throw error;
    }
  }
);

// Thunk for logout action
export const logOut = createAsyncThunk("auth/logout", async () => {
  try {
    await AsyncStorage.removeItem(token);
    await AsyncStorage.removeItem(userData);
    return true;
  } catch (err) {
    return err.message;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: "",
    mpinData: null,
    userData: null,
    AuthLoading: false,
  },
  reducers: {
    setMpinData: (state, { payload }) => {
      state.mpinData = payload;
    },
    setUserData: (state, { payload }) => {
      state.userData = payload;
    },
    setAuthLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const loadMpinData = () => async (dispatch) => {
  const mpinData = await AsyncStorage.getItem(mPinData);
  if (mpinData) {
    dispatch(authSlice.actions.setMpinData(mpinData));
  }
};

export const loadUserData = () => async (dispatch) => {
  const userdata = await AsyncStorage.getItem(userData);
  if (userdata) {
    dispatch(authSlice.actions.setUserData(userdata));
  }
};

export default authSlice.reducer;
export const { setMpinData, setUserData, setAuthLoading } = authSlice.actions;
