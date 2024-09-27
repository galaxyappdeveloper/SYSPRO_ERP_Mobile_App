import { notifyMessage } from "../../functions/toastMessage";
import {
  setDashboardLoading,
  setDashboardPermissionData,
  setDashboardTotal,
} from "../../redux/dashboardSlices/DashboardSlice";
import dashboardService from "../../services/dashboardService";
import * as Device from "expo-device";

export const getDashboardPermission = () => async (dispatch) => {
  const body = {};
  try {
    dispatch(setDashboardLoading(true));
    const response = await dashboardService.getDashboardPermission(body);
    dispatch(setDashboardPermissionData(response?.data?.Data));
    // console.log("Dashboard Permission data : ", response?.data?.Data);
    dispatch(setDashboardLoading(false));
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.ErrorMessage
    ) {
      notifyMessage(error.response.data.ErrorMessage);
    } else {
      // notifyMessage("Unexpected Error in get year duration API.");
    }
    dispatch(setDashboardLoading(false));
  } finally {
    dispatch(setDashboardLoading(false));
  }
};

export const getDashboardTotal = (syskey) => async (dispatch) => {
  const date = new Date();
  const formatedDate = date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");
  const body = {
    Report_Id: 0,
    IntSYSKey: syskey,
    DashBD_Dt: formatedDate,
    StrDeviceID: Device.osBuildId,
  };
  try {
    dispatch(setDashboardLoading(true));
    const response = await dashboardService.getDashboardTotal(body);
    // const data = { data: response?.data?.Data?.Table, syskey: syskey };
    // console.log(
    //   "Dashboard Total Data API Response  : ",
    //   response?.data?.Data?.Table
    // );
    dispatch(setDashboardTotal(response?.data?.Data?.Table));
    dispatch(setDashboardLoading(false));
  } catch (error) {
    if (error?.response?.data?.ErrorMessage) {
      notifyMessage(error.response.data.ErrorMessage);
    } else {
      // notifyMessage("Unexpected Error in get year duration API.");
    }
    dispatch(setDashboardLoading(false));
  } finally {
    dispatch(setDashboardLoading(false));
  }
};
