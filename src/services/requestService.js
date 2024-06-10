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
  getAllUserRequests() {
    return axios
      .post(API_URL + "/allUsersRequests", null, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  getUserRequests(userId) {
    return axios
      .post(
        API_URL + "/userRequests",
        { userId: userId },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }
  getAllStoresRequests() {
    return axios
      .post(API_URL + "/allStoresRequests", null, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  getStoreRequests(userId) {
    return axios
      .post(
        API_URL + "/storeRequests",
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
  removeRequest(request) {
    return axios
      .delete(API_URL + "/request/remove", {
        data: request,
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
}
export default RequestService = new RequestService();
