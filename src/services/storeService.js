import axios from "axios";
import { API_URL } from "../config";

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
}
export default StoreService = new StoreService();
