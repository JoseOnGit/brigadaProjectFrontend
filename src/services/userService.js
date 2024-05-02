import axios from "axios";
import authHeader from "./authHeader";
import { API_URL } from "../config/index";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "/test/all");
  }

  getUserBoard() {
    return axios.get(API_URL + "/test/user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "/test/mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "/test/admin", { headers: authHeader() });
  }
  getUserInfo(id) {
    return axios
      .post(API_URL + "/userInfo", { id: id }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default UserService = new UserService();
