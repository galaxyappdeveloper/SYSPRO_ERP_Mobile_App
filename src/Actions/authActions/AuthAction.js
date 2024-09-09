import authService from "../../services/authService";
import { notifyMessage } from "../../functions/toastMessage";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { token, userData } from "../../constants/constant";

export const handleLogout = (userId) => async (dispatch) => {
  const body = {
    UserID: userId,
    DeviceId: Device.osBuildId,
    IsActive: false,
    Status: 1,
  };

  try {
    const response = await authService.handleLogout(body);
    console.log("Logout API response : ", JSON.stringify(response.data));
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.ErrorMessage
    ) {
      notifyMessage(error.response.data.ErrorMessage);
    } else {
      notifyMessage("Unexpected Error while Logout.");
    }
  }
};

export const handleAllLogout = (userId) => async (dispatch) => {
  const body = {
    UserID: userId,
    DeviceId: Device.osBuildId,
    IsActive: false,
    Status: 0,
  };

  try {
    const response = await authService.handleLogout(body);
    console.log("Logout API response : ", JSON.stringify(response.data));
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.ErrorMessage
    ) {
      notifyMessage(error.response.data.ErrorMessage);
    } else {
      notifyMessage("Unexpected Error while Logout.");
    }
  }
};
