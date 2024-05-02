import axios from "axios";
import { API_URL } from "../config";
import authHeader from "./authHeader";

class StoreService {
  getAllStores() {
    return axios.get(API_URL + "/stores").then((response) => {
      return response.data;
    });
  }
  getAllStoreNames() {
    return axios.get(API_URL + "/storeNames").then((response) => {
      return response.data;
    });
  }
  getStore(id) {
    return axios
      .post(API_URL + "/store", { id: id }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}
export default StoreService = new StoreService();
