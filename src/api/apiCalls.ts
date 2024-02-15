import axios from "axios";
import { API_URL } from "../config";

export const getAllStoresApiCall = async (setData: any) =>
  axios
    .get(`${API_URL}/stores`)
    .then((data: any) => {
      setData(data.data);
    })
    .catch((error: any) => {});
