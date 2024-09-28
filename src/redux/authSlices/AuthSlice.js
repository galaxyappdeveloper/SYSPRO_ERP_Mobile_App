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
      // await AsyncStorage.setItem(userData, JSON.stringify(userResponse));
      await dispatch(setUserData(userResponse));
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

// export const updateUserData = createAsyncThunk(
//   "auth/updateUserData",
//   async ({ newUserData, setUserData, dispatch }) => {
//     try {
//       await AsyncStorage.setItem(userData, JSON.stringify(newUserData));
//       const localStorage = await AsyncStorage.getItem(userData);
//       dispatch(setUserData(newUserData));
//       console.log(
//         "New User data updated in store and async storage : ",
//         newUserData
//       );

//       console.log("localStorage : ", localStorage);
//       return true;
//     } catch (error) {
//       console.log("Error updating user data:", error);
//       throw error;
//     }
//   }
// );

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
    setUserDataSuccess: (state, { payload }) => {
      state.userData = payload;
    },
    setAuthLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const setUserData = (userdata) => async (dispatch) => {
  try {
    await AsyncStorage.setItem(userData, JSON.stringify(userdata));
    dispatch(authSlice.actions.setUserDataSuccess(userdata));
  } catch (error) {
    console.error("Failed to save user data to AsyncStorage:", error);
  }
};

export const loadMpinData = () => async (dispatch) => {
  const mpinData = await AsyncStorage.getItem(mPinData);
  const parsedMpinData = mpinData != null ? JSON.parse(mpinData) : null;
  if (mpinData) {
    dispatch(authSlice.actions.setMpinData(parsedMpinData));
  }
};

// export const loadMpinData = () => async (dispatch, getState) => {
//   const { mpinData } = getState().auth;

//   if (!mpinData) {
//     // Only load if mpinData is not already in the state
//     const storedMpinData = await AsyncStorage.getItem("mPinData");
//     const parsedMpinData =
//       storedMpinData != null ? JSON.parse(storedMpinData) : null;

//     if (parsedMpinData) {
//       console.log("Loading MPIN data from AsyncStorage...");
//       dispatch(authSlice.actions.setMpinData(parsedMpinData));
//     }
//   } else {
//     console.log(
//       "MPIN data already exists in state, no need to load from AsyncStorage."
//     );
//   }
// };

export const loadUserData = () => async (dispatch) => {
  const userdata = await AsyncStorage.getItem(userData);
  const parsedUserData = userdata != null ? JSON.parse(userdata) : null;
  if (userdata) {
    dispatch(authSlice.actions.setUserDataSuccess(parsedUserData));
  }
};

export default authSlice.reducer;
export const { setMpinData, setAuthLoading } = authSlice.actions;
