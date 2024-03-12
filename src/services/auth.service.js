import axios from "axios";
import { API_URL } from "../config/index";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/auth/signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, surname, email, phone, onboardDate, level, password) {
    return axios.post(API_URL + "/auth/signup", {
      name,
      surname,
      email,
      phone,
      onboardDate,
      level,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default AuthService = new AuthService();
