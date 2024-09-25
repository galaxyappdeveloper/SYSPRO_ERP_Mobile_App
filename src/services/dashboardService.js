import { http } from "../../API_Interceptor";

class DashboardService {
  getDashboardPermission(body) {
    return http.post("api/HomeApi/DashboardPermission", body);
  }

  getDashboardTotal(body) {
    return http.post("api/HomeApi/GetDashboard", body);
  }
}

export default new DashboardService();
