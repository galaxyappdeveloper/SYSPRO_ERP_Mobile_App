import { http } from "../../API_Interceptor";

class ConfigService {
  getCompanyByUser(body) {
    return http.post("api/HomeApi/GetCompanyByUser", body);
  }

  getYearByUser(body) {
    return http.post("api/HomeApi/GetYearByUser", body);
  }

  getPremiseByUser(body) {
    return http.post("api/HomeApi/GetPremiseByUser", body);
  }

  getDepartmentByUser(body) {
    return http.post("api/HomeApi/GetDepartmentByUser", body);
  }

  saveCompanyConfig(body) {
    return http.post("api/Static/UpdateUserSession", body);
  }
}

export default new ConfigService();
