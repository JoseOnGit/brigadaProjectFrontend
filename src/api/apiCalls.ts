import axios from "axios";
import { API_URL } from "../config";
import { StoreApiType } from "../types/storesTypes";
import { EmployeeApiType, EmployeeType } from "../types/employeeTypes";
import { ApiCallResponse } from "../types/commonTypes";

// STORES

export const getAllStoresApiCall = async (
  setData: React.Dispatch<React.SetStateAction<StoreApiType[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  setLoading(true);

  axios
    .get(`${API_URL}/stores`)
    .then((result: any) => setData(result.data.data as StoreApiType[]))
    .catch((error: any) => setError(error))
    .finally(() => setLoading(false));
};

export const getStoreApiCall = async (
  storeId: number,
  setData: React.Dispatch<React.SetStateAction<StoreApiType | undefined>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  setLoading(true);

  axios
    .get(`${API_URL}/stores/${storeId}`)
    .then((result: any) => setData(result.data.data[0] as StoreApiType))
    .catch((error: any) => setError(error))
    .finally(() => setLoading(false));
};

// EMPLOYEES

export const getEmployeeApiCall = async (
  employeeId: number,
  setData: React.Dispatch<React.SetStateAction<EmployeeApiType | undefined>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  setLoading(true);

  axios
    .get(`${API_URL}/employees/${employeeId}`)
    .then((result: any) => setData(result.data.data[0] as EmployeeApiType))
    .catch((error: any) => setError(error))
    .finally(() => setLoading(false));
};

export const getAddEmployeeApiCall = async (
  body: EmployeeType,
  setData: React.Dispatch<React.SetStateAction<ApiCallResponse | undefined>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  setLoading(true);

  axios
    .post(`${API_URL}/employees/add`, body)
    .then((result: any) => {
      console.log(
        "%c⧭ getAddEmployeeApiCall result ",
        "color: #007300",
        result
      );
      setData(result.data as ApiCallResponse);
    })
    .catch((error: any) => setError(error))
    .finally(() => setLoading(false));
};
