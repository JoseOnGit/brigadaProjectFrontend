import axios from "axios";
import authHeader from "./auth-header";
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
}

export default UserService = new UserService();
