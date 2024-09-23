import { http } from "../../API_Interceptor";

class DashboardService {
  getDashboardPermission() {
    return http.get("api/HomeApi/GetDashboardPermission");
  }

  // getYearByUser(body) {
  //   return http.post("api/HomeApi/GetYearByUser", body);
  // }
}

export default new DashboardService();
