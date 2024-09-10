import authService from "../../services/authService";
import { notifyMessage } from "../../functions/toastMessage";
import * as Device from "expo-device";

export const handleLogout = (userId) => async (dispatch) => {
  const body = {
    UserID: userId,
    DeviceId: Device.osBuildId,
    IsActive: false,
    Status: 1,
  };

  try {
    const response = await authService.handleLogout(body);
    notifyMessage("Logout Successfully !");
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
