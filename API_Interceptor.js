import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { notifyMessage } from "./src/functions/toastMessage";
import store from "./src/redux/store/store";
import { token } from "./src/constants/constant";

export const http = axios.create();

// for Request from API endpoint
http.interceptors.request.use(
  async (config) => {
    const state = store.getState(); // Access Redux state
    const { userData, mpinData } = state.auth;
    const mPin = mpinData?.Data?.mPin;
    const Token = AsyncStorage.getItem(token);
    const ServerBaseUrl = mpinData?.Data?.ServerBaseUrl;
    if (ServerBaseUrl) {
      config.baseURL = ServerBaseUrl;
    }
    if (Token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";
    config.headers["x-api-key"] = mPin;

    if (userData && mpinData) {
      config.headers.CompanyID = userData.Data.CompanyID;
      config.headers.YearMasterID = userData.Data.YearMasterID;
      config.headers.PremiseID = userData.Data.PremiseID;
      config.headers.DepartmentID = userData.Data.DepartmentID;
      config.headers.UserID = userData.Data.UserID;
      config.headers.client = mpinData.Data.SlugUrl;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// for response

http.interceptors.response.use(
  (response) => {
    // Handle successful response here
    return response;
  },
  async (error) => {
    // Handle error response
    if (error.response && error.response.status === 401) {
      // Unauthorized access - maybe token expired
      notifyMessage("Session expired", "Please log in again.");
    }
    // Alert.alert("Error", error.response?.data?.message || "An error occurred");

    return Promise.reject(error);
  }
);
