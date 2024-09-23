import dashboardService from "../../services/dashboardService";

export const getDashboardPermission = () => async (dispatch) => {
  const body = {};

  try {
    // dispatch(setLoading(true));
    const response = await dashboardService.getDashboardPermission(body);
    // dispatch(setYearDuration(response?.data?.Data?.Table1));
    // console.log("Year duration data : ", response?.data?.Data?.Table1);
    // dispatch(setLoading(false));
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
  }
};
