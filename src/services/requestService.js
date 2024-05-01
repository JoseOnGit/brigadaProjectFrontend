import axios from "axios";
import { API_URL } from "../config";
import authHeader from "./authHeader";

class RequestService {
  getAllRequests() {
    return axios
      .get(API_URL + "/requests", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  getUserRequests(userId) {
    return axios
      .post(
        API_URL + "/requests/get",
        { userId: userId },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }
  createNewRequest(request) {
    return axios
      .post(API_URL + "/request/add", { request }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}
export default RequestService = new RequestService();
