import {
  setDashboardLoading,
  setDashboardPermissionData,
} from "../../redux/dashboardSlices/DashboardSlice";
import dashboardService from "../../services/dashboardService";

export const getDashboardPermission = () => async (dispatch) => {
  try {
    dispatch(setDashboardLoading(true));
    const response = await dashboardService.getDashboardPermission();
    // dispatch(setDashboardPermissionData());
    console.log("Dashboard Permission data : ", response?.data?.Data);
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
    // dispatch(setLoading(false));
    dispatch(setDashboardLoading(false));
  }
};
