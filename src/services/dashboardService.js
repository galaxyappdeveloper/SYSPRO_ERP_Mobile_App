import { http } from "../../API_Interceptor";

class DashboardService {
  getDashboardPermission(body) {
    return http.get("api/HomeApi/DashboardPermission", body);
  }
  getDashboardTotal(body) {
    return http.post("api/HomeApi/GetDashboard", body);
  }
  getDashboardSummary(body) {
    return http.post("api/HomeApi/GetDashboardSummary", body);
  }
  getDashboardSummaryDetail(body) {
    return http.post("api/HomeApi/GetDashboardDetail", body);
  }
  getDashPrint(body) {
    return http.post("api/HomeApi/PrintRpt", body);
  }
}

export default new DashboardService();
